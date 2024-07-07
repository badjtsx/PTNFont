document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings
    chrome.storage.sync.get(['fontUrl', 'siteUrls'], function(result) {
      if (result.fontUrl) {
        document.getElementById('fontUrl').value = result.fontUrl;
      }
      if (result.siteUrls) {
        result.siteUrls.forEach(url => {
          addSiteUrlInput(url);
        });
      } else {
        // Add at least one empty input for site URL
        addSiteUrlInput('');
      }
    });
  
    // Save button click handler
    document.getElementById('saveButton').addEventListener('click', function() {
      var fontUrl = document.getElementById('fontUrl').value;
      var siteUrls = Array.from(document.getElementsByClassName('siteUrlInput'))
        .map(input => input.value.trim())
        .filter(url => url !== '');
      
      chrome.storage.sync.set({ 'fontUrl': fontUrl, 'siteUrls': siteUrls }, function() {
        console.log('Font URL saved:', fontUrl);
        console.log('Site URLs saved:', siteUrls);
      });
    });
  
    // Add site URL button click handler
    document.getElementById('addSiteUrl').addEventListener('click', function() {
      addSiteUrlInput('');
    });
  
    // Event delegation for removing site URL inputs
    document.getElementById('siteUrls').addEventListener('click', function(event) {
      if (event.target.classList.contains('removeSiteUrl')) {
        event.target.parentElement.remove();
      }
    });
  
    // Function to add new site URL input field
    function addSiteUrlInput(value) {
      const siteUrlsDiv = document.getElementById('siteUrlInputs');
      const newInputContainer = document.createElement('div');
      newInputContainer.classList.add('siteUrlInputContainer');
      newInputContainer.innerHTML = `
        <input type="text" class="siteUrlInput" value="${value}" placeholder="Enter site URL">
        <button class="removeSiteUrl">-</button>
      `;
      siteUrlsDiv.appendChild(newInputContainer);
    }
  });
  