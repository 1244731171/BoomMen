const fs = require('fs');
const request = require('request');

var j = {};//{ "msg": "\u8bf7\u6c42\u6210\u529f.", "code": 1, "data": { "cover": { "photo": "https:\/\/static.shengduola.com\/2019\/2\/25\/154\/1551086984991.png?x-oss-process=style\/800", "title": "\u65b0\u51fa\u7684\u4e5d\u5bab\u683c" }, "picture": { "count": "9", "photo": [{ "id": "29695", "title": "photo1", "photo": "https:\/\/static.shengduola.com\/2019\/2\/25\/154\/1551086928049.png?x-oss-process=style\/800", "sort_order": "1" }, { "id": "29696", "title": "photo2", "photo": "https:\/\/static.shengduola.com\/2019\/2\/25\/154\/1551086915090.png?x-oss-process=style\/800", "sort_order": "2" }, { "id": "29697", "title": "photo3", "photo": "https:\/\/static.shengduola.com\/2019\/2\/25\/154\/1551086918387.png?x-oss-process=style\/800", "sort_order": "3" }, { "id": "29698", "title": "photo4", "photo": "https:\/\/static.shengduola.com\/2019\/2\/25\/154\/1551086921695.png?x-oss-process=style\/800", "sort_order": "4" }, { "id": "29699", "title": "photo5", "photo": "https:\/\/static.shengduola.com\/2019\/2\/25\/154\/1551086924758.png?x-oss-process=style\/800", "sort_order": "5" }, { "id": "29700", "title": "photo6", "photo": "https:\/\/static.shengduola.com\/2019\/2\/25\/154\/1551086931204.png?x-oss-process=style\/800", "sort_order": "6" }, { "id": "29701", "title": "photo7", "photo": "https:\/\/static.shengduola.com\/2019\/2\/25\/154\/1551086934582.png?x-oss-process=style\/800", "sort_order": "7" }, { "id": "29702", "title": "photo8", "photo": "https:\/\/static.shengduola.com\/2019\/2\/25\/154\/1551086938038.png?x-oss-process=style\/800", "sort_order": "8" }, { "id": "29703", "title": "photo9", "photo": "https:\/\/static.shengduola.com\/2019\/2\/25\/154\/1551086941523.png?x-oss-process=style\/800", "sort_order": "9" }] }, "music": { "music_id": "20", "title": "Scarborough Fair \u300a\u6bd5\u4e1a\u751f\u300b\u7535\u5f71\u63d2\u66f2", "url": "http:\/\/static.graphis.ltd\/mp3\/ScarboroughFair.mp3" }, "reward_fee": "8.00", "pay_index": "1", "h5": "http:\/\/sec.yaaja.com\/album\/rwd\/id\/1674.html", "introduce": "\u70b9\u8fd9\u91cc\u770b\u60ca\u559c->", "is_paid": 0, "is_myself": 0, "user_id": "154", "recommend_opus": [{ "ad_id": "1073", "title": "\u6709\u6ca1\u6709\u5174\u8da3\u5e2e\u6211\u8131\u6389\u4e1d\u889c", "img": "http:\/\/wuma.oss-cn-qingdao.aliyuncs.com\/Uploads\/ad004.gif", "type": "video", "key_id": "631", "user_id": 4751 }, { "ad_id": "1074", "title": "\u6731\u53ef\u4eba-\u771f\u7684\u5f88\u6296,\u5976\u76db", "img": "http:\/\/wuma.oss-cn-qingdao.aliyuncs.com\/Uploads\/ad005.gif", "type": "video", "key_id": "1462", "user_id": 155 }], "authentic": "model", "user_coin": "0.00" } }

// video
// https://qingyou.wumacps.com/appjsonv2/videoMain?video_id=3345&urlencode=false&app_type=android&version=16&user_id=95476&token=xfXcIqDvryMLYFaiTOytSCXbtUTZzMjd
// album
// https://qingyou.wumacps.com/appjsonv2/albumMain?album_id=1674&urlencode=false&app_type=android&version=16&user_id=95476&token=xfXcIqDvryMLYFaiTOytSCXbtUTZzMjd
//

//
let id = '3382';
// var url = `https://qingyou.wumacps.com/appjsonv2/videoMain?video_id=${id}&urlencode=false&app_type=android&version=16&user_id=95476&token=xfXcIqDvryMLYFaiTOytSCXbtUTZzMjd`
// var url = `https://qingyou.wumacps.com/appjsonv2/albumMain?album_id=${id}&urlencode=false&app_type=android&version=16&user_id=95476&token=xfXcIqDvryMLYFaiTOytSCXbtUTZzMjd`


var d = [];
let a = () => {
    d = [];
    if (j.data.video_url) {
        d = ['<video src="' + j.data.video_url + '" autoplay controls>'];
    } else {
        var data = j.data.picture.photo;
        data.forEach(ele => {
            d.push('<img src="' + ele.photo + '">');
        });
    }

    fs.open('./1.html', 'w', (err, fd) => {
        fs.writeFile(fd, d.join(''), (err) => {

            fs.close(fd, (err) => {
                console.log('over!')
            });
        });
    });
}

// r(a);
var url = '';
let c = () => {
    id = i--;
    url = `https://qingyou.wumacps.com/appjsonv2/videoMain?video_id=${id}&urlencode=false&app_type=android&version=16&user_id=95476&token=xfXcIqDvryMLYFaiTOytSCXbtUTZzMjd`
    // url = `https://qingyou.wumacps.com/appjsonv2/albumMain?album_id=${id}&urlencode=false&app_type=android&version=16&user_id=95476&token=xfXcIqDvryMLYFaiTOytSCXbtUTZzMjd`
    r(cj);
}

let r = (cb) => {
    console.log(url);
    request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        // console.log(body);
        j = body;
        if (j.data && j.data.video_url) {
            d.push(`<video src="${j.data.video_url}" controls></video>`);
        }else if(j.data && j.data.picture){
            var data = j.data.picture.photo;
            data.forEach(ele => {
                d.push('<img src="' + ele.photo + '">');
            });
        }
        cb();
    });
}

let out = () => {
    console.log(JSON.stringify(d));
    console.log((--id) + ' out!');

    fs.open('./2.html', 'w', (err, fd) => {
        fs.writeFile(fd, d.join(''), (err) => {

            fs.close(fd, (err) => {
                console.log('over!')
            });
        });
    });
}

let cj = () => {
    if (id < min) {
        out();
    } else {
        c();
    }
}

// let i = 1820;//img
// let i = 3286; //3286 video
let i = 6060;//0-800;920-1538;3520-3750
let min = i - 38;
c();

// id = 1800;
// // url = `https://qingyou.wumacps.com/appjsonv2/videoMain?video_id=${id}&urlencode=false&app_type=android&version=16&user_id=95476&token=xfXcIqDvryMLYFaiTOytSCXbtUTZzMjd`
// url = `https://qingyou.wumacps.com/appjsonv2/albumMain?album_id=${id}&urlencode=false&app_type=android&version=16&user_id=95476&token=xfXcIqDvryMLYFaiTOytSCXbtUTZzMjd`
// r(out);