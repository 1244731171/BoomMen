//依赖模块

// http://www.manhuacun.com/Mh/inforedit.html&mhid=338&ji_no=54
// ！http://www.manhuacun.com/Mh/inforedit.html&mhid=563&ji_no=8
// http://www.manhuacun.com/Mh/inforedit.html&mhid=593&ji_no=77
// http://www.manhuacun.com/Mh/inforedit.html&mhid=680&ji_no=103
// http://www.manhuacun.com/Mh/inforedit.html&mhid=67&ji_no=103
// ！http://www.manhuacun.com/Mh/inforedit.html&mhid=692&ji_no=11
// http://www.manhuacun.com/Mh/inforedit.html&mhid=697&ji_no=32
// 哥哥的秘密
// http://www.manhuacun.com/Mh/inforedit.html&mhid=700&ji_no=12
// http://www.manhuacun.com/Mh/inforedit.html&mhid=715&ji_no=26
// 狩猎母猪
// http://www.manhuacun.com/Mh/inforedit.html&mhid=716&ji_no=15
// http://www.manhuacun.com/Mh/inforedit.html&mhid=723&ji_no=64
// http://www.manhuacun.com/Mh/inforedit.html&mhid=728&ji_no=38
// http://www.manhuacun.com/Mh/inforedit.html&mhid=15&ji_no=16
// http://www.manhuacun.com/Mh/inforedit.html&mhid=19&ji_no=14&sub=
// ！http://www.manhuacun.com/Mh/inforedit.html&mhid=74&ji_no=11
// http://www.manhuacun.com/Mh/inforedit.html&mhid=69&ji_no=20
// http://www.manhuacun.com/Mh/inforedit.html&mhid=741&ji_no=22
// http://www.manhuacun.com/Mh/inforedit.html&mhid=741&ji_no=45
// http://www.manhuacun.com/Mh/inforedit.html&mhid=40&ji_no=25
// http://www.manhuacun.com/Mh/inforedit.html&mhid=44&ji_no=24
// http://www.manhuacun.com/Mh/inforedit.html&mhid=142&ji_no=32
// ！http://www.manhuacun.com/Mh/inforedit.html&mhid=100&ji_no=12
// ！http://www.manhuacun.com/Mh/inforedit.html&mhid=117&ji_no=12
// http://www.manhuacun.com/Mh/inforedit.html&mhid=122&ji_no=59
// http://www.manhuacun.com/Mh/inforedit.html&mhid=130&ji_no=18
// http://www.manhuacun.com/Mh/inforedit.html&mhid=127&ji_no=23&sub=
// http://www.manhuacun.com/Mh/inforedit.html&mhid=168&ji_no=26
// http://www.manhuacun.com/Mh/inforedit.html&mhid=140&ji_no=18&sub=


const fs = require('fs');
const request = require("request");
const mkdirp = require('mkdirp');

let errorList = [];

let downloadImageLength = 0;
let threadLength = 0;

let name = '冲突';
let dataJson = name + '/data.json';
let savePath = 'e:/hanman/' + name + '/';
let savePath_html = 'e:/hanman/' + name + '/localHtml/';

let imagedata;
let urls = [];
let paths = [];
let chapMark = [];
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
        let data = info.data;
        let imgIndex = 1;
        for (let url of data) {
            urls.push(url);
            paths.push(savePath + index + '_' + (imgIndex++) + '.jpg');
            chapMark.push(index);
        }
        index++;
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
    if (threadLength > 3) {
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
    let last = 1;
    let curIndex = 0;
    let sameChap = [];
    let sameChapPath = [];
    while (chapMark.length > 0) {
        // console.log('chapMark.length =>' + chapMark.length + ',curIndex =>' + curIndex);
        if (last != chapMark[curIndex]) {
            console.log('last =>' + last + 'chapMark =>' + chapMark[curIndex] + ',paths =>' + paths[curIndex] + ',curIndex =>' + curIndex);
            last = chapMark[curIndex];
            sameChap = chapMark.splice(0, curIndex);
            sameChapPath = paths.splice(0, curIndex);
            curIndex = 0;
            markHTML(sameChapPath, sameChap[0]);
        } else if (curIndex === (chapMark.length - 1)) {
            console.log('last =>' + last + 'chapMark =>' + chapMark[curIndex] + ',paths =>' + paths[curIndex] + ',curIndex =>' + curIndex);
            last = chapMark[curIndex];
            sameChap = chapMark.splice(0, curIndex + 1);
            sameChapPath = paths.splice(0, curIndex + 1);
            curIndex = 0;
            markHTML(sameChapPath, sameChap[0]);
        } else {
            curIndex++;
        }
    }

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




// module.exports = {
//     setTitle: (_title) => {
//         path = './' + _title;
//         imagePath = 'e:/hanman/' + _title;
//     },
//     setImagePath: (p) => {
//         imagePath = p;
//     },
//     setCallBack: (callback) => {
//         callbacks.push(callback);
//     },
//     start: readJsonData
// };

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