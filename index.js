var express = require('express');
var app = express();
var fs = require('fs');
var db = require('./db');

app.get('/api/db', db.read);

app.use('/', express.static('www'));

var server = app.listen(3000, function () {
  //var host = server.address().address;
  var port = server.address().port;
  console.log(`Listening at port ${port}`);
});
