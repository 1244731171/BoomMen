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

// https://dan1.yyhdyl.com/20191009/e2ef299ee1e8c6f8a9edcfb611a10aa8/hls/hls.m3u8?t=1571811425&sign=da2775e023846a075310dd297f05c8d6

// let data = fs.readFileSync("./m3u8.txt", "utf-8");
let url = `https://1.yaseww3.com/api/video/player_domain?id=${id}`;

let m3u8Host = [
    "dan1.yyhdyl.com",
    "shuang2.yyhdyl.com",
    "tou11.yyhdyl.com",
    "tou22.yyhdyl.com"
]

let getM3U8 = (m3u8Url, index = -1) => {
    if (index > 3) {
        return console.log("not m3u8");
    }
    if (index > -1) {
        m3u8Url = m3u8Url.split("/");
        m3u8Url.splice(2, 1, m3u8Host[index]);
        m3u8Url = m3u8Url.join("/");
    }
    request(m3u8Url, { json: false }, (err, res, body) => {
        console.log(m3u8Url);
        if (err || res.statusCode != 200) {
            getM3U8(m3u8Url, index + 1);
            return;
        } else {
            console.log("m3u8 ok!");
        }
        let data = body;
        let baseUrl = m3u8Url.split("/");
        baseUrl = baseUrl.splice(0, 3).join("/");
        let outData = [];

        data = data.split("\n");

        data.forEach(e => {
            if (e.indexOf(".jpg") != -1) {
                outData.push(baseUrl + e);
            }
        });

        console.log(outData.join('\n'));
        fs.writeFileSync(`./m3u8dir/${id}.txt`, outData.join('\n'), "utf-8");
    });
}

let getBaseM3U8 = (m3u8Url, index = -1) => {
    if (index > 3) {
        return console.log("not m3u8");
    }
    if (index > -1) {
        m3u8Url = m3u8Url.split("/");
        m3u8Url.splice(2, 1, m3u8Host[index]);
        m3u8Url = m3u8Url.join("/");
    }
    request(m3u8Url, { json: false }, (err, res, body) => {
        console.log(m3u8Url);
        if (err || res.statusCode != 200) {
            getBaseM3U8(m3u8Url, index + 1);
            return;
        } else {
            if(body.indexOf("hls-720p") != -1){
                m3u8Url = m3u8Url.replace("hls.m3u8", "hls-720p.m3u8")
            }else if(body.indexOf("hls-480p") != -1){
                m3u8Url = m3u8Url.replace("hls.m3u8", "hls-480p.m3u8")
            }else if(body.indexOf("hls-360p") != -1){
                m3u8Url = m3u8Url.replace("hls.m3u8", "hls-360p.m3u8")
            }else if(body.indexOf("hls-240p") != -1){
                m3u8Url = m3u8Url.replace("hls.m3u8", "hls-240p.m3u8")
            }
            getM3U8(m3u8Url, 0);
            console.log("m3u8 ok!");
        }
    });
}

let getHTML = () => {
    // https://1.yasek5.com/video-1053719
    url = `https://1.yaseww3.com/video/view/${id}`;
    request(url, { json: true }, (err, res, body) => {
        console.log(url);
        if (err || res.statusCode != 200) {
            return console.log(err || body);
        } else {
            let m3u8Url = body.match(/\]([a-zA-Z0-9]|\/|\?|\.|\=|\&)*'/g)[0];
            m3u8Url = "https://" + m3u8Host[0] + m3u8Url.replace(/\]|\'/g, "");
            getBaseM3U8(m3u8Url, 0);
        }
    });
}

request(url, { json: true }, (err, res, body) => {
    console.log(url);
    if (err || res.statusCode != 20 || !body.info) {
        getHTML();
        return console.log(err);
    } else {
        let m3u8Url = body.info.down_url;
        let key = body.info.video_hls.split("?")[1];
        m3u8Url = m3u8Url + "?" + key;
        getM3U8(m3u8Url);
    }
});
