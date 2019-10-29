const request = require('request');
const jsdom = require("jsdom");
const fs = require("fs");
const download = require("./download");
const event = require("./listener");
const { JSDOM } = jsdom;

let cnName = '';
let id = '';

let data = {};
let cookie = fs.readFileSync("./cookie.txt");

let lastImageSrc = '';

let rq = (id, index) => {
    console.log(`request id => ${id}, index => ${index}`);
    // Set the headers for the request
    let headers = {
        'Content-Type': 'application/json',
        // 'Content-Length': Buffer.byteLength(post_data),
        'Cookie': cookie//'uloginid=627865; PHPSESSID=g6grdpf1rq5a08c7n2rb60s6c0; __51cke__=; __tins__20198685=%7B%22sid%22%3A%201564767720431%2C%20%22vd%22%3A%2017%2C%20%22expires%22%3A%201564769972036%7D; __51laig__=17'
    };
    // Configure the request
    let options = {
        url: `http://a.wymh.cc/Mhpc/mhread.php?mhid=${id}&ji_no=${index}`,
        method: 'GET',
        headers: headers
    };
    console.log(`request id => ${id}, index => ${index}, url => ${options.url}`);
    // console.log(options.url);
    request(options, (err, res, body) => {
        if (err) {
            // clearInterval(timer);
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

        if(lastImageSrc === imgsrc[0]){
            console.log("sameSrc!");
            return output();
        }else{
            lastImageSrc = imgsrc[0];
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
            // clearInterval(timer);
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
        // console.log("异步读取: " + _data.toString());
        imagedata = JSON.parse(_data);
        console.log("异步读取: " + imagedata.length);
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

let all_data = fs.readFileSync('./netData.json');
all_data = JSON.parse(all_data);
all_data.reverse();
// let cnName = '危险性赌注';
// let id = '961';


event.on('downloadEnd', () => {
    console.log(all_data.length);
    checkNext();
});

event.on('error', () => {
    checkNext();
    // all_data = fs.readFileSync('./netData.json');
    // all_data = JSON.parse(all_data);
    // all_data.reverse();
    // checkNext();
    console.log("error")
});


let checkNext = () => {
    data = {};
    lastStr = '';
    path = '';
    let d = all_data.shift();
    if(d){
        if(d.json_length !== d.net_length || d.json_length !== d.html_length){
            console.log(`name=${d.name}, net_length=${d['net_length']}, json_length=${d['json_length']}, html_length=${d['html_length']}`);
            cnName = d.name;
            id = d.id;
            checkPath();
        }else{
            checkNext();
        }
    }
}

checkNext();

// let timer = setInterval(protectSave, 60*1000*3);