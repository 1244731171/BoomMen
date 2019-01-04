const chapterCollecter = require('./chapterCollecter');
const imageCollecter = require('./imageCollecter');
const imageDownloader = require('./imageDownloader');
const imageConcater = require('./imageConcater');
const htmlCreater = require('./htmlCreater');
const logger = require('./log');

let mainUrl = 'https://www.k886.net/index-comic-name-%E4%B8%8D%E5%80%AB%E9%A7%95%E8%A8%93%E7%8F%AD-id-35958';
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