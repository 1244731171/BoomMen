const request = require('request');
const fs = require('fs');
const log = require('./logger');

let data = [];
let threadLength = 0;

let errorList = [];

let cb = () => { };
let isAddAll = false;

let headers = {
    'Content-Type': 'application/json',
    'user-agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Mobile Safari/537.36',
    'Cookie': 'UM_distinctid=16e447ddad771f-02ef3744453095-54123110-1fa400-16e447ddad8947; _ga=GA1.2.1616809352.1573107139; __cfduid=dea7a4463264f5d1d68c309b1884f182d1573917067; _gid=GA1.2.1954388734.1575341458; PHPSESSID=qib4bp4ucbf0ib0btpua7ptk96; CNZZDATA1278024109=1836593598-1573103611-https%253A%252F%252Fwww.google.com%252F%7C1575356811; __51cke__=; Hm_lvt_b758f643969ba87ea94388bba92a2673=1574997754,1575168182,1575341458,1575361675; nav_switch=booklist; Hm_lpvt_b758f643969ba87ea94388bba92a2673=1575361877; __tins__20389389=%7B%22sid%22%3A%201575361675140%2C%20%22vd%22%3A%2010%2C%20%22expires%22%3A%201575363677069%7D; __51laig__=10'
};

let download = (url, path, isTry) => {
    if (fs.existsSync(path)) {
        checkNext();
        return;
    }
    threadLength++;
    request({
        url: url,
        encoding: 'binary',
        timeout: 6e4,
        headers: headers
    }, (error, response, body) => {
        setTimeout(checkNext, 0);
        if (!error && response.statusCode == 200) {
            fs.writeFile(path, body, 'binary', err => {
                threadLength--;
                if (err) {
                    errorList.push({
                        url: url,
                        path: path,
                        err: err,
                        isTry: isTry
                    });
                    log(`${path} Error! ${err}`);
                } else {
                    log(`${path} is created successful!`);
                }
            });
        } else {
            threadLength--;
            errorList.push({
                url: url,
                path: path,
                err: error || response.statusCode,
                isTry: isTry
            });
            log(`${path} Error! ${error || response.statusCode}`);
        }
    });
}

let checkNext = () => {
    if (threadLength <= 5 && data.length > 0) {
        let info = data.shift();
        // setTimeout(() => {
        //     download(info.url, info.path);
        // }, 0);
        download(info.url, info.path, info.isTry);
        checkNext();
    }

    if (isAddAll === true && data.length === 0 && threadLength === 1) {
        // console.log(`error list: ${JSON.stringify(errorList)}`);
        if (errorList.length > 0) {
            log(`error list: ${JSON.stringify(errorList)}`);
            // return;
            errorList = [];
            cb(true);
        }else{
            cb(false);
        }
    }
}

module.exports = {
    add: (url, path) => {
        isAddAll = false;
        data.push({
            url: url,
            path: path
        });
        checkNext();
    },
    addAll: (callback) => {
        isAddAll = true;
        cb = callback;
        // cb();
        if (data.length === 0) {
            cb();
        } else {
            // isAddAll = false;
            data.forEach(e => {
                if (e.err !== 404 && !e.isTry) {
                    data.push({
                        url: e.url,
                        path: e.path,
                        isTry: 1
                    });
                }
            });
            checkNext();
        }
    }
}