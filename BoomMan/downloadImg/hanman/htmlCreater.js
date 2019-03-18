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
let imagedata;

let isNetHtmlFinish = false;
let isLocalHtmlFinish = false;

let readJsonData = () => {
    logger.log('__htmlCreater__: >>>>>> START! <<<<<<');
    // 异步读取
    fs.readFile(imageJsonPath, function (err, data) {
        if (err) {
            return logger.log(err);
        }
        imagedata = JSON.parse(data);
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

let flag = 1;
let loopImageData = () => {
    if (flag != 2) {
        flag++;
        return;
    }
    logger.log('__htmlCreater__: >>>>>> loopImageData! <<<<<<');
    for (let info of imagedata) {
        let imageIndex = 1;
        let pageIndex = parseInt(info.index);
        let data = info.data;
        for (let url of data) {
            urls.push(url);
            paths.push('../' + pageIndex + '_' + (imageIndex++) + '.jpg');
        }
    }
    // logger.log('__htmlCreater__: >>>>>> loopPaths! <<<<<<', imagedata);
    // logger.log('__htmlCreater__: >>>>>> loopPaths! <<<<<<', urls);
    // logger.log('__htmlCreater__: >>>>>> loopPaths! <<<<<<', paths);
    loopPaths();
}

let loopPaths = () => {
    let i = 1;
    let path = "";
    let url = "";
    for (let index in paths) {
        let ele = paths[index];
        // logger.log('__htmlCreater__: >>>>>> loopPaths! <<<<<<', ele);
        // logger.log('__htmlCreater__: >>>>>> loopPaths! <<<<<<', '../' + i + "_");
        if (ele.startsWith('../' + i + "_")) {
            path += ('<img src="' + ele + '" style="width:500px"/><br/>');
            url += ('<img src="' + urls[index] + '" style="width:500px"/><br/>');
        } else {
            localhtmlDatas.push({
                index: i,
                str: path
            });
            nethtmlDatas.push({
                index: i,
                str: url
            });
            i++;
            url = "";
            path = "";
        }
    }
    // 最后chapter信息
    localhtmlDatas.push({
        index: i,
        str: path
    });
    nethtmlDatas.push({
        index: i,
        str: url
    });
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
        logger.log('__htmlCreater__: NET html EXISTED!');
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
                        logger.log('__htmlCreater__: NET html create SUCCESSFUL!');
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
        logger.log('__htmlCreater__: LOCAL html EXISTED!');
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
                        logger.log('__htmlCreater__: LOCAL html create SUCCESSFUL!');
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