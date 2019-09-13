
let os = require('os');
let http = require('http'); // http协议模块
let url = require('url'); // url解析模块
let fs = require('fs'); // 文件系统模块
let path = require('path'); // 路径解析模块
let readlineSync = require("readline-sync");
const formidable = require('formidable');
const bodyParser = require('body-parser');

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
    let str = readlineSync.question("need output:");
    if (str == "1") {
        str = "pass";
    } else {
        str = "error";
    }
    // readlineSync.close();
    return str;
}

let writedown = (str) => {
    fs.open(`.${basePath}/info.json`, 'w', (err, fd) => {
        if (err) {
        }
        str = str || log;//JSON.stringify(log);
        fs.writeFile(fd, str, (err) => {
            if (err) {
            }
            fs.close(fd, (err) => {
                // console.log('saved');
            });
        });
    });
}

let rename = (name) => {
    name = name.replace(/ /g, "");
    return name.replace(/\.jpg|\.jpeg|\.JPG|\.JPEG|\.png|\.PNG|\.gif|\.GIF|\.mov|\.MOV/g, ".txt");
}

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
    let str = "";
    // console.log(pathName);
    if (/\.html/.test(pathName)) {
        str = "";
        if (fs.existsSync(`.${basePath}/${pathName}`)) {
            response.writeHead(200, { 'content-type': 'text/html; charset=UTF-8' });
            str = fs.readFileSync(`.${basePath}/${pathName}`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'text/html; charset=UTF-8' });
        }
        response.end(str);
        return;
    } else if (/\.js/.test(pathName)) {
        str = "";
        if (fs.existsSync(`.${basePath}/${pathName}`)) {
            response.writeHead(200, { 'content-type': 'application/javascript; charset=UTF-8' });
            str = fs.readFileSync(`.${basePath}/${pathName}`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'application/javascript; charset=UTF-8' });
        }
        response.end(str);
        return;
    } else if (/\.png/.test(pathName) || /\.PNG/.test(pathName)) {
        str = '';
        pathName = rename(pathName);
        console.log(`====> real local name ${pathName}`);
        if (fs.existsSync(`.${basePath}/${pathName}`)) {
            response.writeHead(200, { 'content-type': 'image/png' });
            str = fs.readFileSync(`.${basePath}/${pathName}`) || '';
        } else if (fs.existsSync(`.${basePath}/img/${pathName}`)) {
            response.writeHead(200, { 'content-type': 'image/png' });
            str = fs.readFileSync(`.${basePath}/img/${pathName}`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'image/png' });
        }
        response.end(str);
        return;
    } else if (/\.jpg/.test(pathName) || /\.jpeg/.test(pathName) || /\.JPG/.test(pathName) || /\.JPEG/.test(pathName)) {
        str = '';
        pathName = rename(pathName);
        console.log(`====> real local name ${pathName}`);
        if (fs.existsSync(`.${basePath}/${pathName}`)) {
            response.writeHead(200, { 'content-type': 'image/jpeg' });
            str = fs.readFileSync(`.${basePath}/${pathName}`) || '';
        } else if (fs.existsSync(`.${basePath}/img/${pathName}`)) {
            response.writeHead(200, { 'content-type': 'image/jpeg' });
            str = fs.readFileSync(`.${basePath}/img/${pathName}`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'image/jpeg' });
        }
        response.end(str);
        return;
    } else if (/\.gif/.test(pathName) || /\.GIF/.test(pathName)) {
        str = '';
        pathName = rename(pathName);
        console.log(`====> real local name ${pathName}`);
        if (fs.existsSync(`.${basePath}/${pathName}`)) {
            response.writeHead(200, { 'content-type': 'image/gif' });
            str = fs.readFileSync(`.${basePath}/${pathName}`) || '';
        } else if (fs.existsSync(`.${basePath}/img/${pathName}`)) {
            response.writeHead(200, { 'content-type': 'image/gif' });
            str = fs.readFileSync(`.${basePath}/img/${pathName}`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'image/gif' });
        }
        response.end(str);
        return;
    } else if (/\.mov/.test(pathName) || /\.MOV/.test(pathName)) {
        str = '';
        pathName = rename(pathName);
        console.log(`====> real local name ${pathName}`);
        if (fs.existsSync(`.${basePath}/${pathName}`)) {
            response.writeHead(200, { 'content-type': 'video/quicktime' });
            str = fs.readFileSync(`.${basePath}/${pathName}`) || '';
        } else if (fs.existsSync(`.${basePath}/img/${pathName}`)) {
            response.writeHead(200, { 'content-type': 'video/quicktime' });
            str = fs.readFileSync(`.${basePath}/img/${pathName}`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'video/quicktime' });
        }
        response.end(str);
        return;
    } else if (/\.ico/.test(pathName) || /\.ICO/.test(pathName)) {
        str = '';
        if (fs.existsSync(`.${basePath}/${pathName}`)) {
            response.writeHead(200, { 'content-type': 'image/x-icon' });
            str = fs.readFileSync(`.${basePath}/${pathName}`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'image/x-icon' });
        }
        response.end(str);
        return;
    } else if (/\.css/.test(pathName)) {
        str = '';
        if (fs.existsSync(`.${basePath}/${pathName}`)) {
            response.writeHead(200, { 'content-type': 'text/css' });
            str = fs.readFileSync(`.${basePath}/${pathName}`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'text/css' });
        }
        response.end(str);
        return;
    } else if (/\.json/.test(pathName)) {
        str = '';
        if (fs.existsSync(`.${basePath}/${pathName}`)) {
            response.writeHead(200, { 'content-type': 'application/json' });
            str = fs.readFileSync(`.${basePath}/${pathName}`) || '';
        } else {
            response.writeHead(404, { 'content-type': 'application/json' });
        }
        response.end(str);
        return;
    } else if (pathName == "/save" && request.method === 'POST') {
        let qs = query.split("&");
        let pwd = "123321";
        let id = ""
        qs.forEach(e => {
            let kv = e.split("=");
            if (kv[0] === "pwd") {
                pwd = kv[1];
            }
            if (kv[0] === "id") {
                id = kv[1];
            }
        });
        let form = new formidable.IncomingForm();
        form.encoding = 'utf-8'; // 编码
        form.keepExtensions = true; // 保留扩展名
        form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小
        form.uploadDir = `.${basePath}/img`  // 存储路径
        form.parse(request, function (err, fileds, files) { // 解析 formData数据
            if (err) { return console.log(err) }

            let orgName = files.img.name;
            let size = files.img.size;
            let orgNames = orgName.split(".");
            let orgType = orgNames.splice(orgNames.length - 1, 1);
            orgName = orgNames.join("-");
            orgName = btoa(orgName);
            let name = (new Date().getTime()-baseTime) + "_" + orgName + "." + orgType;
            let imgPath = files.img.path // 获取文件路径
            let data = fs.readFileSync(imgPath) // 同步读取文件

            let info = fs.readFileSync(`.${basePath}/info.json`);
            info = JSON.parse(info);
            info[id] = {
                pwd: pwd,
                file: name,
                type: files.img.type,
                orgName: orgName,
                orgType: orgType,
                size: size
            };
            writedown(JSON.stringify(info));

            let imgName = `.${basePath}/img/${rename(name)}`; // 修改之后的名字

            try {
                fs.writeFile(imgName, data, function (err) { // 存储文件
                    if (err) {
                        console.log(err);
                        response.writeHead(200, { 'Content-Type': 'text/text;charset=UTF-8' });
                        response.end("0");
                        return;
                    }
                    fs.unlink(imgPath, function () { }) // 删除文件
                    response.writeHead(200, { 'Content-Type': 'text/text;charset=UTF-8' });
                    response.end("1");
                });
            } catch (e) {
                console.log(e);
                response.writeHead(200, { 'Content-Type': 'text/text;charset=UTF-8' });
                response.end("0");
            }
        })
        // let data = '';

        // request.on('data', (chunk) => {
        //     // console.log(chunk);
        //     data += chunk;
        // });

        // request.on('end', () => {
        //     console.log(`============> ${data}`);
        //     data = decodeURI(data);
        //     console.log(data);
        //     var dataObject = querystring.parse(data);
        //     console.log(dataObject);
        // });
        return;
    } else if (pathName == "/query") {
        if (query) {
            let qs = query.split("&");
            let pwd = "123321";
            let id = ""
            qs.forEach(e => {
                let kv = e.split("=");
                if (kv[0] === "pwd") {
                    pwd = kv[1];
                }
                if (kv[0] === "id") {
                    id = kv[1];
                }
            });
            let info = fs.readFileSync(`.${basePath}/info.json`);
            info = JSON.parse(info);
            let i = info[id];
            let r = "";
            if (i && i.pwd === pwd) {
                r = `{"type":"${i.type}", "file":"${i.file}"}`;
            }
            // request.setCharacterEncoding("utf-8");
            response.writeHead(200, { 'Content-Type': 'text/text;charset=UTF-8' });
            response.end(r);
            // writedown(query);
        }
        return;
    } else if (pathName == "/info") {
        let info = fs.readFileSync(`.${basePath}/info.json`);
        info = JSON.parse(info);
        // 字节数 1000000 = 1000kb = 1mb
        let max = 5 * 1000 * 1000; //GB=>MB=>KB
        let cur = 1;
        for (let key in info) {
            cur += (parseInt(info[key].size || "1000000"));
        }
        cur = cur / 1000; //b => kb;
        let re = {
            max: max,
            cur: parseInt(cur),
            per: (cur / max).toFixed(1)
        };
        // request.setCharacterEncoding("utf-8");
        response.writeHead(200, { 'Content-Type': 'text/text;charset=UTF-8' });
        response.end(JSON.stringify(re));
        return;
    }

    let htmlstr = '';
    response.end(htmlstr);
};

let queryMethod = {
    "tid": (tid) => {
        let typeJson = fs.readFileSync(`.${basePath}/type.json`);
        typeJson = JSON.parse(typeJson);
        return JSON.stringify(typeJson[tid]);
    }
}

// let basePath = "/BoomMan/getImage";
let basePath = "";
let host = getHost();
let post = '5169';
let html1 = `./${basePath}/1.html`;

let isFirst = true;
let log = "";

let baseTime = new Date().getTime();

// let server = http.createServer(listener);
// server.listen(post, host.local, () => {
//     console.log(`绑定完成 ==> ${host.local}:${post}`);
// });
// console.log(`执行了${post}`);


module.exports = {
    start: () => {

        basePath = "/BoomMan/getImage";
        let server = http.createServer(listener);
        server.listen(post, host.local, () => {
            console.log(`绑定完成 ==> ${host.local}:${post}`);
        });
    }
}