let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');

let server = express();

let user = require("./user");

module.exports = {
    start: () => {

        server.listen(6969);
        server.use(bodyParser.urlencoded({ extended: false }));
        // server.use(express.static('./'));
        // console.log(path.resolve(__dirname, '../static'));
        server.use('/', express.static(path.resolve(__dirname, '../static')));
        server.use('/img', express.static(path.resolve(__dirname, '../data/content/img')));

        server.use('/user', function(req, res) {
            let id = req.query.id;
            user.get(id).then(function(info) {
                if (info.isPass) {
                    res.send(info);
                } else {
                    res.status(403).send({
                        isPass: false
                    });
                }
            }).catch(function() {
                res.status(403).send({
                    isPass: false
                });
            });
        });

        server.use('/checkId', function(req, res) {
            let id = req.query.id;
            res.send({
                result: user.checkId(id) ? "pass" : "notPass"
            });
        });

        server.use('/signin', function(req, res) {
            let data = JSON.parse(req.body.data);
            user.save(data).then(function(result) {
                res.send(result);
            }).catch(function(result) {
                res.send(result);
            });
        });

        server.use('/login', function(req, res) {
            let data = JSON.parse(req.body.data);
            user.login(data).then(function(result) {
                res.send(result);
            }).catch(function(result) {
                res.send(result);
            });
        });

        server.use('/getInfo', function(req, res) {
            user.getInfo(req.body.id).then(function(result) {
                res.send(result);
            }).catch(function(result) {
                res.send(result);
            });
        });

        // server.use('/save', function (req, res) {
        //     if(req.body.bossId.indexOf("爆操") == -1) {
        //         return res.status(403).send({
        //             result: 0,
        //             data: '无权保存'
        //         });
        //     }
        //     analysis.add(JSON.parse(req.body.data)).then(() => {
        //         res.send({
        //             result: 1,
        //             data: 'save success!'
        //         });
        //     }).catch((e) => {
        //         res.status(500).send({
        //             result: 0,
        //             data: e
        //         });
        //     });
        // });

        // server.use('/get', function (req, res) {
        //     console.log("/get?" + JSON.stringify(req.query));
        //     analysis.get(req.query.id).then((data) => {
        //         res.send(data);
        //     }).catch((e) => {
        //         res.send(e);
        //     });
        // });
        // server.use('/show', function (req, res) {
        //     console.log('/show?' + JSON.stringify(req.query));
        //     analysis.show(req.query.id).then((data) => {
        //         res.send(data);
        //     }).catch((e) => {
        //         res.send(e);
        //     });
        // });

        // server.use('/upload?', function (req, res) {

        //     // console.log('/save?' + JSON.stringify(req.body));
        //     let form = new formidable.IncomingForm();
        //     form.encoding = 'utf-8'; // 编码
        //     form.keepExtensions = true; // 保留扩展名
        //     form.maxFieldsSize = 20 * 1024 * 1024; // 文件大小
        //     form.uploadDir = 'C:/Users/Administrator/Downloads'  // 存储路径
        //     form.parse(req, function (err, fileds, files) { // 解析 formData数据
        //         if (err) { return console.log(err) }

        //         console.log(files.img)
        //         // let name = new Date().getTime() + "" + files.img.name;
        //         // let imgPath = files.img.path // 获取文件路径
        //         // let imgName = `.${basePath}/img/${name}`; // 修改之后的名字
        //         // let data = fs.readFileSync(imgPath) // 同步读取文件

        //         // let info = fs.readFileSync(`.${basePath}/info.txt`);
        //         // info = JSON.parse(info);
        //         // info[id] = {
        //         //     pwd: pwd,
        //         //     file: name,
        //         //     type: files.img.type
        //         // };
        //         // writedown(JSON.stringify(info));

        //         // try {
        //         //     fs.writeFile(imgName, data, function (err) { // 存储文件
        //         //         if (err) {
        //         //             console.log(err);
        //         //             response.writeHead(200, { 'Content-Type': 'text/text;charset=UTF-8' });
        //         //             response.end("0");
        //         //             return;
        //         //         }
        //         //         fs.unlink(imgPath, function () { }) // 删除文件
        //         //         response.writeHead(200, { 'Content-Type': 'text/text;charset=UTF-8' });
        //         //         response.end("1");
        //         //     });
        //         // } catch (e) {
        //         //     console.log(e);
        //         //     response.writeHead(200, { 'Content-Type': 'text/text;charset=UTF-8' });
        //         //     response.end("0");
        //         // }
        //     })
        //     res.send({
        //         "res": "good"
        //     })
        // });

        let startTime = new Date();
        console.log(`${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()} 启动`);
    }
}