const chapterCollector = require('./chapterCollector');
const imageCollector = require('./imageCollector');
const imageDownloader = require('./imageDownloader');
const imageConcater = require('./imageConcater');
const htmlCreater = require('./htmlCreater');
const logger = require('./log');

// let mainUrl = 'https://www.k886.net/index-comic-name-%E4%B8%8D%E5%80%AB%E9%A7%95%E8%A8%93%E7%8F%AD-id-35958';
let mainUrl = 'https://www.k886.net/index-comic-name-%E8%A3%BD%E4%BD%9C%E4%BA%BA%E7%B7%B4%E7%BF%92%E7%94%9F-id-36573';
// let mainUrl = 'https://www.k886.net/index-comic-name-%E5%A4%A9%E4%BD%BF%E7%9A%84%E7%9C%BC%E6%B7%9A-id-36132';
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
    t1 = new Date().getTime();
    chapterCollector.setUrl(mainUrl);
    chapterCollector.setCallBack(collectImage);
    chapterCollector.start();
}

let t1,t2,t3,t4,t5,t6,t7;
let collectImage = () => {
    logger.log(' >>>>>> COLLECTIMAGE <<<<<< ');
    t2 = new Date().getTime();
    title = chapterCollector.getTitle()
    imageCollector.setTitle(title);
    imageCollector.setCallBack(createChapterHtml);
    imageCollector.start();
}

let createChapterHtml = () => {
    logger.log(' >>>>>> CTEATECHAPTERHTML <<<<<< ');
    t3 = new Date().getTime();
    htmlCreater.setTitle(title);
    htmlCreater.setCallBack(downloadImages);
    htmlCreater.start();
}

let downloadImages = () => {
    logger.log(' >>>>>> DOWNLOADIMAGE <<<<<< ');
    t4 = new Date().getTime();
    imageDownloader.setTitle(title);
    imageDownloader.setCallBack(concatImage);
    imageDownloader.start();
}

let concatImage = () => {
    logger.log(' >>>>>> CONCATIMAGE <<<<<< ');
    t5 = new Date().getTime();
    imageConcater.setTitle(title);
    imageConcater.setCallBack(wellDone)
    imageConcater.start();
}

let wellDone = () => {
    t6 = new Date().getTime();
    logger.log('COLLECT CHAPTER INFO. spend time >>> ', t2 - t1);
    logger.log('COLLECT IMAGE INFO. spend time >>> ', t3 - t2);
    logger.log('CREATE CHAPTER HTML. spend time >>> ', t4 - t3);
    logger.log('DOWNLOAD IMAGE. spend time >>> ', t5 - t4);    
    logger.log('CONCAT IMAGE. spend time >>> ', t6 - t5);    
    logger.log('======================================================');
    logger.log('IMAGE SAVE PATH >>> E:/hanman/%s/', title);
    logger.log('NET HTML PATH >>> E:/hanman/%s/netChapter/', title);
    logger.log('LOCAL HTML PATH >>> E:/hanman/%s/localChapter/', title);
    logger.log('CONCAT IMAGE PATH >>> E:/hanman/%s/plus', title);
    logger.log('================>.<= WELL DONE! =>.<================ ');
    logger.out();
}

collectChapter();