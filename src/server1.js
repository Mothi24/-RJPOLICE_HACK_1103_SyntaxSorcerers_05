const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3001;

// Body parser middleware
app.use(bodyParser.json());

// Enable CORS (replace 'http://localhost:3000' with your React app's domain)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true'); // Add this line if you are dealing with credentials (cookies, HTTP authentication)

  // Respond to preflight requests immediately
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Proxy middleware for /api/capture-screenshot
app.use('/api/capture-screenshot', createProxyMiddleware({
  target: 'http://localhost:3001', // Point to your actual server
  changeOrigin: true,
}));

// Endpoint for capturing screenshots
app.post('/api/capture-screenshot', async (req, res) => {
  const { url } = req.body;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the specified URL
    await page.goto(url);

    // Capture a screenshot and save it as a base64-encoded string
    const screenshotData = await page.screenshot({ encoding: 'base64' });

    // Close the browser
    await browser.close();

    // Send the screenshot data to the React app
    res.json({ screenshotData });
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the combined server and proxy
app.listen(port, () => {
  console.log(`Server and proxy are running on port ${port}`);
});
