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
let _imageData = {};
let chapterNumbers = 0;

let errors = [];

let index = 1;
let data = {};

let isTrueWriteImageJson = false;

let getChapterData = () => {
    logger.log('__imageCollecter__: >>>>>> START! <<<<<<');
    if (fs.existsSync(imageJsonPath)) {
        logger.log('__imageCollecter__: image.json exist! >>>> ', imageJsonPath);
        imageData = fs.readFileSync(imageJsonPath, 'utf8');
        imageData = JSON.parse(imageData);
        imageData.forEach(ele => {
            _imageData[ele.index] = ele;
        });
    }
    // 异步读取
    fs.readFile(chapterJsonPath, function (err, data) {
        if (err) {
            return logger.error(err);
        }
        chapterData = JSON.parse(data);
        chapterNumbers = chapterData.length;
        // chapterData.splice(0, index - 1);
        logger.log('__imageCollecter__: all chapterData length >>>> ', chapterData.length);
        getImageInfo();
    });
}
// 第(\d){1,2}頁</option>
let getImageInfo = () => {
    concatImageData();
    if (chapterData.length <= 0) {
        writeJson(true);
        return;
    }
    let mainUrl = chapterData.splice(0, 1)[0];
    if (_imageData[index] !== undefined) {
        logger.log('__imageCollecter__: image data exist! index >>>> %s, url >>>> %s', index, mainUrl);
        index++;
        data = {};
        getImageInfo();
        return;
    }
    logger.log('__imageCollecter__: index >>>> %s <<<<, url >>>> %s', index, mainUrl);
    data = {};
    data['index'] = index++;
    data['url'] = mainUrl;
    data['data'] = [];
    getImagePageInfo(mainUrl, 1);
}

let concatImageData = () => {
    if (data['data'] && data['data'].length) {
        data['realMax'] = data['data'].length.toString();
        logger.log('__imageCollecter__: index >>>> %s <<<<, max >>>> %s, realMax >>>> %s', data['index'], data['max'], data['realMax']);
        if (data.max !== data.realMax) {
            logger.log('__imageCollecter__: index >>>> %s <<<<, max !== realMax >>>> BAN!', data['index']);
            errors.push(JSON.stringify(data));
            return;
        }
        _imageData[data.index] = data;
        let _i = 0;
        imageData = [];
        while (_i++ < chapterNumbers) {
            if (_imageData[_i]) {
                imageData.push(_imageData[_i]);
            }
        }
        writeJson(!!!chapterData.length);
    } else {
        // logger.log('__imageCollecter__: current data ERROR! >>>> ', data);
    }
}

let getImagePageInfo = (url, pageIndex) => {
    if (data['max'] && pageIndex > data['max']) {
        getImageInfo();
        return;
    }

    let mainUrl = url + '-p-' + pageIndex;

    logger.log('__imageCollecter__: pageUrl >>>> ', mainUrl);
    request(mainUrl, { json: false }, (err, res, body) => {
        if (err) {
            logger.log(err);
        }

        if (pageIndex === 1) {
            let pages = body.match(/第(\d){1,2}頁\<\/option\>/g);
            data['max'] = pages.pop().replace('第', '').replace('頁</option>', '');
        }

        let imageUrl = body.match(/https\:\/\/([a-z]|[A-Z]|\.|[0-9]|\/)*.jpg/g);
        if (!imageUrl || !imageUrl.length) {
            getImageInfo();
        } else {
            imageUrl = imageUrl[0];
            logger.log('__imageCollecter__: imageUrl >>>> ', imageUrl);
            if (data['data'].indexOf(imageUrl) === -1) {
                data['data'].push(imageUrl);
                getImagePageInfo(url, pageIndex + 1);
            } else {
                getImageInfo();
            }
        }
    });
}

let writeJson = (isFinish) => {
    // 第一次读image.json文件时候返回的数据长度如果等于本次要写的长度
    // 说明数据没变化
    if(isFinish && !isTrueWriteImageJson){
        logger.log('__imageCollecter__: IMAGE JSON is NO CHANGE NEEDED!');
        collectEnd();
        return;
    }
    let str = JSON.stringify(imageData);
    fs.open(imageJsonPath, 'w', (err, fd) => {
        if (err) {
            logger.log('__imageCollecter__: ERROR ' + err);
        }
        if (isFinish) {
            logger.log('__imageCollecter__: collect SUCCESSFUL!, write image.json');
        }
        fs.writeFile(fd, str, (err) => {
            if (err) {
                logger.log('__imageCollecter__: ERROR ' + err);
            }
            fs.close(fd, (err) => {
                if (err) {
                    logger.log('__imageCollecter__: ERROR ' + err);
                }
                isTrueWriteImageJson = true;
                if (isFinish) {
                    if (errors.length > 0) {
                        logger.log('__imageCollecter__: errors data >>>> ', errors);
                        return;
                    }
                    logger.log('__imageCollecter__: write SUCCESSFUL!');
                    collectEnd();
                }
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