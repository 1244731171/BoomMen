const url1 = 'https://img.k886.net/upload/attachment/201809/13/5b99fa6c5f428.jpg';
const url2 = 'http://img.k886.net/upload/attachment/201809/13/5b99fa6c5f428.jpg';

const request = require('request');
const fs = require('fs');

let path = './1.jpg';
request.head(url1, function (err, res, body) {
    console.log("__imageDownloader__: try to download, url1 >>>> " + url1);
    console.log('res >>> ', JSON.stringify(res));
    console.log('err >>> ', err);
    if (!err && res.statusCode == 200) {
        request(url1).pipe(fs.createWriteStream(path))
            .on('close', function () {
                console.log('__imageDownloader__: img saved! path >>>> ' + path);
            });
    } else {
        console.log(err);
    }
});