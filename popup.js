document.getElementById('saveButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab) {
      chrome.tabs.sendMessage(currentTab.id, { action: "getPageDetails" }, (response) => {
        const url = currentTab.url;
        const title = response.title;
        const description = response.description;
        const renderedText = response.renderedText;

        // Retrieve the API domain from storage
        chrome.storage.sync.get(['apiDomain'], (result) => {
          if (result.apiDomain) {
            fetch(`${result.apiDomain}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ url: url, title: title, description: description, renderedText: renderedText })
            })
            .then(response => response.json())
            .then(data => {
              if (data.status === 'ok') {
                alert('URL, title, description, and rendered text saved successfully!');
              } else {
                alert('Failed to save URL, title, description, and rendered text.');
              }
            })
            .catch(error => {
              console.error('Error:', error);
              alert('An error occurred.');
            });
          } else {
            alert('API Domain is not set. Please configure it in the options.');
          }
        });
      });
    }
  });
});
