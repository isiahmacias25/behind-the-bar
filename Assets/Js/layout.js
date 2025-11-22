// Function to make an image circular and set it as the favicon
function makeFaviconCircular(src) {
  const img = new Image();        // Create an image object
  img.src = src;                   // Set the image source
  img.onload = () => {             // Run after image loads
    const size = 64;               // Canvas will be square
    const canvas = document.createElement('canvas'); // Create a canvas
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Draw a circular clipping mask
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Draw the image inside the circle
    ctx.drawImage(img, 0, 0, size, size);

    // Replace the favicon link with the circular image
    const favicon = document.querySelector('link[rel="icon"]');
    favicon.href = canvas.toDataURL('image/png');
  };
}

// Call the function with your logo path
makeFaviconCircular('Assets/Images/logo.png');
