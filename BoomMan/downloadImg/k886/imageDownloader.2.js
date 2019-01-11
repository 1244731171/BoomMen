//依赖模块
const logger = require("./log");

const fs = require('fs');
const http = require("http");
const request = require("request");
const mkdirp = require('mkdirp');

let path = './欲求王';
const imageJsonName = 'image.json';
// const errorJsonName = 'image.json';
let imagePath = 'e:/hanman/欲求王';
let iamgedata;
let urls = [];
let paths = [];
let callbacks = [];
let errorList = [];

let downloadImageLength = 0;
let threadLength = 0;

let readJsonData = () => {
    logger.log('__imageDownloader__: >>>>>> START! <<<<<<');
    // 异步读取
    fs.readFile(path + '/' + imageJsonName, function (err, data) {
        if (err) {
            return logger.error(err);
        }
        // logger.log("异步读取: " + data.toString());
        iamgedata = JSON.parse(data);
        makeDir(imagePath);
    });
}

//创建目录
let makeDir = function (path) {
    mkdirp(path, function (err) {
        if (err) {
            logger.log(err);
        }
        loopImageData();
    });
}

let loopImageData = () => {
    for (let info of iamgedata) {
        let iamgeIndex = 1;
        let pageIndex = info.index;
        let imageData = info.data;
        for (let url of imageData) {
            urls.push(url);
            paths.push(imagePath + '/' + pageIndex + '_' + (iamgeIndex++) + '.jpg');
        }
    }
    logger.log('__imageDownloader__: calculated! image number length >>> ', urls.length);
    startDownLoad();
}

// 下载方法
let ppDownload = (url, path) => {
    threadLength++;
    logger.log("__imageDownloader__PP__: try to download, url >>>> " + url);
    let writer = fs.createWriteStream(path);
    let reader = request(url);
    writer.on('close', () => {
        threadLength--;
        logger.log('__imageDownloader__PP__: img saved! netName >>> %s, path >>>> %s ', url.substr(-43), path);
    });
    writer.on('error', err => {
        threadLength--;
        downloadError(err, url, path);
    });
    reader.pipe(writer);
}

let reDownload = function (url, path) {
    threadLength++;
    logger.log('__imageDownloader__RE__: try to save! url >>> %s', url);
    request({ url: url, encoding: 'binary' }, (error, response, body) => {
        threadLength--;
        if (!error && response.statusCode == 200) {
            fs.writeFile(path, body, 'binary', err => {
                if (err) {
                    downloadError(err, url, path);
                } else {
                    downloadImageLength++;
                    logger.log('__imageDownloader__RE__: img saved! urlName >>> %s, path >>>> %s ', url.substr(-43), path);
                }
            });
        } else {
            downloadError(error || response.statusCode, url, path);
        }
    });
}

let downloadError = (err, url, path) => {
    logger.log('__imageDownloader__: ERROR! >>> ', err);
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
    logger.log('__imageDownloader__: delete error path >>> ', path);
    errorList.push({
        url: url,
        path: path
    });
}

let downloadIndex = 0;
let downloadNext = function () {
    if (threadLength > 10) {
        return;
    }
    let url = urls[downloadIndex];
    let path = paths[downloadIndex];
    // logger.log(url);
    // logger.log(path);
    if (url && path) {
        downloadIndex++;
        if (fs.existsSync(path)) {
            logger.log('__imageDownloader__: path existed! >>> ', path);
            downloadImageLength++;
            downloadNext();
        } else {
            reDownload(url, path);
        }
    } else {
        clearInterval(timer);
        logger.log('__imageDownloader__: no image data need download!');
        timer = setInterval(() => {
            if (threadLength === 0) {
                clearInterval(timer);
                logger.log('__imageDownloader__: all images downloaded!');
                if (errorList.length > 0) {
                    logger.log('__imageDownloader__: error list >>> ');
                    logger.log(JSON.stringify(errorList));
                    logger.out();
                    return;
                } else if (downloadImageLength != urls.length) {
                    logger.log('__imageDownloader__: ERROR! download length(%s) != total length(%s)', downloadImageLength, urls.length);
                    logger.out();
                    return;
                }
                logger.log('__imageDownloader__: >>>>>> END! <<<<<<');
                callbacks.forEach(ele => {
                    ele();
                });
            }
        }, 200);
    }
}

let timer = -1;
let startDownLoad = () => {
    logger.log('__imageDownloader__: startDownLoad!');
    timer = setInterval(() => {
        downloadNext();
    }, 100);
}

module.exports = {
    setTitle: (_title) => {
        path = './' + _title;
        imagePath = 'e:/hanman/' + _title;
    },
    setImagePath: (p) => {
        imagePath = p;
    },
    setCallBack: (callback) => {
        callbacks.push(callback);
    },
    start: readJsonData
};