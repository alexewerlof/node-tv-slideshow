var express = require('express');
var fs = require('fs');
var path = require('path');
var minimist = require('minimist');

var options = minimist(process.argv.slice(2), {
	string: 'slides',
	default: {
		slides: './slides/',
		port: 3000
	}
});

const validFileExtensions = ['.png', '.jpg'];

var app = express();

app.get('/slides', function read(req, res) {
	fs.readdir(options.slides, function (err, files) {
		if (err) throw err;
		res.send(files
			.filter(fName => validFileExtensions.indexOf(path.extname(fName).toLowerCase()) !== -1)
			.map(fName => '/slides/' + fName));
	});
});

// The root of the web
app.use(express.static('www'));
app.use('/slides', express.static(options.slides, {
  maxAge: 60000,
  redirect: false
}));
app.use('/admin', express.static('admin'));
app.use('/bower_components', express.static('bower_components'));

app.listen(options.port, () => console.log(`Listening at port ${options.port} and serving from ${path.resolve(options.slides)}`));
