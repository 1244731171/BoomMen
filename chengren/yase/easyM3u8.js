let fs = require("fs");
let request = require("request");
let Url = require("url");
let readlineSync = require("readline-sync");

let url = readlineSync.question("need output:");
if(!url){
    console.log("null ID!");
    return;
}
let output = [];
request(url, { json: true }, (err, res, body) => {
    console.log(url);
    if (err || res.statusCode != 200) {
        return console.log(err);
    } else {
        console.log("output DONE!");
        console.log(body);
        url = Url.parse(url);
        let baseUrl = `${url.protocol}//${url.host}`;
        body = body.split("\n");
        body.forEach(e => {
            if(e.charAt(0) !== "#"){
                output.push(baseUrl + e);
            }
        });

        console.log(output.join("\n"))
    }
});

// https://tou11.yyhdyl.com/20191025/83a33fbe0e6353b01821e4b9e818e8b3/hls/hls-720p.m3u8?t=1572099809&sign=37d072efe2e20ec21385a186a84959b5