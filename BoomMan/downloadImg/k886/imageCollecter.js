//依赖模块
const logger = require("./log");

const fs = require('fs');
const request = require('request');

let title = '';
let = './' + title;
let chapterJsonPath = './' + title + '/chapter.json';
let imageJsonPath = './' + title + '/image.json';
let callbacks = [];
let chapterData;
let imageData = [];

let index = 1;
let data;

let getChapterData = () => {
    logger.log('__imageCollecter__: >>>>>> START! <<<<<<');
    if (fs.existsSync(imageJsonPath)) {
        logger.log('__imageCollecter__: image.json exist! >>>> ', imageJsonPath);
        imageData = fs.readFileSync(imageJsonPath, 'utf8');
        imageData = JSON.parse(imageData);
        index = imageData.length + 1;
        logger.log('__imageCollecter__: image.json length >>>> ', index - 1);
    }
    // 异步读取
    fs.readFile(chapterJsonPath, function (err, data) {
        if (err) {
            return logger.error(err);
        }
        chapterData = JSON.parse(data);
        chapterData.splice(0, index - 1);
        logger.log('__imageCollecter__: rest chapterData length >>>> ', chapterData.length);
        getImageInfo();
    });
}

let getImageInfo = () => {
    concatImageData();
    if (chapterData.length <= 0) {
        collectEnd();
        return;
    }
    let mainUrl = chapterData.splice(0, 1)[0];
    data = {};
    data['index'] = index++;
    data['url'] = mainUrl;
    data['data'] = [];
    logger.log('__imageCollecter__: index >>>> %s, url >>>> %s', index, mainUrl);
    getImagePageInfo(mainUrl, 1);
}

let concatImageData = () => {
    if(data){
        imageData.push(data);
        writeJson();
    }
}

let getImagePageInfo = (url, pageIndex) => {
    let mainUrl = url + '-p-' + pageIndex;
    logger.log('url >>>> ', mainUrl);
    request(mainUrl, { json: false }, (err, res, body) => {
        if (err) { return logger.log(err); }
        let imageUrl = body.match(/https\:\/\/([a-z]|[A-Z]|\.|[0-9]|\/)*.jpg/g);
        if (!imageUrl || !imageUrl.length) {
            getImageInfo();
        } else {
            imageUrl = imageUrl[0];
            logger.log(imageUrl);
            if (data['data'].indexOf(imageUrl) === -1) {
                data['data'].push(imageUrl);
                getImagePageInfo(url, pageIndex + 1);
            } else {
                getImageInfo();
            }
        }
    });
}

let writeJson = () => {
    fs.open(imageJsonPath, 'w', (err, fd) => {
        if (err) {
            logger.log('__imageCollecter__: ERROR ' + err);
        }
        let str = JSON.stringify(imageData);
        logger.log('__imageCollecter__: write image json');
        fs.writeFile(fd, str, (err) => {
            if (err) {
                logger.log('__imageCollecter__: ERROR ' + err);
            }
            fs.close(fd, (err) => {
                logger.log(err ? ('__imageCollecter__: ERROR ' + err) : '__imageCollecter__: SUCCESSFUL!');
                callbacks.forEach(element => {
                    if (typeof element === 'function') {
                        element();
                    }
                });
            });
        });
    });
}

let collectEnd = () => {
    logger.log('__imageCollecter__: >>>>>> END! <<<<<<');
    callbacks.forEach(element => {
        if (typeof element === 'function') {
            element();
        }
    });
}

module.exports = {
    setTitle: (_title) => {
        logger.log('__imageCollecter__: set title >>>> ', _title);
        title = _title;
        path = './' + title;
        chapterJsonPath = './' + title + '/chapter.json';
        imageJsonPath = './' + title + '/image.json';
    },
    setCallBack: (callback) => {
        callbacks.push(callback);
    },
    start: getChapterData
};