require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

//utilities
const http = require('./utils/http/http');
const pricesModel = require('./db/model');
const makeDates = require('./utils/makeDates');

app.use(express.static(__dirname + '/public'));
app.get('/:cryptoCurrency/:currency/:start/:end', async (req, res) => {
  //@TODO: sanitize query
  //get data from db
  const dates = makeDates(req.params.start, req.params.end);
  const prices = dates.map(async dateString => {
    const data = await pricesModel.getOne({
      dateString,
      currency: 'USD',
      cryptoCurrency: 'bitcoin',
    });
    return data;
  });

  Promise.all(prices).then(results => {
    console.log('prices', results);
    res.status(200).send(results);
  });
  //identify gaps in data
  //fill gaps from api
  //record data in db
  //send response
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
