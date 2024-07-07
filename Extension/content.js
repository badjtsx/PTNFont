// Define the font family name
const fontName = 'PTNFont';

// Load settings from storage
chrome.storage.sync.get(['fontUrl', 'siteUrls'], function(result) {
  const fontUrl = result.fontUrl || 'https://raw.githubusercontent.com/JulieSlei/x/main/PathToNowhere-NameplateFontV2.ttf';
  const siteUrls = result.siteUrls || [];

  // Check if current site matches any saved site URLs
  if (siteUrls.some(url => new URL(window.location.href).hostname === new URL(url).hostname)) {
    const fontCss = `
      @font-face {
        font-family: '${fontName}';
        src: url('${fontUrl}') format('truetype');
      }
      
      /* Apply the font to all elements */
      * {
        font-family: '${fontName}' !important;
      }
    `;
    
    // Create a <style> element and append it to the <head> of the document
    const styleElement = document.createElement('style');
    styleElement.textContent = fontCss;
    document.head.appendChild(styleElement);
  }
});
