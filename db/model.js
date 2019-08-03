const db = require('./db');
const http = require('../utils/http/http');
const tryCatch = require('../utils/tryCatch');

const model = {
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
  async getOne({ dateString, currency, cryptoCurrency }) {
    let data;
    await tryCatch(async () => {
      data = await db.queryAsync(
        `SELECT * FROM prices 
              WHERE date = "${dateString}" and 
              currency = "${currency}" and
              cryptoCurrency="${cryptoCurrency}"`
      );
      console.log('DB result ', data);
      if (data.length === 0) {
        data = await http.getOne({ dateString, currency, cryptoCurrency });
        //record and retun
        const query = `
        INSERT INTO prices (date, cryptoCurrency, currency, value) 
        VALUES ("${dateString}", "${cryptoCurrency}", "${currency}", ${
          data.bpi[dateString]
        })
    `;
        db.queryAsync(query);
      }
    });
    return data;
  },
};

module.exports = model;
