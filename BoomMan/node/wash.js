const request = require('request');
const jsdom = require("jsdom");
const fs = require("fs");
const path = require("path");
const download = require("./download");
const { JSDOM } = jsdom;

const PATH = 'Q:/1_files/';
// const PATH = 'E:/hanman/干爹我还要/';
if(PATH.charAt(PATH.length - 1) !== "/"){
    PATH = PATH + "/";
}
let loop = (_path) => {
    console.log(_path);
    fs.readdir(_path, (err, __path) => {
        // console.log(__path);
        __path.forEach(ele => {
            // console.log(ele);
            if (isDir(_path+ele)) {
                loop(_path+ele+'/');
            } else if (ele.indexOf('.') == -1) {
                // console.log(_path+ele);
                replaceHtml(_path, ele);
            }else{
            }
        })
    });
}

let exists = (_path) => {
    return fs.existsSync(_path);
}

let isFile = (_path) => {
    return exists(_path) && fs.statSync(_path).isFile();
}

let isDir = (_path) => {
    return exists(_path) && fs.statSync(_path).isDirectory();
}

let replaceHtml = (_path, name) => {
    
    fs.rename(_path+name, _path+name+".jpg", (err) => {
        if (err) throw err;
    });
    // let html = fs.readFileSync(_path+name, 'utf8');
    // html = html.replace('</title></head>','</title><script type="text/javascript" src="../../1.js"></script></head>');
    // html = html.replace('</script></head>','</script><style>img{margin:0 auto;display: flex;} br{display:none;}</style></head>');
    // fs.writeFileSync(_path+name, html, 'utf8');
}

loop(PATH);