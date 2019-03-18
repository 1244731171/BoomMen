const request = require('request');
const fs = require('fs');

var d = ['6355',
    '6543',
    '6620',
    '6697',
    '6765',
    '8274',
    '8373',
    '8435',
    '8510',
    '8593',
    '8671',
    '8732',
    '8801',
    '9721',
    '9795',
    '9876',
    '9951',
    '10033',
    '10097',
    '10144',
    '10219',
    '10294',
    '10367',
    '10444',
    '10520'];
let Bname = '租片女郎1-22（有码）';

let imageData = [];
let imageData2 = [];

let index = 1;
let getNext = () => {
    if (d.length) {
        let id = d.shift();
        if (imageData2.length > 200) {
            let htmlStr = "<html><head></head><body>"
                + "<script src='lazyload.js' type='text/javascript'></script>"
                + "<script type='text/javascript'>"
                + "var a = " + JSON.stringify(imageData2) + ";addData(a);"
                + "</script></body></html>"
            fs.open(Bname + (index++) + '.html', 'w', (err, fd) => {
                fs.writeFile(fd, htmlStr, (err) => {
                    fs.close(fd, (err) => {
                    });
                });
            });
            imageData2 = [];
        }
        req(id);
    } else {
        fs.open(Bname + '.json', 'w', (err, fd) => {
            fs.writeFile(fd, JSON.stringify(imageData), (err) => {
                fs.close(fd, (err) => {
                });
            });
        });
        let htmlStr = "<html><head></head><body>"
            + "<script src='lazyload.js' type='text/javascript'></script>"
            + "<script type='text/javascript'>"
            + "var a = " + JSON.stringify(imageData2) + ";addData(a);"
            + "</script></body></html>"
        fs.open(Bname + (index++) + '.html', 'w', (err, fd) => {
            fs.writeFile(fd, htmlStr, (err) => {
                fs.close(fd, (err) => {
                });
            });
        });
    }
}

let req = (id) => {
    console.log("%s go!", id);
    request.post({
        uri: 'http://www.yato.cc/wp-admin/admin-ajax.php',
        form: { action: 'chenxing_imageall', type: 'all', post_id: id }
    }, (err, res, body) => {
        console.log("%s ok!", id);
        if (err) { return console.log(err); }
        var matchUrl = body.match(/http\:\/\/([a-z]|\.|[0-9]|\/|\_|\-)*.jpg/g);
        imageData = imageData.concat(matchUrl);
        imageData2 = imageData2.concat(matchUrl);
        getNext();
    });
}

getNext();