// Content script for Prompteer Chrome Extension

console.log('Prompteer content script loaded');

// Listen for messages from the extension popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    // Extract relevant content from the page
    const pageContent = {
      title: document.title,
      url: window.location.href,
      selectedText: window.getSelection()?.toString() || '',
      metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    };
    
    sendResponse(pageContent);
  }
  
  if (request.action === 'insertText') {
    // Insert text at the current cursor position
    const activeElement = document.activeElement as HTMLInputElement | HTMLTextAreaElement;
    
    if (activeElement && ('value' in activeElement)) {
      const start = activeElement.selectionStart || 0;
      const end = activeElement.selectionEnd || 0;
      const text = activeElement.value;
      
      activeElement.value = text.substring(0, start) + request.text + text.substring(end);
      activeElement.selectionStart = activeElement.selectionEnd = start + request.text.length;
      
      // Trigger input event
      activeElement.dispatchEvent(new Event('input', { bubbles: true }));
      
      sendResponse({ success: true });
    } else {
      sendResponse({ success: false, error: 'No active input element' });
    }
  }
  
  return true; // Keep message channel open
});

// Export empty object to make this a module
export {};
