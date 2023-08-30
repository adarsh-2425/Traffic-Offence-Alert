const axios = require('axios');

const BITLY_ACCESS_TOKEN = process.env.BITLY_ACCESS_TOKEN;
const bitlyApiUrl = 'https://api-ssl.bitly.com/v4/shorten';

async function shortenUrl(longUrl) {
  try {
    const headers = {
      'Authorization': `Bearer ${BITLY_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    };

    const data = {
      long_url: longUrl,
    };

    const response = await axios.post(bitlyApiUrl, data, { headers });
    const shortUrl = response.data.link;
    return shortUrl;
  } catch (error) {
    console.error('Error shortening URL:', error);
    throw error;
  }
}

module.exports = { shortenUrl };
