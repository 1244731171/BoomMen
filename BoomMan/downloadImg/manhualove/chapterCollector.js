//依赖模块
const logger = require("./log");

const fs = require('fs');
const mkdirp = require('mkdirp');
const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let host = 'http://www.manhualove.com';
let title = '';
let path = './' + title;
let jsonPath = './' + title + '/chapter.json';
let mainUrl = 'https://www.k886.net/index-comic-name-%E4%B8%8D%E5%80%AB%E9%A7%95%E8%A8%93%E7%8F%AD-id-35958';
let callbacks = [];
let isCreatePath = false;
let datas;

//创建目录
let makeDir = (_path) => {
    mkdirp(_path, err => {
        if (err) {
            logger.log('__chapterColleter__: ERROR ' + err);
        }
        logger.log('__chapterColleter__: path created >>>> ', _path);
        isCreatePath = true;
        writeJson();
    });
}

let setTitle = (_title) => {
    _title = _title.replace(/\:|\<|\>|\||\?|\*|\\|\/|\"/g,'');
    logger.log('__chapterColleter__: get title >>>> ', _title);
    title = _title;
    path = './' + title;
    jsonPath = './' + title + '/chapter.json';
    if(fs.existsSync(jsonPath)){
        logger.log('__chapterColleter__: chapter.json exist! >>>> ', jsonPath);
        collectEnd();
    }else{
        makeDir(path);
    }
}

let writeJson = () => {
    if (datas && isCreatePath) {
        fs.open(jsonPath, 'w', (err, fd) => {
            if (err) {
                logger.log('__chapterColleter__: ERROR ' + err);
            }
            let str = JSON.stringify(datas);
            logger.log('__chapterColleter__: write chapter json');
            logger.log(datas);
            fs.writeFile(fd, str, (err) => {
                if (err) {
                    logger.log('__chapterColleter__: ERROR ' + err);
                }
                fs.close(fd, (err) => {
                    logger.log(err ? ('__chapterColleter__: ERROR ' + err) : '__chapterColleter__: SUCCESSFUL!');
                    collectEnd();
                });
            });
        });
    }
}

let collectEnd = () => {
    logger.log('__chapterColleter__: >>>>>> END! <<<<<<');
    callbacks.forEach(element => {
        if(typeof element === 'function'){
            element();
        }
    });
}

let getPagesInfo = () => {
    logger.log('__chapterColleter__: >>>>>> START! <<<<<<');
    request(mainUrl, { json: false }, (err, res, body) => {
        if (err) { return logger.log(err); }
        let dom = new JSDOM(body);
        setTitle(dom.window.document.querySelector('title').text.split('_')[0]);
        let as = dom.window.document.querySelector('#mh-chapter-list-ol-0').querySelectorAll('a');
        datas = [];
        as.forEach(a => {
            datas.push(host + a.href);
        });
        datas.reverse();
        writeJson();
    });
}

let getTitle = () => {
    return title;
}

module.exports = {
    setUrl: (u) => {
        mainUrl = u;
    },
    setCallBack: (callback) => {
        callbacks.push(callback);
    },
    getTitle: getTitle,
    start: getPagesInfo
};