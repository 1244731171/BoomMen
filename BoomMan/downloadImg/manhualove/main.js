const chapterCollector = require('./chapterCollector');
const imageCollector = require('./imageCollector');
const imageDownloader = require('./imageDownloader.1');
const imageConcater = require('./imageConcater');
const htmlCreater = require('./htmlCreater');
const logger = require('./log');

// let mainUrl = 'http://www.manhualove.com/dushi/wufazibadekouhongjiao/';
// let mainUrl = 'http://www.manhualove.com/dushi/nvshenzuolie/';
// let mainUrl = 'http://www.manhualove.com/shenghuo/yuqiuwangdierji/';
// let mainUrl = 'http://www.manhualove.com/gushi/jiemeilian/';
// let mainUrl = 'http://www.manhualove.com/gushi/mylovedoll/';
let mainUrl = 'http://www.manhualove.com/shenghuo/nvshenwangka/';

// let mainUrl = 'http://www.manhualove.com/xiaoyuan/yuqiuwang/';

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
    logger.log('PDF PATH >>> E:/hanman/%s/pdf', title);
    logger.log('================>.<= WELL DONE! =>.<================ ');
    logger.out();
}

collectChapter();