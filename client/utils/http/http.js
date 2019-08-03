import axios from 'axios';

const cryptoApi = 'https://api.coindesk.com/v1/bpi/historical/close.json';

export default {
  async getHistory() {
    console.log('getting data...');
    const response = await axios.get(cryptoApi);
    console.log(response);
    return response.data;
  },
};
