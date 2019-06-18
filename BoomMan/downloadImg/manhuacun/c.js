const request = require('request');
const jsdom = require("jsdom");
const fs = require("fs");
const download = require("./download");
const { JSDOM } = jsdom;

let data = {};
let rq = (id, index) => {
    console.log(`request id => ${id}, index => ${index}`);
    // Set the headers for the request
    let headers = {
        'Content-Type': 'application/json',
        // 'Content-Length': Buffer.byteLength(post_data),
        'Cookie': 'UM_distinctid=16b6b2fb9fa2e1-09863dca910f83-3e385a0a-1fa400-16b6b2fb9fb61a; CNZZDATA1277644898=1938338913-1560870063-http%253A%252F%252Fwww.manhuacun.com%252F%7C1560870063; PHPSESSID=clq746ur7p6llnd4k1p73s7bt7; uloginid=8021548042'
    };
    // Configure the request
    let options = {
        url: `http://www.manhuacun.com/Mh/inforedit.html&mhid=${id}&ji_no=${index}`,
        method: 'GET',
        headers: headers
    };
    request(options, (err, res, body) => {
        if (err) {
            output();
            return console.log(err);
        }
        let imgsrc = body.match(/http\:\/\/([a-z]|\.|\_|[0-9]|\/)*.jpg/g) || [];
        // console.log(JSON.stringify(imgsrc));
        console.log(`${index} back, image length => ${imgsrc.length}`);
        if (imgsrc.length > 0) {
            save(index, imgsrc);
            // if (index < maxIndex) {
            index++;
            rq(id, index);
            // } else {
            //     output();
            // }
        } else {
            output();
        }
    });
}

let save = (index, _data) => {
    console.log(`index => ${index}, length => ${_data.length}`);
    data[index] = _data;
};

let output = () => {
    console.log(`output`);
    let saveData = [];
    let i = 1;
    let d = data[i + ''];
    // console.log(JSON.stringify(data))
    while (d && d.length > 0) {
        saveData.push({
            "name": cnName,
            "index": i,
            "data": d
        });
        i++;
        d = data[i];
    }
    fs.open(path, 'w', (err, fd) => {
        if (err) {
        }
        let str = JSON.stringify(saveData);
        fs.writeFile(fd, str, (err) => {
            if (err) {
            }
            fs.close(fd, (err) => {
                console.log('saved');
                doEnd();
            });
        });
    });
}

let path = '';
let checkPath = () => {
    path = `./${cnName}`;
    if (fs.existsSync(path)) {
        console.log(`${path} exist!`);
    } else {
        fs.mkdirSync(path);
        console.log(`${path} create!`);
    }
    path += '/data.json';
    if (fs.existsSync(path)) {
        console.log(`${path} exist!`);
        checkData();
    } else {
        rq(id, 1);
    }
}

let checkData = () => {
    fs.readFile(path, function (err, _data) {
        if (err) {
            return console.error(err);
        }
        let index = 1;
        console.log("异步读取: " + _data.toString());
        imagedata = JSON.parse(_data);
        for (const i of imagedata) {
            if (i && i.data && i.index) {
                index = i.index;
                data[index] = i.data;
            }
        }
        rq(id, index + 1);
    });
}

let doEnd = () => {
    download.setName(cnName);
    download.go();
}

let cnName = '夺爱的滋味';
let maxIndex = 11;
let id = '706';

checkPath();