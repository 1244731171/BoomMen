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

let headers = {
    'Content-Type': 'application/json',
    // 'Content-Length': Buffer.byteLength(post_data),
    'Cookie': 'PHPSESSID=9sn0i5vdnadgtu7eqadqcphdd3; __51cke__=; uloginid=627865; __tins__2994155=%7B%22sid%22%3A%201563146425283%2C%20%22vd%22%3A%2022%2C%20%22expires%22%3A%201563148822168%7D; __51laig__=22'
    // 'Cookie': 'UM_distinctid=16b6b2fb9 fa2e1-09863dca910f83-3e385a0a-1fa400-16b6b2fb9fb61a; PHPSESSID=a8lf0evl082163vkpn7ddfhp97; CNZZDATA1277644898=1938338913-1560870063-http%253A%252F%252Fwww.manhuacun.com%252F%7C1561031580; uloginid=5441548042'
    // 'Cookie': 'UM_distinctid=16b6a45c1923f-03df5d2bb78235-4048032c-1fa400-16b6a45c193317; PHPSESSID=c7fgplrb9sru5lcbfek8q530t2; CNZZDATA1277644898=1000072972-1561026763-%7C1561496733; uloginid=8391820341'
};
let reDownload = function (url, path) {
    threadLength++;
    console.log('__imageDownloader__RE__: try to save! url >>> %s', url);
    
    // Configure the request
    let options = {
        url: url,
        method: 'GET',
        headers: headers,
        encoding: 'binary',
        timeout: 6e4
    };

    request(options, (error, response, body) => {
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