let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let formidable = require('formidable');

let server = express();

let user = require("./user");
let content = require("./content");
let self = require("./self");

module.exports = {
    start: () => {

        server.listen(6969);
        server.use(bodyParser.urlencoded({ extended: false }));
        // server.use(express.static('./'));
        // console.log(path.resolve(__dirname, '../static'));
        server.use('/', express.static(path.resolve(__dirname, '../static')));
        server.use('/img', express.static(path.resolve(__dirname, '../data/content/img')));
        server.use('/video', express.static(path.resolve(__dirname, '../data/content/video')));

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
                if (result.result == 1) {
                    self.createInfo(data.id)
                }
                console.log('siginin ==> ' + JSON.stringify(result));
                res.send(result);
            }).catch(function(result) {
                console.log('siginin Error ==> ' + JSON.stringify(result));
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

        server.use('/getHot', function(req, res) {
            let index = req.query.index;
            content.getHot(index).then(function(data) {
                res.send(data);
            }).catch(function(e) {
                console.log(e);
                res.send("getHot");
            })
        });

        server.use('/upload', function(req, res) {
            console.log("upload img");
            try {
                let form = new formidable.IncomingForm();
                form.encoding = 'utf-8'; // 编码
                form.keepExtensions = true; // 保留扩展名
                form.maxFieldsSize = 20 * 1024 * 1024; // 文件大小
                form.uploadDir = path.resolve(__dirname, '../data/content/user') // 存储路径
                form.parse(req, function(err, fileds, files) { // 解析 formData数据
                    if (err) { return console.log(err) }
                    let path = files.img.path.split("\\");
                    path = path[path.length - 1];
                    res.send({
                        "fileName": path
                    });
                });
            } catch (error) {
                console.log('upload img error! ' + error);
            }
        });

        server.use('/linkFile', function(req, res) {
            let userId = req.body.userId;
            let fileName = req.body.fileName;
            self.linkFile(fileName, userId, );
            res.send("linkFile");
        });

        server.use('/activeLink', function(req, res) {
            try {
                self.activeLink(req.body);
                res.send({
                    result: true,
                    data: "上传成功！"
                });
            } catch (error) {
                res.send({
                    result: false,
                    data: "上传失败！请稍后重试"
                });
            }
        });

        server.use('/passiveLink', function(req, res) {
            let userId = req.body.userId;
            let fileName = req.body.fileName;
            try {
                self.passiveLink(fileName, userId);
                res.send({
                    result: true,
                    data: "删除成功！"
                });
            } catch (error) {
                res.send({
                    result: false,
                    data: "删除失败！"
                });
            }
        });

        server.use('/getList', function(req, res) {
            let userId = req.body.userId;
            return self.getList(userId);
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


        let startTime = new Date();
        console.log(`${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()} 启动`);
    }
}