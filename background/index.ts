// Background service worker for Prompteer Chrome Extension

chrome.runtime.onInstalled.addListener(() => {
  console.log('Prompteer extension installed');
  
  // Set default storage values
  chrome.storage.local.set({
    prompts: [],
    settings: {
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
    }
  });
});

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);
  
  if (request.action === 'generatePrompt') {
    // TODO: Handle prompt generation
    sendResponse({ success: true, data: 'Mock response from background' });
  }
  
  return true; // Keep message channel open for async response
});

// Export empty object to make this a module
export {};
