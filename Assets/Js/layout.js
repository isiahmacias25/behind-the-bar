// Function to make any image circular and set it as the favicon
function makeFaviconCircular(src) {
  const img = new Image();        // Create a new image object
  img.src = src;                   // Set the source of the image
  img.onload = () => {             // Wait until the image loads
    const size = 64;               // Canvas will be square: 64x64
    const canvas = document.createElement('canvas'); // Create canvas
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Draw a circular clipping mask
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Draw the image inside the circular area
    ctx.drawImage(img, 0, 0, size, size);

    // Update the favicon link with the canvas image
    const favicon = document.getElementById('favicon');
    favicon.href = canvas.toDataURL('image/png');
  };
}

// Call the function with your image path
makeFaviconCircular('Assets/Images/logo.png');
