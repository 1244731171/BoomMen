//依赖模块
const logger = require("./log");
const base64_decode = require('./base64_decode');
const downloadPlugin = require('./imageDownloaderPlugin');

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

let index = 1;
let data = {};

let isTrueWriteImageJson = false;
let host = 'http://www.manhualove.com';

let getChapterData = () => {
    logger.log('__imageCollecter__: >>>>>> START! <<<<<<');
    if (fs.existsSync(imageJsonPath)) {
        logger.log('__imageCollecter__: image.json exist! >>>> ', imageJsonPath);
        imageData = fs.readFileSync(imageJsonPath, 'utf8');
        imageData = JSON.parse(imageData);
        imageData.forEach(ele => {
            logger.log('__imageCollecter__: found image data! index >>>> ', ele.index);
            _imageData[ele.index] = ele;
        });
        imageData = [];
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
    let mainUrl = chapterData.splice(0, 1)[0];
    let existData = _imageData[index];
    if (existData && existData.index == index && existData.url == mainUrl) {
        logger.log('__imageCollecter__: exist same data! index >>>> %s <<<<', index);
        index++;
        imageData.push(existData);
        data = {};
        if (chapterData.length <= 0) {
            writeJson(true);
        } else {
            writeJson(false);
            getImageInfo();
        }
    } else {
        delete _imageData[index];
        logger.log('__imageCollecter__: try to get data! index >>>> %s <<<<, url >>>> %s', index, mainUrl);
        data = {};
        data['index'] = index++;
        data['url'] = mainUrl;
        data['data'] = [];
        getImagePageInfo(mainUrl);
    }
}

let getImagePageInfo = (mainUrl) => {
    logger.log('__imageCollecter__: pageUrl >>>> ', mainUrl);
    request(mainUrl, { json: false }, (err, res, body) => {
        if (err) {
            logger.log('__imageCollecter__: ERROR and retry! >>>>', err);
            getImagePageInfo(mainUrl);
            return
        }

        let imageUrl = body.match(/qTcms_S_m_murl_e\=\"([a-z,A-Z,0-9]|\=|\+|\/)*\"/g);
        if (!imageUrl || !imageUrl.length) {
            logger.log('__imageCollecter__: ERROR! No match >>>>', err);
            return;
        } else {
            imageUrl = imageUrl[0].replace('qTcms_S_m_murl_e=', '').replace(/\"/g, '');
            let _data = base64_decode(imageUrl).split('$qingtiandy$');
            let i = 1;
            let _url = '';
            _data.forEach(ele => {
                _url = host + ele;
                logger.log('__imageCollecter__: imageUrl >>>> ', _url);
                data.data.push(_url);
                downloadPlugin.download(_url, data.index + '_' + i + '.jpg');
                i++;
            });
            data.max = _data.length;
            data.realMax = _data.length;
            // logger.log('__imageCollecter__: get Data!>>>>', JSON.stringify(data.data));
            logger.log('__imageCollecter__: get data SUCCESSFUL! index >>>> %s <<<<, length >>>> %s', data.index, data.max);
            if (chapterData.length <= 0) {
                writeJson(true);
            } else {
                writeJson(false);
                getImageInfo();
            }
        }
    });
}

let writeJson = (isFinish) => {
    // 第一次读image.json文件时候返回的数据长度如果等于本次要写的长度
    // 说明数据没变化
    if (data.data) {
        imageData.push(data);
    } else {
        if (isFinish) {
            if (chapterNumbers === imageData.length) {
                if (!isTrueWriteImageJson) {
                    logger.log('__imageCollecter__: IMAGE JSON is NO CHANGE NEEDED!');
                } else {
                    logger.log('__imageCollecter__: finish with SUCCESSFUL! chapter length >>> %s, real length >>> %s', chapterNumbers, imageData.length);
                }
            } else {
                logger.log('__imageCollecter__: finish with ERROR! chapter length >>> %s, real length >>> %s', chapterNumbers, imageData.length);
            }
            collectEnd();
        }
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
                logger.log('__imageCollecter__: write SUCCESSFUL!');
                isTrueWriteImageJson = true;
                if (isFinish) {
                    if (chapterNumbers === imageData.length) {
                        logger.log('__imageCollecter__: finish with SUCCESSFUL! chapter length >>> %s, real length >>> %s', chapterNumbers, imageData.length);
                        collectEnd();
                    } else {
                        logger.log('__imageCollecter__: finish with ERROR! chapter length >>> %s, real length >>> %s', chapterNumbers, imageData.length);
                    }
                }
            });
        });
    });
}

let collectEnd = () => {
    downloadPlugin.stop();
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
        downloadPlugin.setTitle(_title);
    },
    setCallBack: (callback) => {
        callbacks.push(callback);
    },
    start: getChapterData,
    totalLength: () => {
        let rl = 0;
        let ml = 0;
        imageData.forEach(ele => {
            rl += parseInt(ele.realMax);
            ml += parseInt(ele.max);
        });
        return {
            realLength: rl,
            maxLength: ml,
            chapterLength: chapterNumbers
        };
    }
};