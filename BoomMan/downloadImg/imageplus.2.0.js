const gm = require('gm');
const fs = require('fs');
const http = require("http");
const request = require("request");
const mkdirp = require('mkdirp');

const path = './欲求王';
const jsonName = 'data.json';
const imagePath = 'e:/hanman/欲求王';
const imagePlusPath = 'e:/hanman/欲求王/plus';

let imagedata = [];
let paths = [];

let pageIndex = 0;
let iamgeIndex = 0;
let littleIndex = 1;
let needSplit = true;

let _height = 0;
let _position = '+0+0';

let _gm = gm();

// 异步读取
fs.readFile(path + '/' + jsonName, function (err, data) {
	if (err) {
		return console.error(err);
	}
	// console.log("异步读取: " + data.toString());
	imagedata = JSON.parse(data);
	makeDir(imagePlusPath);
});

//创建目录
var makeDir = function (path) {
	mkdirp(path, function (err) {
		if (err) {
			console.log(err);
		}
		startConcatImage();
	});

}

let startConcatImage = () => {
	paths = [];
	if (imagedata.length > 0) {
		let info = imagedata.splice(0, 1)[0];
		iamgeIndex = 1;
		pageIndex = info.index;
		littleIndex = 1;
		needSplit = false;
		if (checkPath()) {
			console.log('image plus is existed! >>>>> ' + checkPath());
			startConcatImage();
		} else {
			info.data.forEach(element => {
				paths.push(imagePath + '/' + pageIndex + '_' + (iamgeIndex++) + '.jpg');
			});
			getNextImage();
		}
	} else {
		console.log('all the images concated!');
	}
}

let checkPath = () => {
	let __path = imagePlusPath + '/' + pageIndex + '.jpg';
	if (fs.existsSync(__path)) {
		return __path;
	}
	__path = imagePlusPath + '/' + pageIndex + '_1.jpg';
	if (fs.existsSync(__path)) {
		return __path;
	}
	__path = imagePlusPath + '/' + pageIndex + '_2.jpg';
	if (fs.existsSync(__path)) {
		return __path;
	}
	return false;
}

let getNextImage = () => {
	if (paths.length > 0) {
		concatImage(paths.splice(0, 1)[0]);
	} else {
		concatImageEnd(true);
	}
}

let concatImage = (path) => {
	console.log('CONCAT IMAGE >>>>>>', path);
	_gm.in('-page', _position)
		.in(path)
	getImageSize(path, () => {
		// 超过60000像素 提前切分下文件
		// 最后一个文件的话就不用切了
		if (_height > 60000 && paths.length > 0) {
			needSplit = true;
			concatImageEnd(false);
		} else {
			getNextImage();
		}
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
				console.log(err);
			}
		});
}

let concatImageEnd = (isFinished) => {
	let outputPath = imagePlusPath + '/' + pageIndex + (needSplit ? "_" + (littleIndex++) : "") + '.jpg';

	if (fs.existsSync(imagePlusPath + '/' + pageIndex + '.jpg')) {
		console.log('image plus is existed! >>>>> ', outputPath);
		_height = 0;
		_position = '+0+0';
		if (!isFinished) {
			getNextImage();
		} else {
			startConcatImage();
		}
	} else {
		_gm.mosaic()
			.write(outputPath, function (err) {
				if (err) {
					console.log(outputPath + ' >>>>> error! ' + err);
				} else {
					console.log(outputPath + ' >>>>> complete!');
					_height = 0;
					_position = '+0+0';
					if (!isFinished) {
						getNextImage();
					} else {
						startConcatImage();
					}
				}
			});
	}
}
