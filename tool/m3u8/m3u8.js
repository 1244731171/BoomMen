let fs = require("fs");
let request = require("request");
let url = require("url");
let readlineSync = require("readline-sync");

let m3u8Url = `https://ddppnew1.135-cdn.com/20190922/wzv4BHlF/900kb/hls/index.m3u8`;

// let str = readlineSync.question("need output:");
// if(str){
//     m3u8Url = str;
// }else{
//     console.log("null ID!");
//     return;
// }
let outData = [];
let u = url.parse(m3u8Url);

request(m3u8Url, { json: false }, (err, res, body) => {
    console.log(m3u8Url);
    if (err || res.statusCode != 200) {
        return;
    } else {
        console.log("m3u8 ok!");
    }
    let data = body;
    let baseUrl = `${u.protocol}//${u.host}`;

    data = data.split("\n");

    data.forEach(e => {
        if (e.endsWith(".ts")) {
            outData.push(baseUrl + e);
        }
    });

    console.log(outData.join('\n'));
    // fs.writeFileSync(`./m3u8dir/${id}.txt`, outData.join('\n'), "utf-8");
});
