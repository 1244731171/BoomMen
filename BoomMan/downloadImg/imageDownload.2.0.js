//依赖模块
const fs = require('fs');
const http = require("http");
const request = require("request");
const mkdirp = require('mkdirp');

const path = './欲求王';
const jsonName = 'data.json';
const imagePath = 'e:/hanman/欲求王';
let iamgedata;
let urls = [];
let paths = [];

let threadLength = 0;
// 异步读取
fs.readFile(path + '/' + jsonName, function (err, data) {
    if (err) {
        return console.error(err);
    }
    // console.log("异步读取: " + data.toString());
    iamgedata = JSON.parse(data);
    makeDir(imagePath);
});

//创建目录
var makeDir = function (path) {
    mkdirp(path, function (err) {
        if (err) {
            console.log(err);
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

    startDownLoad();
}

// 下载方法
var retryTimes = 2;
var download = function (url, path) {
    request.head(url, function (err, res, body) {
        console.log("try to download, url: " + url);
        // console.log(JSON.stringify(res));
        if (!err && res.statusCode == 200) {
            request(url).pipe(fs.createWriteStream(path))
                .on('close', function () {
                    threadLength--;
                    retryTimes = 2;
                    console.log('img saved! path:' + path);
                });
        } else {
            // console.log(err)
            console.log("try to download failed!");
            if (retryTimes-- > 0) {
                download(url, path);
            } else {
                threadLength--;
            }
        }
    });
};

let downloadIndex = 0;
let downloadNext = function () {
    if (threadLength < 5) {
        threadLength++;
    } else {
        return;
    }
    let url = urls[downloadIndex];
    let path = paths[downloadIndex];
    // console.log(url);
    // console.log(path);
    if (url && path) {
        downloadIndex++;
        if (fs.existsSync(path)) {
            console.log('path existed! >>>>>> ', path);
            threadLength--;
            downloadNext();
        } else {
            download(url, path);
        }
    } else {
        console.log('all images downloaded!');
        clearInterval(timer);
    }
}

let timer = -1;
let startDownLoad = () => {
    console.log('startDownLoad');
    timer = setInterval(() => {
        downloadNext();
    }, 200);
}

// 37 开始使用本方法