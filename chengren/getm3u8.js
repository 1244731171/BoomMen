let fs = require("fs");
let request = require("request");
let readlineSync = require("readline-sync");

// let id = "1047222";

// let str = readlineSync.question("need output:");
// if(str){
//     id = str;
// }else{
//     console.log("null ID!");
//     return;
// }

let url = `http://www.pdlyunpan.com/up/gif/2019/10/01/c613ef22/playpdl.m3u8`;
request(url, { json: true }, (err, res, body) => {
    console.log(url);
    if (err || res.statusCode != 200) {
        return console.log(err);
    } else {
        // let str = "";
        // body.resData.imgs.forEach(e => {
        //     str += `<img src="${e}"><br>`;
        // });

        // fs.writeFileSync("./out.html", str);

        console.log("output DONE!");
        console.log(body);
    }
});