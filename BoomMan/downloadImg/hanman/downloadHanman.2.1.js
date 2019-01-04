//依赖模块
const fs = require('fs');
const mkdirp = require('mkdirp');
const request = require("request");

let index = 0;
let path = "./好久不见老师";
let mainUrl = 'http://www.hanman.co/index/books/index/id/101.html'
const rootUrl = 'http://www.hanman.co';
let datas = [];
let info = [];
let callbacks = [];

// http://www.hanman.co/index/books/index/id/67.html
// http://www.hanman.co/index/books/index/id/62.html
// http://www.hanman.co/index/books/index/id/56.html
// http://www.hanman.co/index/books/index/id/55.html
// http://www.hanman.co/index/books/index/id/81.html
// http://www.hanman.co/index/books/index/id/24.html
// http://www.hanman.co/index/books/index/id/19.html
// http://www.hanman.co/index/books/index/id/240.html
// http://www.hanman.co/index/books/index/id/101.html
// http://www.hanman.co/index/chapters/index/id/4724.html
// http://www.hanman.co/index/books/index/id/123.html
// http://www.hanman.co/index/books/index/id/5.html
// http://www.hanman.co/index/books/index/id/21.html
// http://www.hanman.co/index/books/index/id/41.html


//创建目录
let makeDir = (path) => {
    mkdirp(path, err => {
        if (err) {
            console.log(err);
        }
    });
}

let getPagesInfo = () => {
    let jsonPath = path + '/data.json';
    if(fs.existsSync(jsonPath)){
        callbacks.forEach(element => {
            element();
        });
        console.log('data.json is extisted');
        return;
    }
    datas = [];
    request(mainUrl, { json: false }, (err, res, body) => {
        if (err) { return console.log(err); }
        // console.log(body);
        var matchUrl = body.match(/\/index([a-z.0-9]|\/|\.)*html/g);
        console.log('html url: >>>>> ', JSON.stringify(matchUrl));
        matchUrl.forEach(element => {
            if(element.indexOf('book') == -1){
                if(datas.indexOf(rootUrl + element) == -1){
                    datas.push(rootUrl + element);
                }
            }
        });
        loopNextPage();
    });
}

let loopNextPage = () => {
    let url;
    if (datas.length > 0) {
        url = datas.splice(0, 1)[0];
        index++;
        getImage(url);
    }else{
        loopEnd();
    }
}

let getImage = (url) => {
    request(url, { json: false }, (err, res, body) => {
        if (err) {
            console.log("error! " + url + ", " + index);
            console.log(err);
            loopEnd();
            return;
        }
        var matchUrl = body.match(/http\:\/\/([a-z]|\.|[0-9]|\/)*.jpg/g);
        console.log(index + "： " + url + ">>>" + JSON.stringify(matchUrl));
        info.push({
            index: index,
            url: url,
            data: matchUrl
        });
        loopNextPage();
    });
}

let loopEnd = () => {
    let str = JSON.stringify(info);
    let jsonPath = path + '/data.json';
    if(fs.existsSync(jsonPath)){
        callbacks.forEach(element => {
            element();
        });
        // jsonPath = path + '/' + new Date().getTime() + 'data.json';
    }
    fs.open(jsonPath, 'w', (err, fd) => {
        if (err) {
            console.log(err);
        }
        console.log(fd);
        fs.writeFile(fd, str, (err) => {
            if (err) {
                console.log(err);
            }
            fs.close(fd, (err) => {
                console.log(err ? err : 'success!');
                callbacks.forEach(element => {
                    element();
                });
            });
        });
    });
}

// makeDir(path);

// getPagesInfo();

module.exports = {
    setJsonPath: (p) =>{
        path = p;
        makeDir(path);
    },
    setMainPageUrl: (u) => {
        mainUrl = u;
    },
    setCallBack: (callback) => {
        callbacks.push(callback);
    },
    start: getPagesInfo
};