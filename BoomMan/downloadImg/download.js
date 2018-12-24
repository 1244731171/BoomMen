//依赖模块
var fs = require('fs');
var http = require("http");
var request = require("request");
var mkdirp = require('mkdirp');

//获得数据
var data = ["http://mhimg.9mmc.com:44236/images/comic/326/650912/154558310965165091209574ced1.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/1545583115364650912183f7d553.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/15455831150016509122727adbd5.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/1545583111778650912360fde257.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/154558311400065091244f80e8d9.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/154558311236965091253e03ef5b.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/154558311919865091262c86f5dd.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/154558312302365091271b09fc5f.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/1545583116052650912898d02f6.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/15455831266426509129f8100978.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/154558312291565091210c4f0c6ed.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/154558312724165091211b373cd6f.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/154558312827265091212a1f6d3f1.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/1545583125671650912139079da73.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/1545583127270650912147efce0f5.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/1545583130114650912156d7fe777.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/1545583131684650912165c02edf9.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/1545583129778650912174a85f47b.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/1545583131476650912183908fb12.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/154558313940965091219278c0194.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/154558313975465091220a6ce90ab.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/1545583138696650912219551972d.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/15455831381566509122283d49daf.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/1545583137929650912237257a431.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/15455831436336509122460daaab3.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/1545583142619650912254f5db135.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/1545583145474650912263de0b7b7.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/1545583145429650912272c63be39.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/1545583144076650912281ae6c4d0.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/154558314308965091229969cb52.jpg", "http://mhimg.9mmc.com:44236/images/comic/326/650912/15455831421326509123088ac5a69.jpg"];

//本地存储目录
var dir = './test';

//创建目录
var makeDir = function (path) {
    mkdirp(path, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

//下载方法
var retryTimes = 2;
var download = function (url, path, callback) {
    callback = callback || new Function();
    request.head(url, function (err, res, body) {
        console.log("try to download, url: " + url);
        console.log(JSON.stringify(res));
        if (!err && res.statusCode == 200) {
            request(url).pipe(fs.createWriteStream(path))
                .on('close', function () {
                    retryTimes = 2;
                    console.log('img saved! path:' + path);
                    callback();
                });
        } else {
            console.log("try to download failed!");
            if (retryTimes-- > 0) {
                download(url, path, callback);
            } else {
                callback();
            }
        }
    });
};

var downloadIndex = 0;
var downloadNext = function () {
    var url = urls[downloadIndex];
    var path = paths[downloadIndex];
    if (url && path) {
        download(url, path, downloadNext);
        downloadIndex++;
    }
}

//入口
makeDir(dir);
var urls = [];
var paths = [];
for (var url of data) {
    urls.push(url);
    paths.push(dir + "/" + paths.length + ".jpg");
}

downloadNext();

var urls = [];
var imgs = [];
var url = $("#images img").attr('src').replace(chapterImages[0], '');
for (let u of chapterImages) {
    urls.push(url + u);
    imgs.push('<img src="' + (url + u) + '">');
}
document.body.innerHTML = imgs.join('');
var title = document.head.querySelector('title');
document.head.innerHTML = title.outerHTML;