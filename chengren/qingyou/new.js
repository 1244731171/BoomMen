
let url = require('url'); // url解析模块
let fs = require('fs'); // 文件系统模块
let Request = require('request')
let d = [];

let ban = 0;
let getInfo = (id) => {
    let url = `http://lms.tokyowins.com/appjsonv2/videoMain?app_type=ios&token=iKjFHCJGSXTHCUeoEyBibufJiRULsluN&urlencode=false&user_id=95476&version=1&video_id=${id}`;
    console.log(url);
    Request(url, { json: true }, (err, res, body) => {
        // console.log(body);
        if (!err && res.statusCode == 200) {
            j = body;
            if (j.data && j.data.video_url) {
                console.log("get one!");
                d.push(`<video src="${j.data.video_url}" controls alt="${j.data.user_id}"></video>`);
                // } else if (j.data && j.data.picture) {
                //     var data = j.data.picture.photo;
                //     data.forEach(ele => {
                //         var path = ele.photo.split("?")[0];
                //         // console.log(path);
                //         // path = path.replace(/https/g, "http");
                //         d.push('<a href="' + path + '" download="1.jpg"><img src="' + ele.photo + '"></a>');
                //         d1.push('<a href="' + path + '" download="1.jpg"><img src="' + path + '"></a>');
                //     });
                //     writedown(d.join(""));
                //     writedown2(d1.join(""));
            }else{
                ban++;
            }
        }else{
            ban++;
        }
        if (d.length == 20 || ban > 20) {
            console.log("done! last: " + next(id));
            fs.writeFileSync("./new.html", d.join(""));
        } else {
            getInfo(next(id));
        }
    });
}

let next = (id) => {
    return id + 1;
}

getInfo(7261);