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
let nethtmlDatas = [];
let localhtmlDatas = [];
let iamgedata;

let isNetHtmlFinish = false;
let isLocalHtmlFinish = false;

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
            nethtmlDatas.push({
                index: i,
                str: str
            });
            localhtmlDatas.push({
                index: i,
                str: str2
            });
            i++;
            str = "";
            str2 = "";
        }
    }
    writeNextNetHtml();
    writeNextLocalHtml();
}

let writeNextNetHtml = () => {
    let i, str;
    if (nethtmlDatas.length) {
        let data = nethtmlDatas.splice(0, 1)[0];
        i = data['index'];
        str = data['str'];
    } else {
        isNetHtmlFinish = true;
        finished();
        return;
    }
    let path = netChapterPath + '/' + i + '.html';
    logger.log('__htmlCreater__: try to create NET html >>>> ', path);
    if (fs.existsSync(path)) {
        writeNextNetHtml();
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
                    if(err){
                        logger.log('__htmlCreater__: ERROR ' + err);
                    }else{
                        logger.log('__htmlCreater__: SUCCESSFUL!');
                        writeNextNetHtml();
                    }
                });
            });
        });
    }
}

let writeNextLocalHtml = () => {
    let i, str;
    if (localhtmlDatas.length) {
        let data = localhtmlDatas.splice(0, 1)[0];
        i = data['index'];
        str = data['str'];
    } else {
        isLocalHtmlFinish = true;
        finished();
        return;
    }
    let path = localChapterPath + '/' + i + '.html';
    logger.log('__htmlCreater__: try to create LOCAL html >>>> ', path);
    if (fs.existsSync(path)) {
        writeNextLocalHtml();
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
                    if(err){
                        logger.log('__htmlCreater__: ERROR ' + err);
                    }else{
                        logger.log('__htmlCreater__: SUCCESSFUL!');
                        writeNextLocalHtml();
                    }
                });
            });
        });
    }
}

let finished = () => {
    if(!isLocalHtmlFinish || !isNetHtmlFinish){
        return;
    }
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