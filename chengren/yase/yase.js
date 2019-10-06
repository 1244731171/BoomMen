let path = require("path");
let fs = require("fs");
var callfile = require('child_process');

let rename = (op, np) => {
    console.log(`${op} rename to ${np}`);
    fs.rename(op, np, (err) => {
        if (err) throw err;
    });
}
let url = `E:/迅雷下载/图片任务组_20191004_1529`;

if (!url.endsWith("/")) {
    url = url + "/";
}

fs.readdirSync(url).forEach(tsName => {
    if (tsName.endsWith(".jpg")) {
        let index = tsName.match(/p(\d)*/)[0].substr(1, 5);
        while (index.length < 4) {
            index = "0" + index;
        }
        rename(url + tsName, url + index + ".ts");
    }
});

let _url = url.replace(/\//g, "\\");
let outPut = "E:/ts/".replace(/\//g, "\\");
let out = `copy/b  ${_url}*.ts  ${outPut}${Date.now()}.ts`;
console.log(`请执行: \n${out}`);


callfile.exec(out, [], null, (err, stdout, stderr) => {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
    console.log("ok!")
    // callback(err, stdout, stderr);
});