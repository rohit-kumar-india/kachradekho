// Function to compress and resize the image
export default async function compressAndResizeImage(file) {
    const maxFileSize = 1 * 1024 * 1024; // 1MB in bytes (adjust as needed)
    const imageQuality = 0.9; // Adjust the image quality (0.0 to 1.0) for JPEG compression
  
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const img = new Image();
  
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
  
          // Calculate new dimensions while maintaining the original aspect ratio
          if (width > height && width > 1024) {
            height *= 1024 / width;
            width = 1024;
          } else if (height > 1024) {
            width *= 1024 / height;
            height = 1024;
          }
  
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
  
          // Convert the canvas data to a data URL with JPEG compression
          const compressedDataUrl = canvas.toDataURL('image/jpeg', imageQuality);
          
          // Check if the compressed image data is still too large
          if (compressedDataUrl.length > maxFileSize) {
            // If it's still too large, recursively compress the image with lower quality
            resolve(compressAndResizeImage(file, imageQuality - 0.1));
          } else {
            // If the image is within the desired size limit, return the compressed image data URL
            resolve(compressedDataUrl);
          }
        };
  
        img.onerror = (error) => {
          reject(error);
        };
  
        img.src = event.target.result;
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
  }
  