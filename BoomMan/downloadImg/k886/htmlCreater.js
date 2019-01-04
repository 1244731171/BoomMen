//依赖模块
const logger = require("./log");

const fs = require('fs');
const mkdirp = require('mkdirp');

let title = '';
let imageJsonPath = './' + title + '/image.json';
let imagePath = 'e:/hanman/' + title;
let chapterPath = 'e:/hanman/' + title + '/chapter';
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
        makeDir(chapterPath);
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
            paths.push(pageIndex + '_' + (iamgeIndex++) + '.jpg');
        }
    }
    loopPaths();
}

let loopPaths = () => {
    let i = 1;
    let str = "";
    paths.forEach(ele => {
        if (ele.startsWith(i + "_")) {
            str += ('<img src="' + ele + '"/><br/>');
        } else {
            htmlDatas.push({
                index: i,
                str: str
            });
            i++;
            str = "";
        }
    });
    writeNextHtml();
}

let writeNextHtml = () => {
    let i, str;
    if(htmlDatas.length){
        let data =  htmlDatas.splice(0, 1)[0];
        i = data['index'];
        str = data['str'];
    }else{
        finished();
        return;
    }
    let path = chapterPath + '/' + i + '.html';
    logger.log('__htmlCreater__: try to create html >>>> ', path);
    if(fs.existsSync(path)){
        writeNextHtml();
    }else{
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
        imagePath = 'e:/hanman/' + _title;
        chapterPath = 'e:/hanman/' + _title + '/chapter';
    },
    setCallBack: (callback) => {
        callbacks.push(callback);
    },
    start: readJsonData
};