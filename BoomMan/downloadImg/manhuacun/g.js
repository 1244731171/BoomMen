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
        'Cookie': 'uloginid=627865; PHPSESSID=60muffghmi46erdfunbjtreg77; __51cke__=; iknow1=ok; __tins__20198685=%7B%22sid%22%3A%201563474997918%2C%20%22vd%22%3A%2020%2C%20%22expires%22%3A%201563477483198%7D; __51laig__=20'
        // 'Cookie': 'PHPSESSID=9bisg0tcng8orvodpim0e7pp94; __tins__2994155=%7B%22sid%22%3A%201563200860004%2C%20%22vd%22%3A%2017%2C%20%22expires%22%3A%201563202984277%7D; __51cke__=; __51laig__=17; uloginid=627951'
    };
    // Configure the request
    let options = {
        url: `http://www.mh009.com/Mh/mhredit.php?mhid=${id}&ji_no=${index}`,
        method: 'GET',
        headers: headers
    };
    // console.log(options.url);
    request(options, (err, res, body) => {
        if (err) {
            clearInterval(timer);
            output();
            return console.log(err);
        }else{
            // console.log(body);
        }
        let imgsrc = body.match(/http\:\/\/([a-z]|\.|\_|[0-9]|\/)*.jpg/g) || [];
        if(imgsrc.length == 0){
            imgsrc = body.match(/http\:\/\/([a-z]|\.|\_|[0-9]|\/)*.gif/g) || [];
        }
        checkArray(imgsrc);
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
            clearInterval(timer);
            output();
        }
    });
}
let checkArray = (arr) => {
    let max = arr.length - 1;
    while(max > 0){
        arr.splice(max, 1);
        max -= 2;
    }
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace('pic01.mh009.com/', 'pic01_009.2kd.cc');
    }
}

let save = (index, _data) => {
    console.log(`index => ${index}, length => ${_data.length}`);
    data[index] = _data;
};

let lastStr = '';
let protectSave = () => {
    let str = '';
    for(var k in data){
        str += k;
    }
    if(str != '' && str != lastStr){
        lastStr = str;
        output();
    }
}

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
        let index = 0;
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


let cnName = '冲突';
let id = '458';




checkPath();

let timer = setInterval(protectSave, 60*1000*3);