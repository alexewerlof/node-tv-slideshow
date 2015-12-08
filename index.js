var express = require('express');
var fs = require('fs');
var path = require('path');
var minimist = require('minimist');

var options = minimist(process.argv.slice(2), {
	string: 'slidesRoot',
	default: {
		slidesRoot: './slides/',
		port: 3000
	}
});

const slidesRoot = options.slidesRoot || './slides/';
const port = options.port || 3000;

var app = express();

app.get('/slides', function read(req, res) {
	fs.readdir(options.slidesRoot, function (err, files) {
		if (err) throw err;
		res.send(files.map(f => path.posix.join(options.slidesRoot, f)));
	});
});

// The root of the web
app.use(express.static('www'));
app.use('/slides', express.static(options.slidesRoot, {
  maxAge: 60000,
  redirect: false
}));
app.use('/admin', express.static('admin'));
app.use('/bower_components', express.static('bower_components'));

app.listen(options.port, () => console.log(`Listening at port ${options.port}`));
