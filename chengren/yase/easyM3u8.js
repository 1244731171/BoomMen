let fs = require("fs");
let request = require("request");
let Url = require("url");
let readlineSync = require("readline-sync");

let url = readlineSync.question("need output:");
if (!url) {
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
        url = url.split("/"); //https://riven.rocks/file/ts/ver2/5000/4343/d/index.m3u8
        let baseUrl = url.splice(0, url.length - 1).join("/");
        body = body.split("\n");
        body.forEach(e => {
            if (e.charAt(0) !== "#" && e !== "") {
                if (e.charAt(0) !== "/") {
                    e = "/" + e;
                }
                output.push(baseUrl + e);
            }
        });

        // console.log(output.join("\n"))

        fs.open(`./nts.txt`, 'w', (err, fd) => {
            if (err) {
            }
            let str = output.join("\n");
            fs.writeFile(fd, str, (err) => {
                if (err) {
                }
                fs.close(fd, (err) => {
                });
            });
        });
    }
});

// https://tou11.yyhdyl.com/20191025/83a33fbe0e6353b01821e4b9e818e8b3/hls/hls-720p.m3u8?t=1572099809&sign=37d072efe2e20ec21385a186a84959b5