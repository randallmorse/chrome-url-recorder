document.addEventListener('DOMContentLoaded', () => {
  const apiDomainInput = document.getElementById('apiDomain');
  const saveButton = document.getElementById('save');

  // Load saved API domain
  chrome.storage.sync.get(['apiDomain'], (result) => {
    if (result.apiDomain) {
      apiDomainInput.value = result.apiDomain;
    }
  });

  // Save API domain
  saveButton.addEventListener('click', () => {
    const apiDomain = apiDomainInput.value;
    chrome.storage.sync.set({ apiDomain }, () => {
      alert('API Domain saved');
    });
  });
});
