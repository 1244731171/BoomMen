//依赖模块
const fs = require('fs');
const http = require("http");
const request = require("request");
const mkdirp = require('mkdirp');

const path = './欲求王';
const jsonName = 'data.json';
// 异步读取
fs.readFile(path + '/' + jsonName, function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("异步读取: " + data.toString());
 });

// //创建目录
// var makeDir = function (path) {
//     mkdirp(path, function (err) {
//         if (err) {
//             console.log(err);
//         }
//     });
// }

// //下载方法
// var retryTimes = 2;
// var download = function (url, path, callback) {
//     callback = callback || new Function();
//     request.head(url, function (err, res, body) {
//         console.log("try to download, url: " + url);
//         console.log(JSON.stringify(res));
//         if (!err && res.statusCode == 200) {
//             request(url).pipe(fs.createWriteStream(path))
//                 .on('close', function () {
//                     retryTimes = 2;
//                     console.log('img saved! path:' + path);
//                     callback();
//                 });
//         } else {
//             console.log("try to download failed!");
//             if (retryTimes-- > 0) {
//                 download(url, path, callback);
//             } else {
//                 callback();
//             }
//         }
//     });
// };

// var downloadIndex = 0;
// var downloadNext = function () {
//     var url = urls[downloadIndex];
//     var path = paths[downloadIndex];
//     if (url && path) {
//         download(url, path, downloadNext);
//         downloadIndex++;
//     }
// }

// //入口
// makeDir(dir);
// var urls = [];
// var paths = [];
// for (var url of data) {
//     urls.push(url);
//     paths.push(dir + "/" + paths.length + ".jpg");
// }

// downloadNext();

// var urls = [];
// var imgs = [];
// var url = $("#images img").attr('src').replace(chapterImages[0], '');
// for (let u of chapterImages) {
//     urls.push(url + u);
//     imgs.push('<img src="' + (url + u) + '">');
// }
// document.body.innerHTML = imgs.join('');
// var title = document.head.querySelector('title');
// document.head.innerHTML = title.outerHTML;
// JSON.stringify(urls);