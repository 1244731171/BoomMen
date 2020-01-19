const fs = require("fs");
const path = require("path");

module.exports = {
    getInfo: function (id) {
        let userList = fs.readdirSync(path.resolve(__dirname, `../data/user/`));
        return new Promise(function (res, rej) {
            if (userList.indexOf(id+".json") != -1) {
                let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../data/user/${id}.json`)));
                delete data.pwd;
                delete data.isBoss;
                res({
                    isPass: true,
                    data: data
                });
            } else {
                res({
                    isPass: false
                });
            }
        })
    },
    checkId: function (id) {
        let userList = fs.readdirSync(path.resolve(__dirname, `../data/user/`));
        if (userList.indexOf(id + ".json") === -1) {
            return true;
        } else {
            return false;
        }
    },
    checkEcode: function (code, isDelete = false) {
        let ecodes = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../data/temp/ecode.json`)));
        let i = ecodes.indexOf(code);
        // console.log(JSON.stringify(ecodes) + "---" + code);
        return new Promise(function (res, rej) {
            if (i != -1) {
                if (isDelete) {
                    ecodes.splice(i, 1);
                    fs.writeFileSync(path.resolve(__dirname, `../data/temp/ecode.json`), JSON.stringify(ecodes));
                }
                res(true);
            } else {
                res(false);
            }
        });
    },
    login: function (data) {
        console.log(`login! data=${JSON.stringify(data)}`);
        if (this.checkId(data.id)) {
            return Promise.resolve({
                result: 0,
                data: "账号或者密码错误！",
            });
        } else {
            let localData = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../data/user/${data.id}.json`)));
            console.log(`login! local=${JSON.stringify(localData)}`);
            if (localData.pwd === data.pwd) {
                delete localData.pwd;
                delete localData.isBoss;
                return Promise.resolve({
                    result: 1,
                    data: "登陆成功",
                    info: localData
                });
            } else {
                return Promise.resolve({
                    result: 0,
                    data: "账号或者密码错误！",
                });
            }
        }

    },
    save: function (data) {
        let self = this;
        if (!this.checkId(data.id)) {
            return Promise.resolve({
                result: 0,
                data: "重复注册！注册失败",
                reason: "sameId"
            });
        } else {
            return this.checkEcode(data.ecode).then(function (result) {
                // console.log(result)
                if (result) {
                    self.checkEcode(data.ecode, true);
                    delete data.ecode;
                    delete data.isLogin;
                    data.isBoss = false;
                    fs.writeFileSync(path.resolve(__dirname, `../data/user/${data.id}.json`), JSON.stringify(data));
                    // console.log(JSON.stringify(data));
                    return Promise.resolve({
                        result: 1,
                        data: "注册成功！请返回登录"
                    });
                } else {
                    return Promise.resolve({
                        result: 0,
                        data: "邀请码失效！注册失败"
                    });
                }
            }).catch(function (e) {
                // console.log(JSON.stringify(e));
                return Promise.reject({
                    result: 0,
                    data: "服务器错误！请稍后重试"
                });
            });
        }
    }
}

