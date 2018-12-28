var gm = require('gm');
var fs = require('fs');

var path = './test';

let _height = 0;
let _position = '+0+0';

let filePath = [];
var data = fs.readdirSync(path);

let _gm = gm();
for (let name of data) {
	filePath.push(path + '/' + name);
}

let index = 0;
let getNextImage = () => {
	if (index < data.length) {
		concatImage(path + '/' + index + '.jpg');
		index++;
	} else {
		concatImageEnd();
	}
}

let concatImage = (path) => {
	console.log('CONCAT IMAGE >>>>>>', path);
	_gm.in('-page', _position)
		.in(path)
	getImageSize(path, () => {
		getNextImage();
	});
}

let getImageSize = (path, callback) => {
	gm(path)
		.size(function (err, size) {
			if (!err) {
				_height += size.height;
				_position = '+0+' + _height;
				callback();
			} else {
				console.log(err)
			}
		});
}

let concatImageEnd = () => {
	_gm.mosaic()
		.write('tesOutput.jpg', function (err) {
			if (err) {
				console.log(err);
			} else {
				console.log('complete');
			}
		});
}

getNextImage();