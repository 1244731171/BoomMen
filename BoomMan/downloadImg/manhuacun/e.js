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
        'Cookie': 'PHPSESSID=9sn0i5vdnadgtu7eqadqcphdd3; __51cke__=; uloginid=627865; __tins__2994155=%7B%22sid%22%3A%201563146425283%2C%20%22vd%22%3A%2022%2C%20%22expires%22%3A%201563148822168%7D; __51laig__=22'
        // 'Cookie': 'UM_distinctid=16b6b2fb9 fa2e1-09863dca910f83-3e385a0a-1fa400-16b6b2fb9fb61a; PHPSESSID=a8lf0evl082163vkpn7ddfhp97; CNZZDATA1277644898=1938338913-1560870063-http%253A%252F%252Fwww.manhuacun.com%252F%7C1561031580; uloginid=5441548042'
        // 'Cookie': 'UM_distinctid=16b6a45c1923f-03df5d2bb78235-4048032c-1fa400-16b6a45c193317; PHPSESSID=c7fgplrb9sru5lcbfek8q530t2; CNZZDATA1277644898=1000072972-1561026763-%7C1561496733; uloginid=8391820341'
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


let cnName = '美丽新世界';
let id = '980';
// let cnName = '干爹我还要';
// let id = '337';



checkPath();

let timer = setInterval(protectSave, 60*1000*3);