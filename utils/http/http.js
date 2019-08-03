const axios = require('axios');

const cryptoApi = 'https://api.coindesk.com/v1/bpi/historical/close.json';

const http = {
  async getHistory() {
    console.log('getting data...');
    const response = await axios.get(cryptoApi);
    return response.data;
  },
  async getOne({ dateString, currency, cryptoCurrency }) {
    const queryString = `?start=${dateString}&end=${dateString}&currency=${currency}`;
    const response = await axios.get(cryptoApi + queryString);
    return response.data;
  },
};

async function test() {
  const date = new Date('2018-10-11');
  const price = await http.getOne({ date, currency: 'USD' });
  console.log(price);
}

module.exports = http;
