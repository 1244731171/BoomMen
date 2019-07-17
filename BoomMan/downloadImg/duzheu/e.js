//依赖模块

const fs = require('fs');
const request = require("request");
const mkdirp = require('mkdirp');

let errorList = [];

let downloadImageLength = 0;
let threadLength = 0;

let name = '冲突';
let dataJson = './data.json';
let savePath = 'e:/hanman/' + name + '/';
let savePath_html = 'e:/hanman/' + name + '/localHtml/';

let imagedata;
let urls = [];
let paths = [];
let localPath = [];
let downloadIndex = 0;

let readJsonData = () => {
    fs.readFile(dataJson, function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("异步读取: " + data.toString());
        imagedata = JSON.parse(data);
        makeDir();
    });
}

//创建目录
let makeDir = () => {
    mkdirp(savePath, function (err) {
        if (err) {
            console.log(err);
        }
        mkdirp(savePath_html, function (err) {
            if (err) {
                console.log(err);
            }
        });
        loopImageData();
    });
}

let loopImageData = () => {
    let index = 1;
    for (let info of imagedata) {
        urls.push(url);
        paths.push(savePath + imgIndex + '.jpg');
        localPath.push("../" + imgIndex + '.jpg');
        imgIndex++;
    }
    console.log('__imageDownloader__: calculated! image number length >>> ', urls.length);
    startDownLoad();
}

let timer = -1;
let startDownLoad = () => {
    console.log('__imageDownloader__: startDownLoad!');
    timer = setInterval(() => {
        downloadNext();
    }, 100);
}

let downloadNext = function () {
    if (threadLength > 5) {
        return;
    }
    let url = urls[downloadIndex];
    let path = paths[downloadIndex];
    if (url && path) {
        downloadIndex++;
        if (fs.existsSync(path)) {
            console.log('__imageDownloader__: path existed! >>> ', path);
            downloadImageLength++;
            downloadNext();
        } else {
            reDownload(url, path);
        }
    } else {
        clearInterval(timer);
        console.log('__imageDownloader__: no image data need download!');
        timer = setInterval(() => {
            if (threadLength === 0) {
                clearInterval(timer);
                console.log('__imageDownloader__: all images downloaded!');
                if (errorList.length > 0) {
                    console.log('__imageDownloader__: error list >>> ');
                    console.log(JSON.stringify(errorList));
                    console.log('__imageDownloader__: error list length >>> ', errorList.length);
                    return;
                } else if (downloadImageLength != urls.length) {
                    console.log('__imageDownloader__: ERROR! download length(%s) != total length(%s)', downloadImageLength, urls.length);
                    return;
                }
                downloadEnd();
            }
        }, 200);
    }
}

let downloadEnd = () => {
    console.log('__imageDownloader__: >>>>>> END! <<<<<<');
    checkChapPath();
}

let checkChapPath = () => {
    markHTML(localPath, 0);
}

let markHTML = (data, index) => {
    var newData = [];
    data.forEach(e => {
        newData.push('<img src="' + e + '"/>');
    });
    let path = savePath_html + name + ' - 第' + index + '话.html';
    let str = '<html><head><title>' + name + ' - 第' + index + '话' + '</title></head>'
        + '<body>' + newData.join('<br>') + '</body><html>';
    fs.open(path, 'w', (err, fd) => {
        if (err) {
            console.log('__htmlCreater__: ERROR ' + err);
        }
        fs.writeFile(fd, str, (err) => {
            if (err) {
                console.log('__htmlCreater__: ERROR ' + err);
            }
            fs.close(fd, (err) => {
                if (err) {
                    console.log('__htmlCreater__: ERROR ' + err);
                } else {
                    console.log('__htmlCreater__: NET html create SUCCESSFUL!');
                }
            });
        });
    });
}


// 下载方法
let ppDownload = (url, path) => {
    threadLength++;
    console.log("__imageDownloader__PP__: try to download, url >>>> " + url);
    let writer = fs.createWriteStream(path);
    let reader = request(url);
    writer.on('close', () => {
        threadLength--;
        console.log('__imageDownloader__PP__: img saved! netName >>> %s, path >>>> %s ', url.substr(-43), path);
    });
    writer.on('error', err => {
        threadLength--;
        downloadError(err, url, path);
    });
    reader.pipe(writer);
}

let reDownload = function (url, path) {
    threadLength++;
    console.log('__imageDownloader__RE__: try to save! url >>> %s', url);
    request({
        url: url,
        encoding: 'binary',
        timeout: 6e4
    }, (error, response, body) => {
        threadLength--;
        if (!error && response.statusCode == 200) {
            fs.writeFile(path, body, 'binary', err => {
                if (err) {
                    downloadError(err, url, path);
                } else {
                    downloadImageLength++;
                    console.log('__imageDownloader__RE__: img saved! urlName >>> %s, path >>>> %s ', url.substr(-43), path);
                }
            });
        } else {
            downloadError(error || response.statusCode, url, path);
        }
    });
}

let downloadError = (err, url, path) => {
    console.log(`__imageDownloader__: ERROR! >>> ${url}`, err);
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
    console.log('__imageDownloader__: delete error path >>> ', path);
    errorList.push({
        url: url,
        path: path
    });
}


module.exports = {
    setName: (_name) => {
        name = _name;
        dataJson = name + '/data.json';
        savePath = 'e:/hanman/' + name + '/';
        savePath_html = 'e:/hanman/' + name + '/localHtml/';
    },
    go: () =>{
        readJsonData();
    }
}