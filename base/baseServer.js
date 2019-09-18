
let os = require('os');
let http = require('http'); // http协议模块
let url = require('url'); // url解析模块
let fs = require('fs'); // 文件系统模块
let path = require('path'); // 路径解析模块
let readlineSync = require("readline-sync");
const formidable = require('formidable');

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

let getContentType = () => {
    return JSON.parse(fs.readFileSync("./base/contentType.json"));
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
    fs.open(`.${basePath}/36316445.json`, 'w', (err, fd) => {
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

// .html .css .js .json
// .ico .jpg. jpeg .png .gif
// .mov .mp4

let hideTypeName = "dan"

let isCorrectFile = (name) => {
    return name.toLocaleLowerCase().endswith((".html", ".css", ".js", ".json", ".ico", ".jpg", ".jpeg", ".png", ".gif", ".mov", ".mp4"));
}

let rename = (name) => {
    name = name.toLocaleLowerCase().replace(/ /g, "");
    // 只转义媒体文件
    return name.replace(/\.ico|\.jpg|\.jpeg|\.png|\.gif|\.mov|\.mp4/g, `.${hideTypeName}`);
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
    if (isCorrectFile(pathName)) {
        let paths = pathName.split("/");
        pathName = paths[paths.length - 1];
        // 暂不处理多层级的事儿
        if (paths.length > 2) {
            // 多层级
        } else {
            let fileType = `.${pathName.split(".")[1]}`;
            console.log(`====> request name: ${pathName}`);
            switch (fileType) {
                case ".html":
                case ".css":
                case ".js":
                case ".json":
                    break;
                default:
                    // 媒体文件全部改名成.dan
                    pathName = rename(pathName);
                    break;
            }
            console.log(`====> real local name: ${pathName}`);
            let contentType = CONTENT_TYPE[fileType]; 
            let basePath = [`.${basePath}/${pathName}`, `./base/${pathName}`];
            let i = 0, p, isMatched;
            while(p = basePath[i]){
                if(fs.existsSync(p)){
                    response.writeHead(200, { 'content-type': contentType });
                    str = fs.readFileSync(p) || '';
                    isMatched = true;
                    break;
                }else{
                    i++;
                }
            }
            if(!isMatched){
                response.writeHead(404, { 'content-type': contentType });
            }
            response.end(str);
            return;
        }
    } else if (pathName == "/save" && request.method === 'POST') {
        // let qs = query.split("&");
        // let pwd = "123321";
        // let id = ""
        // qs.forEach(e => {
        //     let kv = e.split("=");
        //     if (kv[0] === "pwd") {
        //         pwd = kv[1];
        //     }
        //     if (kv[0] === "id") {
        //         id = kv[1];
        //     }
        // });
        // let form = new formidable.IncomingForm();
        // form.encoding = 'utf-8'; // 编码
        // form.keepExtensions = true; // 保留扩展名
        // form.maxFieldsSize = 2 * 1024 * 1024; // 文件大小
        // form.uploadDir = `.${basePath}/img`  // 存储路径
        // form.parse(request, function (err, fileds, files) { // 解析 formData数据
        //     if (err) { return console.log(err) }

        //     let orgName = files.img.name;
        //     let size = files.img.size;
        //     let orgNames = orgName.split(".");
        //     let orgType = orgNames.splice(orgNames.length - 1, 1);
        //     orgName = orgNames.join("-");
        //     orgName = btoa(orgName);
        //     let name = (new Date().getTime() - baseTime) + "_" + orgName + "." + orgType;
        //     let imgPath = files.img.path // 获取文件路径
        //     let data = fs.readFileSync(imgPath) // 同步读取文件

        //     let info = fs.readFileSync(`.${basePath}/36316445.json`);
        //     info = JSON.parse(info);
        //     info[id] = {
        //         pwd: pwd,
        //         file: name,
        //         type: files.img.type,
        //         orgName: orgName,
        //         orgType: orgType,
        //         size: size
        //     };
        //     writedown(JSON.stringify(info));

        //     let imgName = `.${basePath}/img/${rename(name)}`; // 修改之后的名字

        //     try {
        //         fs.writeFile(imgName, data, function (err) { // 存储文件
        //             if (err) {
        //                 console.log(err);
        //                 response.writeHead(200, { 'Content-Type': 'text/text;charset=UTF-8' });
        //                 response.end("0");
        //                 return;
        //             }
        //             fs.unlink(imgPath, function () { }) // 删除文件
        //             response.writeHead(200, { 'Content-Type': 'text/text;charset=UTF-8' });
        //             response.end("1");
        //         });
        //     } catch (e) {
        //         console.log(e);
        //         response.writeHead(200, { 'Content-Type': 'text/text;charset=UTF-8' });
        //         response.end("0");
        //     }
        // });
        return;
    } else if (pathName == "/query") {
        if (query) {
            query.split("&").forEach(e => {
                let kv = e.split("=");
            });
            // request.setCharacterEncoding("utf-8");
            response.writeHead(200, { 'Content-Type': 'text/text;charset=UTF-8' });
            response.end(r);
            // writedown(query);
        }
        return;
    } else if (pathName == "/info") {
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
let CONTENT_TYPE = getContentType();
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