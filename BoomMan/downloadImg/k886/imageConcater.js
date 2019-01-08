const logger = require("./log");

const gm = require('gm');
const fs = require('fs');
const mkdirp = require('mkdirp');

let path = './欲求王';
let jsonName = 'data.json';
let imagePath = 'e:/hanman/欲求王';
let imagePlusPath = imagePath + '/plus';

let imagedata = [];
let paths = [];

let pageIndex = 0;
let iamgeIndex = 0;
let littleIndex = 1;
let needSplit = true;

let _height = 0;
let _position = '+0+0';

let callbacks = [];
let imagePaths = [];

let _gm = gm();

let readJsonData = () => {
    logger.log('__imageConcater__: >>>>>> START! <<<<<<');
	// 异步读取
	fs.readFile(path + '/' + jsonName, function (err, data) {
		if (err) {
			return logger.error(err);
		}
		// logger.log("异步读取: " + data.toString());
		imagedata = JSON.parse(data);
		makeDir(imagePlusPath);
	});

}

//创建目录
let makeDir = function (path) {
	mkdirp(path, function (err) {
		if (err) {
			logger.log(err);
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
			logger.log('__imageConcater__: image plus is existed! >>>>> ' + checkPath());
			startConcatImage();
		} else {
			info.data.forEach(element => {
				paths.push(imagePath + '/' + pageIndex + '_' + (iamgeIndex++) + '.jpg');
			});
			getNextImage();
		}
	} else {
		logger.log('__imageConcater__: all the images concated');
		let str = '';
		imagePaths.forEach(ele => {
			str += ('<img src="' + ele + '"/>');
		});
		fs.open(imagePlusPath + '/0.html', 'w', (err, fd) => {
			if (err) {
				logger.log(err);
			}
			fs.writeFile(fd, str, (err) => {
				if (err) {
					logger.log(err);
				}
				fs.close(fd, (err) => {
					logger.log(err ? ('__imageConcater__: create main html Error ' + err) : '__imageConcater__: main html create success!');
   				 	logger.log('__imageConcater__: >>>>>> END! <<<<<<');
					callbacks.forEach(ele => {
						ele();
					});
				});
			});
		});
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
	__path = imagePlusPath + '/' + pageIndex + '_3.jpg';
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
	logger.log('__imageConcater__: try to concat image >>>>>>', path);
	_gm.in('-page', _position)
		.in(path)
	getImageSize(path, () => {
		// 超过60000像素 提前切分下文件
		// 最后一个文件的话就不用切了
		if (_height > 50000 && paths.length > 0) {
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
				logger.log(err);
			}
		});
}

let concatImageEnd = (isFinished) => {
	let outputPath = imagePlusPath + '/' + pageIndex + (needSplit ? "_" + (littleIndex++) : "") + '.jpg';

	if (fs.existsSync(outputPath)) {
		logger.log('__imageConcater__: image plus is existed! >>>>> ', outputPath);
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
					logger.log('__imageConcater__: concat image(%s) ERROR! >>>> %s', outputPath, err);
					if (err.toString().indexOf('Insufficient') !== -1) {
						logger.log('__imageConcater__: DELETE!! (Insufficient) >>>> ', outputPath);
						fs.unlinkSync(outputPath);
					}
				} else {
					logger.log('__imageConcater__: concat SUCCESSFUL! >>>>> ', outputPath);
					imagePaths.push(outputPath.replace(imagePlusPath, '.'));
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

module.exports = {
	setTitle: (_title) => {
		path = './' + _title;
		jsonName = 'image.json';
		imagePath = 'e:/hanman/' + _title;
		imagePlusPath = imagePath + '/plus';
	},
	setJsonPath: (p) => {
		path = p;
	},
	setImagePath: (p) => {
		imagePath = p;
		imagePlusPath = imagePath + '/plus';
	},
	setCallBack: (callback) => {
		callbacks.push(callback);
	},
	start: readJsonData
};