let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let formidable = require('formidable');

let server = express();

let user = require("./user");
let content = require("./content");
let self = require("./self");
// let log = require("./log");
// let addInfo = require("./addInfo");

let log = (str) => {
    console.log(str);
}

module.exports = {
    start: () => {

        server.listen(6969);
        server.use(bodyParser.urlencoded({ extended: false }));
        server.use('/', express.static(path.resolve(__dirname, '../static')));
        server.use('/img', express.static(path.resolve(__dirname, '../data/content/img')));
        server.use('/self', express.static(path.resolve(__dirname, '../data/content/user')));
        server.use('/temp', express.static(path.resolve(__dirname, '../data/content/temp')));
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
                log('siginin ==> ' + JSON.stringify(result));
                res.send(result);
            }).catch(function(result) {
                log('siginin Error ==> ' + JSON.stringify(result));
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
                log(e);
                res.send("getHot");
            })
        });

        server.use('/upload', function(req, res) {
            log("upload img");
            try {
                // log(JSON.stringify(req.body)) // {}
                let form = new formidable.IncomingForm();
                form.encoding = 'utf-8'; // 编码
                form.keepExtensions = true; // 保留扩展名
                form.maxFieldsSize = 20 * 1024 * 1024; // 文件大小
                form.uploadDir = path.resolve(__dirname, '../data/content/user') // 存储路径
                form.parse(req, function(err, fileds, files) { // 解析 formData数据
                    if (err) { return log(err) }
                    // log(typeof files); // object
                    // log(JSON.stringify(files))
                    let paths = [];
                    for (let key in files) {
                        let path = files[key].path;
                        path = path.replace(/\\/g, '/');
                        path = path.split("/");
                        path = path[path.length - 1];
                        // log(`path: ${files.img.path}`);
                        paths.push(path);
                    }
                    res.send({
                        "result": true,
                        "data": paths
                    });
                });
            } catch (error) {
                log('upload img error! ' + error);
                res.send({
                    "result": false,
                    "data": "上传失败！请稍后重试"
                });
            }
        });

        server.use('/linkAndActiveFile', function(req, res) {
            log(`server.linkAndActiveFile: req.body(${JSON.stringify(req.body)})`);
            try {
                self.linkAndActiveFile(req.body);
                res.send({
                    "result": true,
                    "data": `上传成功！${req.body.userId},请继续加油哟~`
                });
            } catch (error) {
                log(error);
                res.send({
                    "result": true,
                    "data": `上传失败！请稍后重试`
                });
            }
        });

        // server.use('/linkFile', function(req, res) {
        //     log(`server.linkFile: req.body(${JSON.stringify(req.body)})`);
        //     let userId = req.body.userId;
        //     let fileName = req.body.fileName;
        //     self.linkFile(fileName, userId);
        //     res.send("linkFile");
        // });

        // server.use('/activeLink', function(req, res) {
        //     try {
        //         self.activeLink(req.body);
        //         res.send({
        //             result: true,
        //             data: "上传成功！"
        //         });
        //     } catch (error) {
        //         res.send({
        //             result: false,
        //             data: "上传失败！请稍后重试"
        //         });
        //     }
        // });

        server.use('/passiveLink', function(req, res) {
            try {
                self.passiveLink(req.body);
                res.send({
                    result: true,
                    data: "删除成功！"
                });
            } catch (error) {
                res.send({
                    result: false,
                    data: "删除失败！请稍后重试"
                });
            }
        });

        server.use('/getMine', function(req, res) {
            let userId = req.body.userId;
            let index = req.body.index;
            res.send(self.getList(userId, index));
        });

        server.use("/getLessons", function(req, res) {
            res.send(content.getLessons());
        });

        server.use("/getLesson", function(req, res) {
            res.send(content.getLesson(decodeURIComponent(req.query.name), req.query.index));
        });

        server.use("/userSort", function(req, res) {
            res.send(self.sort(req.query.userId));
        });

        // server.use('/info_next', function(req, res) {
        //     res.send(addInfo.next());
        // });

        // server.use('/info_save', function(req, res) {
        //     // log(decodeURIComponent(req.query.data))
        //     res.send(addInfo.save(JSON.parse(decodeURIComponent(req.query.data))));
        // });

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
        //     log("/get?" + JSON.stringify(req.query));
        //     analysis.get(req.query.id).then((data) => {
        //         res.send(data);
        //     }).catch((e) => {
        //         res.send(e);
        //     });
        // });
        // server.use('/show', function (req, res) {
        //     log('/show?' + JSON.stringify(req.query));
        //     analysis.show(req.query.id).then((data) => {
        //         res.send(data);
        //     }).catch((e) => {
        //         res.send(e);
        //     });
        // });


        let startTime = new Date();
        log(`${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()} 启动`);
    }
}