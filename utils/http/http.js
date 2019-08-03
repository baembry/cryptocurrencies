const axios = require('axios');

const cryptoApi = 'https://api.coindesk.com/v1/bpi/historical/close.json';

module.exports = {
  async getHistory() {
    console.log('getting data...');
    const response = await axios.get(cryptoApi);
    return response.data;
  },
};
