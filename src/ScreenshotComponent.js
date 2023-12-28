import React, { useState } from 'react';
import axios from 'axios';

const ScreenshotComponent = () => {
  const [url, setUrl] = useState('');
  const [screenshotData, setScreenshotData] = useState(null);

  const handleCapture = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/capture-screenshot', { url });
      console.log('Response:', response);
      setScreenshotData(response.data.screenshotData);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };
  

  return (
    <div>
      <label>
        Enter URL:
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>

      <button onClick={handleCapture}>Capture Screenshot</button>

      {/* Display the captured screenshot */}
      {screenshotData && <img src={`data:image/png;base64,${screenshotData}`} alt="Screenshot" />}
    </div>
  );
};

export default ScreenshotComponent;
