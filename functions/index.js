const functions = require('firebase-functions')
const express = require('express')
const request = require('request')
const cors = require('cors');

const app = express()
const RESAS_API_KEY = functions.config().resas.api_key

app.use(cors({ origin: true }));

app.get('/api/prefectures', (req, res) => {
  request.get({
    uri: 'https://opendata.resas-portal.go.jp/api/v1/prefectures',
    headers: {
      'Content-type': 'application/json',
      'X-API-KEY': RESAS_API_KEY
    },
    qs: {},
    json: true
  }, function (err, req, data) {
    res.status(200).send(data)
  });
});

app.get('/api/population', (req, res) => {
  request.get({
    uri: 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear',
    headers: {
      'Content-type': 'application/json',
      'X-API-KEY': RESAS_API_KEY
    },
    qs: req.query,
    json: true
  }, function (err, req, data) {
    res.status(200).send(data)
  });
});

exports.api = functions.https.onRequest(app);