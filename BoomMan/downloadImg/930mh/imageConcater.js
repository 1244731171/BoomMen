const logger = require("./log");
const jpg2pdf = require('./jpg2pdfPlugin');

const gm = require('gm');
const fs = require('fs');
const mkdirp = require('mkdirp');

let path = './欲求王';
let jsonName = 'data.json';
let imagePath = 'e:/hanman/欲求王';
let imagePlusPath = imagePath + '/plus';
let imagePdfPath = imagePath + '/pdf';

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
	makeDir(imagePdfPath);
	// 异步读取
	fs.readFile(path + '/' + jsonName, function (err, data) {
		if (err) {
			return logger.error(err);
		}
		// logger.log("异步读取: " + data.toString());
		imagedata = JSON.parse(data);
		makeDir(imagePlusPath, startConcatImage);
	});

}

//创建目录
let makeDir = function (path, callback) {
	mkdirp(path, function (err) {
		if (err) {
			logger.log(err);
		}
		if (callback && typeof callback === 'function') {
			callback();
		}
	});
}

let addImagePath = (path) => {
	if (path instanceof Array) {
		path.forEach(p => {
			jpg2pdf.add(p, p.replace(/plus|jpg/g, 'pdf'));
		});
		imagePaths = imagePaths.concat(path);
	} else {
		jpg2pdf.add(path, path.replace(/plus|jpg/g, 'pdf'));
		imagePaths.push(path);
	}
}

let timer = -1;
let startConcatImage = () => {
	paths = [];
	if (imagedata.length > 0) {
		let info = imagedata.splice(0, 1)[0];
		iamgeIndex = 1;
		pageIndex = info.index;
		littleIndex = 1;
		needSplit = false;
		let existedPath = checkPath();
		if (existedPath.length) {
			addImagePath(existedPath);
			logger.log('__imageConcater__: image plus is existed! >>>>> ' + existedPath.join(','));
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
			str += ('<img src="' + ele.replace(imagePlusPath, '.') + '"/><br/>');
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
					
					logger.log('__imageConcater__: all the image conncat SUCCESSFUL! waite create pdf');
					timer = setInterval(() => {
						if (jpg2pdf.isFinish()) {
							clearInterval(timer);
							logger.log('__imageConcater__: >>>>>> END! <<<<<<');
							callbacks.forEach(ele => {
								ele();
							});
						}
					}, 200);
				});
			});
		});
	}
}

let checkPath = () => {
	let __path = imagePlusPath + '/' + pageIndex + '.jpg';
	let existedPath = [];
	if (fs.existsSync(__path)) {
		existedPath.push(__path);
	}
	let index = 1;
	__path = imagePlusPath + '/' + pageIndex + '_' + index + '.jpg';
	while (fs.existsSync(__path)) {
		existedPath.push(__path);
		index++;
		__path = imagePlusPath + '/' + pageIndex + '_' + index + '.jpg';
	}
	return existedPath;
}

let getNextImage = () => {
	if (paths.length > 0) {
		concatImage(paths.splice(0, 1)[0]);
	} else {
		concatImageEnd(true);
	}
}

let concatImage = (path) => {
	logger.log('__imageConcater__: try to concat image >>>>>> ', path);
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
					addImagePath(outputPath);
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
		imagePdfPath = imagePath + '/pdf';
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