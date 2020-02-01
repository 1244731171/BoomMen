let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let formidable = require('formidable');
let fs = require('fs');
let tinify = require('tinify');

let server = express();
let readlineSync = require("readline-sync");

let baseHTML = fs.readFileSync(path.resolve(__dirname, '../static/dia/b.html')).toString();

let writeHtml = () => {
    let list = fs.readdirSync(path.resolve(__dirname, '../static/dia/data'));
    console.log(JSON.stringify(list))
    let str = "";
    list.forEach(e => {
        if (!e.startsWith("s__") && e !== "1.jpg") {
            str += `<a href="./data/${e}" n="${e}" target="blank" />${e}<img src="./data/${"s__"+e}"><br/>`;
        }
        // str += `<img src="./data/${e}" /><br/>`
    });
    fs.writeFileSync(path.resolve(__dirname, '../static/dia/1.html'), baseHTML.replace("{{body}}", str));
    console.log('write 1.html');
}

tinify.key = "R6gxfzz08ZhLyQccf42Qf2NqyHwP73d6";
// let tini = (_path, _spath) => {
//     setTimeout(() => {
//         try {
//             tinify.fromFile(_path)
//                 .resize({
//                     method: "scale",
//                     width: 200
//                 }).toFile(_spath);
//             console.log("tinify is good!")
//         } catch (error) {
//             console.log("tinify is error!" + error)
//         }

//     }, 10);
//     // gm(_path).resize(200).quality(10).write(_spath,
//     //     function(err) { console.log("err: " + err); })
// }
let p = path.resolve(__dirname, './1.txt');
let checkT = () => {
    if (!fs.existsSync(p)) {
        fs.writeFileSync(p, "1");
    }
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

        // let is = ["e", "c12", "c6", "s2"]

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
                // str += (i + ". ======> " + rootPath + e + "\n");
                str2 += (i + ". ======> " + rootPath + e + "<br>");
            });
            // console.log(str)
            console.log(`${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()} 收到请求`);
            try {
                fs.writeFileSync(path.resolve(__dirname, '../static/dia/l.html'), `<html lang="en"><head><meta charset="utf-8"><title>${new Date().toLocaleString()}</title></head><body>${str2}</body></html>`);
            } catch (error) {

            }
            let input = readlineSync.question(`${new Date().toLocaleString()}, next => `);
            // input = is.shift()
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
                let fn = files.img.name.split(".");
                fn = fn[fn.length - 1];
                let name = Date.now() + '.' + fn;
                try {
                    fs.renameSync(files.img.path, path.resolve(__dirname, `../static/dia/data/${name}`))
                } catch (error) {
                    console.log(error)
                }
                if (err) { return console.log(err) }
                res.send({
                    "res": "good"
                });
                // tini(path.resolve(__dirname, `../static/dia/data/${name}`), path.resolve(__dirname, `../static/dia/data/s__${name}`));
                checkT();
                writeHtml();
            })
        });

        let startTime = new Date();
        console.log(`${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()} 启动`);
    }
}