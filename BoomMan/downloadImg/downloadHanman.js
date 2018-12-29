//依赖模块
const fs = require('fs');
const http = require("http");
const request = require("request");
const mkdirp = require('mkdirp');

// http://img.hanman.co/static/upload/book/24/1101/21123.jpg
// http://img.hanman.co/static/upload/book/24/1075/19604.jpg
// http://img.hanman.co/static/upload/book/24/1016/19445.jpg

let pageId = 1016;
let pageIdMax = 1101;
let imageId = 19445;
let imageIdMax = 21123;
let baseUrl = "http://img.hanman.co/static/upload/book/24/";
let urls = [];
let path = "./欲求王";

//创建目录
let makeDir = (path) => {
    mkdirp(path, err => {
        if (err) {
            console.log(err);
        }
    });
}

let getNextImageUrl = (addPage, addImage) => {
    if (addPage) pageId++;
    if (addImage) imageId++;
    if (pageId > pageIdMax || imageId > imageIdMax) {
        return false;
    }
    return baseUrl + pageId + '/' + imageId + '.jpg';
}

let checkUrl = (url) => {
    request.head(url, function (err, res, body) {
        // console.log("try to download, url: " + url);
        // console.log(JSON.stringify(res));
        if (!err && res.statusCode == 200) {
            let _url = getNextImageUrl(false, true);
            if (_url) {
                checkUrl(_url);
                urls.push(_url);
                console.log('>>>>>>', _url);
            } else {
                checkUrlEnd();
                console.log('<<<<<<', _url);
            }
        } else {
            let _url = getNextImageUrl(true, false);
            if (_url) {
                checkUrl(_url);
                urls.push(_url);
                console.log('>>>>>>', _url);
            } else {
                checkUrlEnd();
                console.log('<<<<<<', _url);
            }
        }
    });
}

let checkUrlEnd = () => {
    let str = JSON.stringify(urls);


    fs.open((path + '/' + new Date().getTime() + 'data.json'), 'w', (err, fd) => {
        if (err) {
            console.log(err);
        }
        console.log(fd);
        fs.writeFile(fd, str, (err) => {
            if (err) {
                console.log(err);
            }
            fs.close(fd, (err) => {
                console.log(err ? err : 'success!');
            });
        });
    });
}

makeDir(path);
checkUrl(getNextImageUrl());

// 数据源有问题 暂定逻辑