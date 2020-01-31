let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let formidable = require('formidable');
let fs = require('fs');

let multer = require('multer');

let server = express();
let readlineSync = require("readline-sync");

let writeHtml = () => {
    let list = fs.readdirSync(path.resolve(__dirname, '../static/dia/data'));
    console.log(JSON.stringify(list))
    let str = "";
    list.forEach(e => {
        // str += `<img src="./data/${e}" /><br/>`
        str += `<a href="./data/${e}" target="blank" />${e}<br/>`
    });
    fs.writeFileSync(path.resolve(__dirname, '../static/dia/1.html'), str);
    console.log('write html 1')
}

module.exports = {
    start() {
        server.listen(8100);
        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(express.json())

        server.use('/', express.static(path.resolve(__dirname, './static')));

        server.use('/log', function(req, res) {
            console.log(`log: ${req.query.msg}`);
            res.send("");
        });

        server.use('/next', function(req, res) {
            // console.log('/next' + JSON.stringify(req.body));
            let data = req.body.data.split(",");
            let rootPath = req.body.rootPath;
            if (rootPath.charAt(rootPath.length - 1) !== "/") {
                rootPath = rootPath + "/";
            }
            let str = "";
            let str2 = "";
            let arr = [];
            data.forEach((e, i) => {
                // if (e.endsWith(".jpg") || e.endsWith(".JPG") ||
                //     e.endsWith(".png") || e.endsWith(".PNG") ||
                //     e.endsWith(".mp4") || e.endsWith(".mp4") ||
                //     e.endsWith(".JPEG") || e.endsWith(".jpeg")) {
                // }
                arr.push(rootPath + e);
                str += (i + ". ======> " + rootPath + e + "\n");
                str2 += (i + ". ======> " + rootPath + e + "<br>");
            });
            console.log(str)
            console.log(`${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()} 收到请求`);
            try {
                fs.writeFileSync(path.resolve(__dirname, '../static/dia/l.html'), `<!DOCTYPE html><html><head><meta http-equiv="Content-Type"content="text/html; charset=utf-8"/><title></title></head><body>${str2}</body></html>`);
            } catch (error) {

            }
            let input = readlineSync.question("need output:");
            switch (input.charAt(0)) {
                case "s":
                    res.send("s>" + arr[input.replace("s", "")]);
                    break;
                case "c":
                    res.send("c>" + arr[input.replace("c", "")]);
                    break;
                case "a":
                    res.send("a>");
                    break;
                case "r":
                    res.send("r>");
                    break;
                default:
                    res.send(input);
                    break;
            }
            // res.send('c===迅雷下载');
        });

        server.use('/save', function(req, res) {

            // console.log('/save?' + JSON.stringify(req.body));
            let form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; // 编码
            form.keepExtensions = true; // 保留扩展名
            form.maxFieldsSize = 20 * 1024 * 1024; // 文件大小
            form.uploadDir = path.resolve(__dirname, '../static/dia/data') // 存储路径
                // form.uploadDir = path.resolve(__dirname, './') // 存储路径
            form.parse(req, function(err, fileds, files) { // 解析 formData数据
                if (err) { return console.log(err) }
                console.log(files.img.path)
                res.send({
                    "res": "good"
                })
                writeHtml();
            })
        });

        let startTime = new Date();
        console.log(`${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()} 启动`);
    }
}