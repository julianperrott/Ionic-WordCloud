var bodyParser = require('body-parser');
var express = require('express');
var webWordCloud = require('./webWordCloud');
var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

app.post('/CreateCloud', function(req, res, next) {
  var start = Date.now();

  try {
    webWordCloud
      .createWordCloud(req.body)
      .then(wordCloud => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(wordCloud));
        console.log('(server) CreateCloud duration: ' + (Date.now() - start) + ' ms.');
      })
      .catch(e => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify([]));
        console.log(e);
      });
  } catch (e) {
    console.log('(server)' + e);
  }
});

app.listen(3000);

console.log("listening on 3000.");