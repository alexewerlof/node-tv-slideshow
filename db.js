var fs = require('fs');

exports.read = function read(req, res) {
	fs.readFile('./db.json', function (err, contents) {
		if (err) throw err;
		res.send(JSON.parse(contents));
	});
}