let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let formidable = require('formidable');

let multer = require('multer');

let server = express();

module.exports = {
    start() {
        server.listen(8100);
        server.use(bodyParser.urlencoded({ extended: false }));
        // server.use(multer({ dest: '/tmp/' }).array('image'));

        // server.use(express.static('./'));
        // console.log(path.resolve(__dirname, '../static'));
        // server.use('/', express.static(path.resolve(__dirname, '../static')));

        server.use('/next?', function (req, res) {
            console.log('/next?' + JSON.stringify(req.query));
        });

        server.use('/save?', function (req, res) {

            // console.log('/save?' + JSON.stringify(req.body));
            let form = new formidable.IncomingForm();
            form.encoding = 'utf-8'; // 编码
            form.keepExtensions = true; // 保留扩展名
            form.maxFieldsSize = 20 * 1024 * 1024; // 文件大小
            form.uploadDir = 'C:/Users/Administrator/Downloads'  // 存储路径
            form.parse(req, function (err, fileds, files) { // 解析 formData数据
                if (err) { return console.log(err) }

                console.log(files.img)
                // let name = new Date().getTime() + "" + files.img.name;
                // let imgPath = files.img.path // 获取文件路径
                // let imgName = `.${basePath}/img/${name}`; // 修改之后的名字
                // let data = fs.readFileSync(imgPath) // 同步读取文件

                // let info = fs.readFileSync(`.${basePath}/info.txt`);
                // info = JSON.parse(info);
                // info[id] = {
                //     pwd: pwd,
                //     file: name,
                //     type: files.img.type
                // };
                // writedown(JSON.stringify(info));

                // try {
                //     fs.writeFile(imgName, data, function (err) { // 存储文件
                //         if (err) {
                //             console.log(err);
                //             response.writeHead(200, { 'Content-Type': 'text/text;charset=UTF-8' });
                //             response.end("0");
                //             return;
                //         }
                //         fs.unlink(imgPath, function () { }) // 删除文件
                //         response.writeHead(200, { 'Content-Type': 'text/text;charset=UTF-8' });
                //         response.end("1");
                //     });
                // } catch (e) {
                //     console.log(e);
                //     response.writeHead(200, { 'Content-Type': 'text/text;charset=UTF-8' });
                //     response.end("0");
                // }
            })
            res.send({
                "res": "good"
            })
        });

        let startTime = new Date();
        console.log(`${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()} 启动`);
    }
}