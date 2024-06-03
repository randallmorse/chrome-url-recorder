document.addEventListener('DOMContentLoaded', () => {
  const apiDomainInput = document.getElementById('apiDomain');
  const authTokenInput = document.getElementById('authToken');
  const saveButton = document.getElementById('save');

  // Load saved API domain and auth token
  chrome.storage.sync.get(['apiDomain', 'authToken'], (result) => {
    if (result.apiDomain) {
      apiDomainInput.value = result.apiDomain;
    }
    if (result.authToken) {
      authTokenInput.value = result.authToken;
    }
  });

  // Save API domain and auth token
  saveButton.addEventListener('click', () => {
    const apiDomain = apiDomainInput.value;
    const authToken = authTokenInput.value;
    chrome.storage.sync.set({ apiDomain, authToken }, () => {
      alert('Settings saved');
    });
  });
});
