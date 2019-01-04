//依赖模块
const logger = require("./log");

const fs = require('fs');
const mkdirp = require('mkdirp');

let title = '';
let imageJsonPath = './' + title + '/image.json';
let localChapterPath = 'e:/hanman/' + title + '/localChapter';
let netChapterPath = 'e:/hanman/' + title + '/netChapter';
let callbacks = [];
let paths = [];
let urls = [];
let htmlDatas = [];
let iamgedata;

let readJsonData = () => {
    logger.log('__htmlCreater__: >>>>>> START! <<<<<<');
    // 异步读取
    fs.readFile(imageJsonPath, function (err, data) {
        if (err) {
            return logger.error(err);
        }
        iamgedata = JSON.parse(data);
        makeDir(localChapterPath);
        makeDir(netChapterPath);
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

let flag = false;
let loopImageData = () => {
    if (flag) {
        return;
    }
    flag = true;
    for (let info of iamgedata) {
        let iamgeIndex = 1;
        let pageIndex = info.index;
        let imageData = info.data;
        for (let url of imageData) {
            urls.push(url);
            paths.push('../' + pageIndex + '_' + (iamgeIndex++) + '.jpg');
        }
    }
    loopPaths();
}

let loopPaths = () => {
    let i = 1;
    let str = "";
    let str2 = "";
    for (let index in paths) {
        let ele = paths[index];
        if (ele.startsWith('../' + i + "_")) {
            str += ('<img src="' + ele + '"/><br/>');
            str2 += ('<img src="' + urls[index] + '"/><br/>');
        } else {
            htmlDatas.push({
                index: i,
                str: str,
                str2: str2
            });
            i++;
            str = "";
            str2 = "";
        }
    }
    writeNextHtml();
}

let writeNextHtml = () => {
    let i, str, str2;
    if (htmlDatas.length) {
        let data = htmlDatas.splice(0, 1)[0];
        i = data['index'];
        str = data['str'];
        str2 = data['str2'];
    } else {
        finished();
        return;
    }
    let path = localChapterPath + '/' + i + '.html';
    logger.log('__htmlCreater__: try to create html >>>> ', path);
    if (fs.existsSync(path)) {
        writeNextHtml();
    } else {
        fs.open(path, 'w', (err, fd) => {
            if (err) {
                logger.log('__htmlCreater__: ERROR ' + err);
            }
            fs.writeFile(fd, str, (err) => {
                if (err) {
                    logger.log('__htmlCreater__: ERROR ' + err);
                }
                fs.close(fd, (err) => {
                    logger.log(err ? ('__htmlCreater__: ERROR ' + err) : '__htmlCreater__: SUCCESSFUL!');
                });
            });
        });
    }
    let path2 = netChapterPath + '/' + i + '.html';
    logger.log('__htmlCreater__: try to create html >>>> ', path2);
    if (fs.existsSync(path2)) {
        writeNextHtml();
    } else {
        fs.open(path2, 'w', (err, fd) => {
            if (err) {
                logger.log('__htmlCreater__: ERROR ' + err);
            }
            fs.writeFile(fd, str2, (err) => {
                if (err) {
                    logger.log('__htmlCreater__: ERROR ' + err);
                }
                fs.close(fd, (err) => {
                    logger.log(err ? ('__htmlCreater__: ERROR ' + err) : '__htmlCreater__: SUCCESSFUL!');
                    writeNextHtml();
                });
            });
        });
    }
}

let finished = () => {
    logger.log('__htmlCreater__: >>>>>> END! <<<<<<');
    callbacks.forEach(element => {
        if (typeof element === 'function') {
            element();
        }
    });
}

module.exports = {
    setTitle: (_title) => {
        logger.log('__htmlCreater__: set title >>>> ', _title);
        title = _title;
        chapterJsonPath = './' + title + '/chapter.json';
        imageJsonPath = './' + title + '/image.json';
        localChapterPath = 'e:/hanman/' + title + '/localChapter';
        netChapterPath = 'e:/hanman/' + title + '/netChapter';
    },
    setCallBack: (callback) => {
        callbacks.push(callback);
    },
    start: readJsonData
};