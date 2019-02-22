const request = require('request');
const fs = require('fs');

let id = '1';
let Bname = '';
let Burl = 'http://189671.com/d/t/' + id + '.txt';
let imgUrl = 'http://mhtp.q9090.com/img/'
let Curls = [];
let max = 5;
let cur = 0;
let totalInfo = {
    name: "",
    data: {}
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
    }
}

let getCTurl = (cid) => {
    return 'http://189671.com/d/d/' + id['substr'](0, 2) + '/' + (id['substr'](- 2) * 1) + '/' + id + '.txt';
}

let getIUrls = (cid, index) => {
    cur++;
    request(getCTurl(cid), { json: true }, (err, res, body) => {
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
   