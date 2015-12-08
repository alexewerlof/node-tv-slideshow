var express = require('express');
var fs = require('fs');
var path = require('path');

const slidesRoot = './slides/';
const port = 3000;

var app = express();

app.get('/slides', function read(req, res) {
	fs.readdir(slidesRoot, function (err, files) {
		if (err) throw err;
		res.send(files.map(f => slidesRoot + f));
	});
});

// The root of the web
app.use(express.static('www'));
app.use('/slides', express.static(slidesRoot, {
  maxAge: 60000,
  redirect: false
}));
app.use('/admin', express.static('admin'));
app.use('/bower_components', express.static('bower_components'));

app.listen(port, () => console.log(`Listening at port ${port}`));
