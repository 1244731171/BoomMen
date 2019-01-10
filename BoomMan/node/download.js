const url1 = 'https://www.arb.com.au/site/wp-content/uploads/2016/06/arb-tank-test-banner-01.jpg';
const url2 = 'https://img.k886.net/upload/attachment/201809/13/5b99fa6c5f428.jpg';

const request = require('request');
const fs = require('fs');

let path1 = './1.jpg';
let path2 = './2.jpg';
let t1, t2, t3, t4

let data = [];
let download1 = (cb = download2) => {
    t1 = new Date().getTime();
    // request.head(url1, function (err, res, body) {
    //     // console.log("__imageDownloader__: try to download, url1 >>>> " + url1);
    //     // console.log('res >>> ', JSON.stringify(res));
    //     // console.log('err >>> ', err);
    //     if (!err && res.statusCode == 200) {
    //         request(url1).pipe(fs.createWriteStream(path1))
    //             .on('close', function () {
    //                 // console.log('__imageDownloader__: img saved! path >>>> ' + path1);
    //                 t3 = new Date().getTime();
    //                 console.log('pipe spend time >>>>>>', t3 - t1);
    //                 data.push('d11111', t3 - t1);
    //                 if (cb) cb();
    //             });
    //     } else {
    //         console.log(err);
    //     }
    // });
    request(url1).pipe(fs.createWriteStream(path1))
    .on('close', function () {
        // console.log('__imageDownloader__: img saved! path >>>> ' + path1);
        t3 = new Date().getTime();
        console.log('pipe spend time >>>>>>', t3 - t1);
        data.push('d11111', t3 - t1);
        if (cb) cb();
    });
}

let download2 = (cb = download1) => {
    t2 = new Date().getTime();
    // console.log("__imageDownloader__: try to download, url1 >>>> " + url1);
    request({ url: url1, encoding: 'binary' }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFile(path2, body, 'binary', function (err) {
                if (err) { console.log(err); }
                t4 = new Date().getTime();
                console.log('writeFile spend time >>>>>>', t4 - t2);
                data.push('d22222', t4 - t2);
                if (cb) cb();
                // console.log('__imageDownloader__: img saved! path >>>> ' + path1);
            });
        }
    });
}

let finish = () => {

}

// download2();
download1();