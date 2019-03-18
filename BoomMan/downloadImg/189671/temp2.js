const request = require('request');
const fs = require('fs');

let id = '3';
let Bname = '';
let Burl = 'http://189671.com/d/t/' + id + '.txt';
let imgUrl = 'http://mhtp.q9090.com/img/'
let Curls = [];
let max = 5;
let cur = 0;
let totalInfo = {
    name: "",
    data: {},
    ctxts: []
};

let index = 0;
let loopGet = (data) => {
    if(data){
        Curls = data;
    }
    while(cur < max && Curls.length > 0){
        getIUrls(Curls.shift()[0], index++);
    }

    if(Curls.length === 0){
        totalInfo.name = Bname;
        fs.open(Bname+'.json', 'w', (err, fd) => {
            fs.writeFile(fd, JSON.stringify(totalInfo), (err) => {
                fs.close(fd, (err) => {
                });
            });
        });
        let htmlStr = "<html><head></head><body>"
        + "<script src='lazyload.js' type='text/javascript'></script>"
        + "<script type='text/javascript'>"
        + "var a = " + JSON.stringify(totalInfo) + ";addData(a);"
        + "</script></body></html>"
        fs.open(Bname+'.html', 'w', (err, fd) => {
            fs.writeFile(fd, htmlStr, (err) => {
                fs.close(fd, (err) => {
                });
            });
        });
    }
}

let getCTurl = (cid) => {
    return 'http://189671.com/d/d/' + cid['substr'](0, 2) + '/' + (cid['substr'](- 2) * 1) + '/' + cid + '.txt';
}

let getIUrls = (cid, index) => {
    cur++;
    let url = getCTurl(cid);
    totalInfo.ctxts.push(url);
    request(url, { json: true }, (err, res, body) => {
        cur--;
        loopGet();
        if (err) { return console.log(err); }
        let imgs = body[1];
        let imgUrls = [];
        imgs.forEach(e => {
            imgUrls.push(imgUrl + e.charAt(0) + "/" + e.charAt(1) + "/" + e);
        });
        totalInfo.data[index] = imgUrls;
    });
}

request(Burl, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    Bname = body[0][1];
    loopGet(body[1]);
});
   