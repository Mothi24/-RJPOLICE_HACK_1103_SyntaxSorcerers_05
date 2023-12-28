import React, { useState } from 'react';

const LinkExtractor = () => {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleExtractLinks = async () => {
    try {
      const proxyUrl = 'http://localhost:4000/api/fetch?url=' + encodeURIComponent(url);
      const response = await fetch(proxyUrl);
      const html = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const anchorTags = doc.querySelectorAll('a');
      const linksArray = Array.from(anchorTags).map((anchor) => anchor.getAttribute('href'));
      const validLinks = linksArray.filter((link) => link);

      setLinks(validLinks);
    } catch (error) {
      console.error('Error fetching links:', error);
      setLinks([]);
    }
  };

  return (
    <div>
      <label>
        Enter URL:
        <input type="text" value={url} onChange={handleUrlChange} />
      </label>
      <button onClick={handleExtractLinks}>Extract Links</button>

      <div>
        <h2>Extracted Links:</h2>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LinkExtractor;
