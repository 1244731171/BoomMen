//依赖模块
const logger = require("./log");

const fs = require('fs');
const request = require("request");
const mkdirp = require('mkdirp');

let imagePath = 'e:/hanman/欲求王';

//创建目录
let makeDir = function (path) {
    mkdirp(path, function (err) {
        if (err) {
            logger.log(err);
        }
    });
}

let tryDownloadDatas = [];
let tryDownload = (url, name, isPath = false, isRetry = false) => {
    let path = isPath ? name : imagePath + '/' + name;
    if (fs.existsSync(path)) {
        logger.log('__imageDownloadPlugin__: path existed! >>> ', path);
        return;
    } else {
        logger.log('__imageDownloadPlugin__: get image info! ready to download');
    }
    tryDownloadDatas.push({
        url: url,
        path: path,
        isRetry: isRetry
    });
    checkDownload();
}

let threadLength = 0;
let threadMax = 5;
let isWaitingCheck = false;
let checkDownload = () => {
    if (!isWaitingCheck && tryDownloadDatas.length > 0) {
        if (threadLength < threadMax) {
            let data = tryDownloadDatas.splice(0, 1)[0];
            download(data['url'], data['path'], data['isRetry']);
            checkDownload();
        } else {
            isWaitingCheck = true;
            setTimeout(function () {
                isWaitingCheck = false;
                checkDownload();
            }, 500);
        }
    }
}

// let download = function (url, path) {
//     threadLength++;
//     request.head(url, function (err, res, body) {
//         // logger.log("__imageDownloadPlugin__: try to download, url >>>> " + url);
//         // logger.log(JSON.stringify(res));
//         if (!err && res.statusCode == 200) {
//             let writer = fs.createWriteStream(path);
//             writer.on('error', err => {
//                 logger.log('__imageDownloadPlugin__: ERROR! >>> ', err);
//                 if (fs.existsSync(path)) {
//                     fs.unlinkSync(path);
//                     logger.log('__imageDownloadPlugin__: delete error path, waite to retry >>> ', path);
//                     tryDownload(url, path, true);
//                 }
//             });
//             writer.on('close', () => {
//                 threadLength--;
//                 logger.log('__imageDownloadPlugin__: img saved! url >>> %s, path >>>> %s ', url, path);
//             });
//             request(url).pipe(writer);
//         } else {
//             logger.log('__imageDownloadPlugin__: ERROR! >>> ', err);
//             logger.log("__imageDownloadPlugin__: try to download failed!, waite to retry, url >>>> " + url);
//             tryDownload(url, path, true);
//             threadLength--;
//         }
//     });
// };

let download = function (url, path, isRetry) {
    threadLength++;

    request({ url: url, encoding: 'binary' }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            fs.writeFile(path, body, 'binary', err => {
                threadLength--;
                if (err) {
                    downloadError(err, url, path, isRetry);
                } else {
                    logger.log('__imageDownloadPlugin__: img saved! urlName >>> %s, path >>> %s ', url.substr(-17), path);
                }
            });
        } else {
            threadLength--;
            downloadError(error || response.statusCode, url, path);
        }
    });
}

let downloadError = (err, url, path, isRetry) => {
    logger.log('__imageDownloadPlugin__: ERROR! >>> ', err);
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
        logger.log('__imageDownloadPlugin__: delete error path', path);
    }
    if (isRetry) {
        // 就重試1次 再失敗就由imageDownload去下載
        logger.log('__imageDownloadPlugin__: ERROR ANGIN! give up to DOWNLOAD, url >>> %s, name >>> %s', url, path.replace(imagePath, ''));
    } else {
        tryDownload(url, path, true, true);
    }
}

module.exports = {
    setTitle: (_title) => {
        path = './' + _title;
        imagePath = 'e:/hanman/' + _title;
        makeDir(imagePath);
    },
    download: tryDownload
};