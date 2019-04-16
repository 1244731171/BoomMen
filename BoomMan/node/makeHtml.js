const fs = require('fs');

// const PATH = 'J:/yundownload/韩国漫画/压缩01-50/[韩漫]卖身契约1-50 1-24汉化/';
// const PATH = 'J:/yundownload/韩国漫画/压缩01-50/[韩漫]出租女孩第一季完结/';
// const PATH = 'J:/yundownload/韩国漫画/压缩01-50/[韩漫]圈套/';
// const PATH = 'J:/yundownload/韩国漫画/压缩01-50/[韩漫]她的高跟鞋/';
// const PATH = 'J:/yundownload/韩国漫画/压缩01-50/[韩漫]女神狩猎/';
// const PATH = 'J:/yundownload/韩国漫画/压缩01-50/[韩漫]无名岛00-43/';
// const PATH = 'J:/yundownload/韩国漫画/压缩01-50/[韩漫]不伦驾训班/';
// const PATH = 'J:/yundownload/韩国漫画/压缩01-50/[韩漫]暧昧/';
// const PATH = 'J:/yundownload/韩国漫画/压缩01-50/[韩漫]White Girl 第2季/';
const PATH = 'J:/yundownload/韩国漫画/压缩01-50/[韩漫]淑女花苑 第3季/';

let arr = [];
let index = 1;


let makeHtml = (arr) => {
    let htmlStr = "<html><head></head><body>"
        + "<script src='../lazyload.js' type='text/javascript'></script>"
        + "<script type='text/javascript'>"
        + "var a = " + JSON.stringify(arr) + ";addData(a);"
        + "</script></body></html>"
    fs.open(PATH + (index++) + '.html', 'w', (err, fd) => {
        fs.writeFile(fd, htmlStr, (err) => {
            fs.close(fd, (err) => {
            });
        });
    });
}

fs.readdir(PATH, (err, path) => {
    path.forEach(ele => {
        if (ele.endsWith("jpg")) {
            // console.log(ele);
            if (arr.length > 500) {
                makeHtml(arr);
                arr = [];
            }
            arr.push('./' + ele);
        }
    }); 
    if (arr.length > 0) {
        makeHtml(arr);
        arr = [];
    }
})
