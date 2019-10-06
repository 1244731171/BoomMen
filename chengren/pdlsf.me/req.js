let fs = require("fs");
let request = require("request");
let readlineSync = require("readline-sync");

let id = "1047222";

let str = readlineSync.question("need output:");
if(str){
    id = str;
}else{
    console.log("null ID!");
    return;
}

let url = `http://app.pdlone.xyz/index.php/api/index/index_show?&time=${parseInt(Date.now().toString().substr(0,10))}&userId=&new_device=1104a89792cdcc812f0&id=${id}`;
request(url, { json: true }, (err, res, body) => {
    console.log(url);
    if (err || res.statusCode != 200) {
        return console.log(err);
    } else {
        let str = "";
        body.resData.imgs.forEach(e => {
            str += `<img src="${e}"><br>`;
        });

        fs.writeFileSync("./out.html", str);

        console.log("output DONE!");
    }
});
