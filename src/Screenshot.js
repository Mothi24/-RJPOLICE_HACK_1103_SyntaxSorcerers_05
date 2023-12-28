import React, { useState } from 'react';
import html2canvas from 'html2canvas';

const ScreenshotComponent = () => {
  const [userInputUrl, setUserInputUrl] = useState('');
  const [screenshotData, setScreenshotData] = useState(null);

  const handleUrlChange = (e) => {
    setUserInputUrl(e.target.value);
  };

  const handleCapture = async () => {
    try {
      // Create a new iframe element
      const iframe = document.createElement('iframe');
      iframe.src = userInputUrl;
      iframe.style.display = 'none';

      // Append the iframe to the document body
      document.body.appendChild(iframe);

      // Wait for the iframe to load
      await new Promise((resolve) => (iframe.onload = resolve));

      // Use html2canvas to capture the content of the iframe
      const canvas = await html2canvas(iframe.contentDocument.body);

      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL('image/png');

      // Set the screenshot data in the state
      setScreenshotData(dataUrl);

      // Remove the iframe from the document
      document.body.removeChild(iframe);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  return (
    <div>
      <label>
        Enter URL:
        <input type="text" value={userInputUrl} onChange={handleUrlChange} />
      </label>

      <button onClick={handleCapture}>Capture Screenshot</button>

      {/* Display the screenshot */}
      {screenshotData && <img src={screenshotData} alt="Screenshot" />}
    </div>
  );
};

export default ScreenshotComponent;
