var express = require('express');
var app = express();
var fs = require('fs');

app.get('/api/slides', function (req, res) {
  fs.readdir('www/slides', function (err, files) {
    res.send(files);
  });
});

app.use('/', express.static('www'));

var server = app.listen(3000, function () {
  //var host = server.address().address;
  var port = server.address().port;
  console.log(`Listening at port ${port}`);
});
