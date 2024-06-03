document.getElementById('saveButton').addEventListener('click', () => {
  const messageElement = document.getElementById('message');
  messageElement.textContent = ''; // Clear previous messages

  chrome.storage.sync.get(['apiDomain', 'authToken'], (result) => {
    if (!result.apiDomain) {
      messageElement.textContent = 'API Domain is not set. Please configure it in the options.';
      alert('API Domain is not set. Please configure it in the options.');
      return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      if (currentTab) {
        chrome.tabs.sendMessage(currentTab.id, { action: "getPageDetails" }, (response) => {
          if (!response) {
            messageElement.textContent = 'Failed to retrieve page details.';
            return;
          }

          const url = currentTab.url || 'URL: is not defined';
          const title = response.title || 'Title: is not defined';
          const description = response.description || 'Description: is not defined';
          const renderedText = response.renderedText || 'RenderedText: is not defined';
          const notes = document.getElementById('notes').value || 'Notes: is not defined';
          const tags = document.getElementById('tags').value || 'Tags: is not defined';

          const headers = {
            'Content-Type': 'application/json'
          };
          if (result.authToken) {
            headers['Authorization'] = `Bearer ${result.authToken}`;
          }

          fetch(`${result.apiDomain}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ url: url, title: title, description: description, renderedText: renderedText, notes: notes, tags: tags })
          })
          .then(response => response.json())
          .then(data => {
            if (data.status === 'ok') {
              alert('URL, title, description, rendered text, notes, and tags saved successfully!');
            } else {
              messageElement.textContent = 'Failed to save URL, title, description, rendered text, notes, and tags.';
            }
          })
          .catch(error => {
            console.error('Error:', error);
            messageElement.textContent = 'An error occurred while saving. Please try again.';
          });
        });
      } else {
        messageElement.textContent = 'No active tab found.';
      }
    });
  });
});
