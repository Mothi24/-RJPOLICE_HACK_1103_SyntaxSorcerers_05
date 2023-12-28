// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors()); 

app.get('/api/fetch', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on http://localhost:${port}`);
});
