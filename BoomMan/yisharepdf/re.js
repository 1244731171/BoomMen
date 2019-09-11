const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs')

let json = JSON.parse(fs)

// Set the headers for the request
var headers = {
    'Content-Type': 'text/html; charset=UTF-8',
    // 'Content-Length': Buffer.byteLength(post_data),
    // 'Cookie': 'PHPSESSID=p3nr1fprr7hfk4r0l4ahg8u2b2; UM_distinctid=16b6a463d9444a-0b46708abc4994-3e385a0a-1fa400-16b6a463d952e6; CNZZDATA1277644898=1671604651-1560855448-%7C1560859256; uloginid=7961519809'
};
var options = {
    url: 'https://yisharepdf.site/archives/1497',
    method: 'GET',
    headers: headers
};
request(options, (err, res, body) => {
    if (err) { return console.log(err); }
    let pwd = body.match(/提取密码：\w{4}/g);
    pwd = (pwd || [0]) || '';
    // let pan = body.match(/https\:\/\/pan\.baidu\.com\/(s|share)\/(((\w|\-){23})|(init\?surl\=(\w){6,8}))/g);
    let pan = body.match(/https\:\/\/pan\.baidu\.com\/(s|share)\/(\w|\-|\=|\?){5,23}/g);
    let name = body.match(/\"(\w|\-|\?|\=|[\u4e00-\u9fa5])*\"/g)
    // let name = body.match(/\"WIDsubject\"\: \"(\w|\-|\?|\=|[\u4e00-\u9fa5])*\"\,/g)

    console.log(JSON.stringify(name));
});