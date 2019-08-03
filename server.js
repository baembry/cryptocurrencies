require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');

const http = require('./utils/http/http');
const pricesModel = require('./db/model');

app.use(express.static(__dirname + '/public'));
app.get('/:cryptoCurrency/:currency/:start/:end', async (req, res) => {
  console.log(req.params);
  //@TODO: sanitize query
  //get data from db
  const prices = await pricesModel.get(req.params);
  console.log(prices);
  //identify gaps in data
  //fill gaps from api
  //record data in db
  //send response
  res.status(200).send(prices);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
