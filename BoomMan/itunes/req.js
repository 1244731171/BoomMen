
let os = require('os');
let http = require('http'); // http协议模块
let url = require('url'); // url解析模块
let fs = require('fs'); // 文件系统模块
let path = require('path'); // 路径解析模块
let readlineSync = require("readline-sync");

const html1 = './1.html';

global.Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
        return new Buffer(str, 'binary').toString('base64');
    };
}

if (typeof atob === 'undefined') {
    global.atob = function (b64Encoded) {
        return new Buffer(b64Encoded, 'base64').toString('binary');
    };
}

// 获得本机ip地址
let getHost = () => {
    let INTERFACES = os.networkInterfaces(); // 在开发环境中获取局域网中的本机iP地址
    // console.log(JSON.stringify(INTERFACES));
    let wifi_host = '';
    let local_host = '';
    for (let devName in INTERFACES) {
        let iface = INTERFACES[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                if (devName === '本地连接') {
                    local_host = alias.address;
                } else if (devName === '无线网络连接' || devName === 'WLAN') {
                    wifi_host = alias.address;
                }
            }
        }
    }

    return {
        'wifi': wifi_host || local_host || "127.0.0.1",
        'local': local_host || wifi_host || "127.0.0.1"
    };
}

// let waitInput = () => {
//     let str = readlineSync.question("need output:");
//     if (str == "1") {
//         str = "pass";
//     } else {
//         str = "error";
//     }
//     // readlineSync.close();
//     return str;
// }

let host = getHost();
let post = '3031';
let isFirst = true;

console.log(JSON.stringify(host));

// let listener = (request, response) => {
//     if (isFirst) {
//         isFirst = false;
//         console.log(request['headers']['user-agent']);
//     }
//     console.log('before');
//     let str = waitInput();
//     console.log('after:' + str);
//     response.write(str);
//     response.end();
// };

//2. 创建http服务器
// 参数: 请求的回调, 当有人访问服务器的时候,就会自动调用回调函数
let server1 = http.createServer((req, res) => {
    console.log(JSON.stringify(req.headers));
});
let server2 = http.createServer((req, res) => {
    console.log(JSON.stringify(req.headers));
});
let server3 = http.createServer((req, res) => {
    console.log(JSON.stringify(req.headers));
});
let server4 = http.createServer((req, res) => {
    console.log(JSON.stringify(req.headers));
});

//3. 绑定端口
server1.listen("3031", "127.0.0.1", () => {
    // console.log(`绑定完成 ==> ${host.local}:${post}`);
});
server2.listen("3032", "69.194.14.161", () => {
    // console.log(`绑定完成 ==> ${host.local}:${post}`);
});
server3.listen("80", "69.194.14.161", () => {
    // console.log(`绑定完成 ==> ${host.local}:${post}`);
});
server4.listen("28581", "69.194.14.161", () => {
    // console.log(`绑定完成 ==> ${host.local}:${post}`);
});



//4. 执行
console.log('执行了3030')

// http://10.3.75.26:3030/itunes/like/comment/s/05bc899676d6ef43f8bee0f69eddca11-T/32153o/72006/84fdc170c16a2ee1010fc21da6f4ef80/3a41998d206411764f134db8d015d63c/_/download/contextbatch/css/com.atlassian.jira.plugins.jira-development-integration-plugin?appid=ngienbnpkldjcebacfbppphjjhbhfkpp&assatrisd=kjhzkKYQnkajsnAOY!hoASdjoAW&rtime=1010230102301203123&dwl=1-1-23-1-123&ttl=1566413096&ri=1433600&rs=1400&clientip=69.194.14.161&hash=29b554a946b107e4028379e37bf4e2c5