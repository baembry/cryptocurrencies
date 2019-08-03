const mysql = require('mysql');
const tryCatch = require('../utils/tryCatch');
const Promise = require('bluebird');

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

Promise.promisifyAll(db);

db.connect(err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected!');
  }
});

const init = function() {
  tryCatch(async () => {
    await db.queryAsync(`CREATE DATABASE IF NOT EXISTS cryptoCurrencies`);
    await db.queryAsync(`USE cryptoCurrencies`);
    // await db.queryAsync(`DROP TABLE prices`);
    await db.queryAsync(
      `CREATE TABLE IF NOT EXISTS prices 
            (date date not null,
                cryptoCurrency tinytext,
                currency tinytext,
                value float,
                primary key (date))`
    );
  });
};

init();

module.exports = db;
