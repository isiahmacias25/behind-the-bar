// Make favicon circular
function makeFaviconCircular(src) {
  // Create image object
  const img = new Image();

  // Set image source
  img.src = src;

  // Run once image loads
  img.onload = () => {
    // Define canvas size
    const size = 64;

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    // Get drawing context
    const ctx = canvas.getContext('2d');

    // Create circular mask
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Draw image into circle
    ctx.drawImage(img, 0, 0, size, size);

    // Replace favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) favicon.href = canvas.toDataURL('image/png');
  };
}

// Initialize favicon using existing link href
const faviconLink = document.querySelector('link[rel="icon"]');
if (faviconLink) {
  makeFaviconCircular(faviconLink.getAttribute('href'));
}






// Import Firebase app initializer
