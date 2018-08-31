var bodyParser = require('body-parser');
var express = require('express');
var webWordCloud = require('./webWordCloud');
var app = express();
var port = process.env.PORT;

if (!port) {
  console.log("post was undefined, defaulting to 3000.");
  port = 3000;
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('hello in log, default path called');
  res.send('Hello World!');
});

app.post('/CreateCloud', function (req, res, next) {
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

console.log('I am alive on port ' + port);

app.listen(port, () => console.log('Example app listening on port ' + port))