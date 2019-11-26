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
    'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36',
    'Cookie': 'UM_distinctid=16e447ddad771f-02ef3744453095-54s123110-1fa400-16e447ddad8947; _ga=GA1.2.1616809352.1573107139; _gid=GA1.2.92382535.1573107139; PHPSESSID=kr2ubfp2ppr2cdeil05ai2tnpj; CNZZDATA1278024109=1836593598-1573103611-https%253A%252F%252Fwww.google.com%252F%7C1573130723; Hm_lvt_b758f643969ba87ea94388bba92a2673=1573107129,1573107134,1573133455; __51cke__=; nav_switch=booklist; Hm_lpvt_b758f643969ba87ea94388bba92a2673=1573134927; __tins__20389389=%7B%22sid%22%3A%201573133454667%2C%20%22vd%22%3A%207%2C%20%22expires%22%3A%201573136726923%7D; __51laig__=7; _gat_gtag_UA_83227386_4=1'
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
        checkNext();
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

    if (isAddAll === true && data.length === 0) {
        // console.log(`error list: ${JSON.stringify(errorList)}`);
        if(errorList.length > 0){
            log(`error list: ${JSON.stringify(errorList)}`);
            return;
        }
        cb();
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
        }else{
            // isAddAll = false;
            data.forEach(e=>{
                if(e.err !== 404 && !e.isTry){
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