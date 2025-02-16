// background.js
chrome.webNavigation.onBeforeNavigate.addListener(
    function(details) {
      const url = new URL(details.url);
      const parts = url.pathname.split('/').filter(Boolean);
      
      // Allow if it's a specific post (/r/subreddit/comments/...)
      const isPostUrl = parts[0] === 'r' && parts.includes('comments');
      if (isPostUrl) {
        return; // allow the navigation
      }
      
      // Block everything else (homepage, subreddits, /r/all, /r/subreddit/new, etc)
      chrome.tabs.update(details.tabId, {
        url: chrome.runtime.getURL('blocked.html')
      });
    },
    {
      url: [{
        hostSuffix: 'reddit.com'
      }]
    }
  );