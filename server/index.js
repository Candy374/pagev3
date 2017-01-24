/**
 * Created by huangling on 24/01/2017.
 */
var express = require('express');
var http = require('http-proxy');
var path = require('path');
var app = express();
var proxy = http.createProxyServer();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(__dirname + '/../dist'));

app.get('/*', function (req, res) {
  if (req.url == '/index.js') {
    res.sendFile(path.resolve(path.join(__dirname, '/../dist/index.js')));
  }
  res.sendFile(path.resolve(path.join(__dirname, '/../dist/index.html')));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
})
