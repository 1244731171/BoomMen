let InfoCollector = require('./downloadHanman.2.1');
let ImageDownloader = require('./imageDownload.2.1');
let ImageConcater = require('./imageplus.2.1');

// let mainPageUrl = "http://www.hanman.co/index/books/index/id/67.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/62.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/56.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/55.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/81.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/24.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/19.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/240.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/101.html"
// let mainPageUrl = "http://www.hanman.co/index/chapters/index/id/4724.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/123.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/5.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/21.html"
// let mainPageUrl = "http://www.hanman.co/index/books/index/id/41.html"
let mainPageUrl = "http://www.hanman.co/index/books/index/id/30.html"

let dataPath = './淑女花苑第二季';
let imageataPath = 'e:/hanman/淑女花苑第二季';

let time = 0;
let time1 = 0;
let time0 = 0;

let collectPageurls = () => {
    time1 = time0 = time = new Date().getTime();
    InfoCollector.setJsonPath(dataPath);
    InfoCollector.setMainPageUrl(mainPageUrl);
    InfoCollector.setCallBack(downloadImages);
    InfoCollector.start();
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
    ImageConcater.setJsonPath(dataPath);
    ImageConcater.setImagePath(imageataPath);
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