//依赖模块
var fs = require('fs');
var http = require("http");
var request = require("request");
var mkdirp = require('mkdirp');

//获得数据
var data = ["http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414343S-01ycczqPNAKblR.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414343kJ_atq4hu05vS1mW.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414343NT49e63g1gMouHzs.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344l8VsBWPYV9la0QUg.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414343gXWtBULVlDXQ0S0b.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344D68DpZrznoebFpbe.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414343g0wjtoymiJRqhzcU.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344QEnRHaiDSdJ-gTPT.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344qj5B9dF0d54sA06S.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344SEBKhbLdYGcsByNH.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344NgHcoViiCSyxpIud.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344Dm2F3Kf1Ny-kkPld.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344GLw0xvJRZFHicxbn.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344kvSAUmPpl8Yg1AGM.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344PBadfA_mq10AHiLA.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344lP9Qs4jCfFKJAkC-.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344xjPQSgK18sO51Na4.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344Ofw6Nt_r4kRYK2o0.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344FFX65FqXOUn4FRWX.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344uxpJykZ_a-HRps9T.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344s2SVfu4LenOts3Hp.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/15434143444EWkZufxS2w478yn.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344MODdLTq7-dE_1YgS.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344RkdQ2wvLAZW0ZUa4.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345zWnm2uLUXt2jh3pr.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344Clkb8eeYEHTYqzEw.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344xOJkKIV2tupC_uao.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344yF8wPCcpReVEV3HR.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414344Q0_AX9VOBgaA8H7r.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345XBjIChFjPPPZZKUm.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345PmlnfYrnyOzsZCHT.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345QOtW9DFMfVX3dq4j.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345obNAYFih01S2BpU-.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345AqnXxuGz5UrRFi05.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345Gac6n0-UqrI52g5f.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345s-172T4UXvnPtrVo.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345gqhuh2TRkF21HlbB.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345x87kq570Bt8vTCTE.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/15434143458WLgNBWFaNKWFo1y.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345TaJUY5o_vlu7KgwF.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345blwNi7YkpcQkY_OC.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/15434143451m202B7FWAWJJHGm.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345CuePqroZ6S95HGUG.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345GOxQGeAvZX14WmbL.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345HPReAAkkoHSS-lYn.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345AAfKWNSpO3iHZql3.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/15434143458cz4XR2gPSGLPBsI.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345cMdbq7XmQgwFyDUQ.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345VYpGcgYgB2sYcExK.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345lHbeTXYBENXSyr1j.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345c5lTmlMt0r0_GOhE.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345ZF7HSOagJFceVbZ-.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345NFB2SC1M1lRatFSD.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345Ky651NW6NVrZ4VqY.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345jnPF8NQ2taemk_ZG.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345c46trJR4j9EISp2Q.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345DlrE-yKpngq4dwA-.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345ob5sgtyZo3pnOEBU.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345ebLGRGpeVEbk_Pls.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345FOL0mdpYmzfAZcFI.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345KRqKY91R-cWyIRws.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345RqVpFVXbaLNoDjEm.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345seuW0iUmCwLHbQye.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/15434143458X1REUdpJ0XlWivK.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414345Vgp9VHd9CVRNza65.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/154341434665NfDQMIWBr5Es1R.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346nYVpABl7KImkbANv.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346HDmZO0WHKlit9spb.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346a-m8Rn8WIhBZXqy0.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346MoYoAFuV3bMKXHeL.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/15434143463o7mtCsUo_17Cnd2.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346EPx07PhqicEiiyvw.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346mpsWNCFUWpvT_kHd.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/15434143464EmbXhrbeTJvIvdI.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346PM5jOfT33pwkPdSW.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/15434143461thhjiTU9ljiM5xI.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346p0Ckp2BjMIMSEmLe.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346uFHNLWKbHGqPzQK1.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346bXVEi2aku8ngPKXN.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346MrtAzLjcgJpjXzA3.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346Ql3iCHDCMZq6cPE7.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346kTA_BBu-hcUk7XbD.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346YQJsoBiAfEMravFJ.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346IhQELDWYD5vf1Wy3.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/15434143467Fn-tBV294LJUBcP.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346eJSWypLTtCmEhqP7.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346FdM4MOc4n3SRCN_S.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/154341434602jnMD7BijCzQube.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346af870qnpgKqs5nOt.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346IapYLKnGBHLDbnmm.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346mUiRkequ0t1onsb6.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346Iq839SnaSiFTm4Mq.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346KyMcIF1Q0gVvbEOv.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346EJ8fqK7RnUeE3fly.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346SqsUtHNmHpniDlbI.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/15434143466fPlfDQyv9XRwjYu.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346ytxrz_fNUUHVBbRW.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414346rWdRs8-axc7VV_Ln.jpg", "http://mhimg.9mmc.com:44236/images/comic/317/633605/1543414347L0Lhg5kbBp2mJwzr.jpg"];
//本地存储目录
var dir = './屌丝男第一集';

//创建目录
var makeDir = function (path) {
    mkdirp(path, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

//下载方法
var retryTimes = 2;
var download = function (url, path, callback) {
    callback = callback || new Function();
    request.head(url, function (err, res, body) {
        console.log("try to download, url: " + url);
        console.log(JSON.stringify(res));
        if (!err && res.statusCode == 200) {
            request(url).pipe(fs.createWriteStream(path))
                .on('close', function () {
                    retryTimes = 2;
                    console.log('img saved! path:' + path);
                    callback();
                });
        } else {
            console.log("try to download failed!");
            if (retryTimes-- > 0) {
                download(url, path, callback);
            } else {
                callback();
            }
        }
    });
};

var downloadIndex = 0;
var downloadNext = function () {
    var url = urls[downloadIndex];
    var path = paths[downloadIndex];
    if (url && path) {
        download(url, path, downloadNext);
        downloadIndex++;
    }
}

//入口
makeDir(dir);
var urls = [];
var paths = [];
for (var url of data) {
    urls.push(url);
    paths.push(dir + "/" + paths.length + ".jpg");
}

downloadNext();

// var urls = [];
// var imgs = [];
// var url = $("#images img").attr('src').replace(chapterImages[0], '');
// for (let u of chapterImages) {
//     urls.push(url + u);
//     imgs.push('<img src="' + (url + u) + '">');
// }
// document.body.innerHTML = imgs.join('');
// var title = document.head.querySelector('title');
// document.head.innerHTML = title.outerHTML;
// JSON.stringify(urls);