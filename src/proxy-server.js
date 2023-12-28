// proxy-server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3002; // Choose a port for the proxy server

app.use('/api/capture-screenshot', createProxyMiddleware({ 
  target: 'http://localhost:3001', // Point to your actual server
  changeOrigin: true,
}));

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
