const db = require('./db');
module.exports = {
  async get({ start, end, currency, cryptoCurrency }) {
    const data = await db.queryAsync(
      `SELECT * FROM prices 
        WHERE date >= QUOTE(${start}) and 
        date <= QUOTE(${end}) and
        currency = "QUOTE(${currency})" and
        cryptoCurrency="QUOTE(${cryptoCurrency})"`
    );
    return data;
  },
};
