// content.js
// Block middle-click
document.addEventListener('auxclick', (e) => {
    if (e.button === 1) { // middle click
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
  
  // Block regular clicks
  document.addEventListener('click', (e) => {
    // Allow clicks on elements that aren't links
    if (!e.target.closest('a')) {
      return;
    }
    
    // Block ALL reddit links, even with middle click
    const link = e.target.closest('a');
    if (link && link.href.includes('reddit.com')) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
  
  // Add a banner to show we're in restricted mode
  const banner = document.createElement('div');
  banner.className = 'reddit-block-banner';
  banner.innerHTML = `
    <div>View-Only Mode - Navigation Restricted</div>
    <button onclick="this.parentElement.remove()">✕</button>
  `;
  document.body.insertBefore(banner, document.body.firstChild);