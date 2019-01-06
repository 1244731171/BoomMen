const chapterCollecter = require('./chapterCollecter');
const imageCollecter = require('./imageCollecter.1');
const imageDownloader = require('./imageDownloader');
const imageConcater = require('./imageConcater');
const htmlCreater = require('./htmlCreater');
const logger = require('./log');

// let mainUrl = 'https://www.k886.net/index-comic-name-%E4%B8%8D%E5%80%AB%E9%A7%95%E8%A8%93%E7%8F%AD-id-35958';
// let mainUrl = 'https://www.k886.net/index-comic-name-%E8%A3%BD%E4%BD%9C%E4%BA%BA%E7%B7%B4%E7%BF%92%E7%94%9F-id-36573';
let mainUrl = 'https://www.k886.net/index-comic-name-%E5%A4%A9%E4%BD%BF%E7%9A%84%E7%9C%BC%E6%B7%9A-id-36132';

// let mainUrl = 'https://www.k886.net/index-comic-name-%E7%8C%9C%E4%B8%8D%E9%80%8F%E7%9A%84%E5%BF%83-id-36242';
// https://www.k886.net/index-comic-name-%E9%82%A3%E8%A3%A1%E7%9A%84%E9%A6%99%E6%B0%A3-id-36125
// let mainUrl = 'https://www.k886.net/index-comic-name-MAD%E5%B0%8F%E5%A7%90%E8%88%87%E5%8F%B8%E6%A9%9F-id-36190';
// let mainUrl = 'https://www.k886.net/index-comic-name-%E6%B7%AB%E6%96%B0%E5%B0%8F%E5%A5%97%E6%88%BF-id-36330';
// let mainUrl = 'https://www.k886.net/index-comic-name-SuperDick-id-36391';
// let mainUrl = 'https://www.k886.net/index-comic-name-%E5%82%80%E5%84%A1-id-36455';
// let mainUrl = 'https://www.k886.net/index-comic-name-%E5%A5%B9%E7%9A%84%E9%AB%98%E8%B7%9F%E9%9E%8B-id-36222';
// let mainUrl = 'https://www.k886.net/index-comic-name-DarkSea-id-36126';

let title = '';
let collectChapter = () => {
    logger.log(' >>>>>> COLLECTCHAPTER <<<<<< ');
    chapterCollecter.setUrl(mainUrl);
    chapterCollecter.setCallBack(collectImage);
    chapterCollecter.start();
}

let t1, t2;
let collectImage = () => {
    logger.log(' >>>>>> COLLECTIMAGE <<<<<< ');
    title = chapterCollecter.getTitle()
    imageCollecter.setTitle(title);
    imageCollecter.setCallBack(createChapterHtml);
    imageCollecter.start();
}

let createChapterHtml = () => {
    logger.log(' >>>>>> CTEATECHAPTERHTML <<<<<< ');
    htmlCreater.setTitle(title);
    htmlCreater.setCallBack(downloadImages);
    htmlCreater.start();
}

let downloadImages = () => {
    t1 = new Date().getTime();
    logger.log(' >>>>>> DOWNLOADIMAGE <<<<<< ');
    imageDownloader.setTitle(title);
    imageDownloader.setCallBack(concatImage);
    imageDownloader.start();
}

let concatImage = () => {
    t2 = new Date().getTime();
    logger.log(' >>>>>> concatImage time %s <<<<<< ', t2 - t1);
    logger.log(' >>>>>> CONCATIMAGE <<<<<< ');
    imageConcater.setTitle(title);
    imageConcater.setCallBack(wellDone)
    imageConcater.start();
}

let wellDone = () => {
    logger.log('================>.<= WELL DONE! =>.<================ ');
}

collectChapter();