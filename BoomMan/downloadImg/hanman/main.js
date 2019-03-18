let InfoCollector = require('./downloadHanman.2.1');
let ImageDownloader = require('./imageDownload.2.1');
let ImageConcater = require('./imageConcater');
let htmlCreater = require('./htmlCreater');
const logger = require('./log');

// let mainPageUrl = "http://www.hanman.co/index/books/index/id/67.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/62.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/56.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/55.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/81.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/24.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/19.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/240.html"
// let mainPageUrl = "http://www.hanman.co/index/chapters/index/id/4724.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/123.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/21.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/41.html"

// let name = '新面孔New Face';
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/5.html";
// let name = '调教家政妇-双面保姆';
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/18.html";
// let name = '淑女花苑第二季';
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/30.html";
// let name = '禁断的诈欺之夜第一季';
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/111.html";
// let name = '禁断的诈欺之夜第二季';
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/112.html";
// let name = '老婆回来了';
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/114.html";
// let name = '初恋情节-报告学长';
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/115.html";
// let name = '积极追求攻势-尚雅的诱惑';
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/116.html";
// let name = '淫stagram';
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/124.html";
// let name = '初恋物语-拯救宅男 ';
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/241.html";

// let mainPageUrl = "http://www.hanman.co/index/books/index/id/101.html";
// let name = 'goodnight';
// let mainPageUrl = "https://www.hanman.co/index/books/index/id/735.html";
let name = '阿姨的秘密情事（有码）';
let mainPageUrl = "https://www.hanman.co/index/books/index/id/688.html";
let name = '阿姨的秘密情事1-9（无码）';
let mainPageUrl = "https://www.hanman.co/index/books/index/id/424.html";


// let name = '全职看护';
// let mainPageUrl = "https://www.hanman.co/index/books/index/id/762.html";




let dataPath = './' + name;
let imageataPath = 'e:/hanman/' + name;

let time = 0;
let time1 = 0;
let time0 = 0;

let collectPageurls = () => {
    time1 = time0 = time = new Date().getTime();
    InfoCollector.setJsonPath(dataPath);
    InfoCollector.setMainPageUrl(mainPageUrl);
    InfoCollector.setCallBack(createChapterHtml);
    InfoCollector.start();
}

let createChapterHtml = () => {
    logger.log(' >>>>>> CTEATECHAPTERHTML <<<<<< ');
    t3 = new Date().getTime();
    htmlCreater.setTitle(name);
    htmlCreater.setCallBack(downloadImages);
    htmlCreater.start();
}

let downloadImages = () => {
    time = new Date().getTime();
    console.log('COLLECT TIME: ', (time - time1) / 1000);
    time1 = time;
    ImageDownloader.setJsonPath(dataPath);
    ImageDownloader.setImagePath(imageataPath);
    ImageDownloader.setCallBack(concatImage);
    ImageDownloader.start();
}

let concatImage = () => {
    time = new Date().getTime();
    console.log('COLLECT TIME: ', (time - time1) / 1000);
    time1 = time;
    ImageConcater.setTitle(name);
    ImageConcater.setCallBack(doFinish);
    ImageConcater.start();
}

let doFinish = () => {
    time = new Date().getTime();
    console.log('COLLECT TIME: ', (time - time1) / 1000);
    console.log('ALL TIME: ', (time - time0) / 1000);
    console.log('MISSION COMPLETED!');
}

collectPageurls();