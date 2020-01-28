let fs = require("fs");
let path = require("path");

let keys = "ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwyz0123456789".split("");

let getKey = (len) => {
    let key = [];
    while (key.length < len) {
        key.push(keys[parseInt(Math.random() * keys.length)])
    }
    return key.join("");
}

module.exports = {
    linkFile(fileName, userId) {
        console.log(`linkFile: userId(${userId}), fileName(${fileName})`);
        let data = [];
        try {
            data = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../data/self/${userId}.json`)));
        } catch (error) {
            this.createInfo(userId);
        }
        let type = "img";
        if (fileName.toLocaleUpperCase().match(".MOV|.MP4")) {
            type = "video";
        }
        data.push({
            src: `../self/${fileName}`,
            fileName: fileName,
            isActive: false,
            shareKey: getKey(4),
            isPublic: false,
            type: type,
            title: "",
            tag: []
        });
        fs.writeFileSync(path.resolve(__dirname, `../data/self/${userId}.json`), JSON.stringify(data));
    },
    activeLink(body) {
        let { userId, fileName, tag, title, isPublic } = body;
        console.log(`activeLink: userId(${userId}), fileName(${fileName})`);
        let data = [];
        try {
            data = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../data/self/${userId}.json`)));
        } catch (error) {
            this.createInfo(userId);
        }
        data.some(function(info) {
            if (info.fileName === fileName) {
                info.isActive = true;
                info.tag = tag;
                info.title = title;
                info.isPublic = isPublic;
                return true;
            } else {
                return false;
            }
        });
        fs.writeFileSync(path.resolve(__dirname, `../data/self/${userId}.json`), JSON.stringify(data));
    },
    passiveLink(body) {
        let { userId, fileName } = body;
        let data = [];
        try {
            data = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../data/self/${userId}.json`)));
        } catch (error) {
            this.createInfo(userId);
        }
        data.some(function(info) {
            // console.log(JSON.stringify(info))
            // console.log(JSON.stringify(body))
            if (info.fileName === fileName) {
                info.isActive = false;
                return true;
            } else {
                return false;
            }
        });
        fs.writeFileSync(path.resolve(__dirname, `../data/self/${userId}.json`), JSON.stringify(data));
    },
    getList(userId, index = 1, step = 5, isBoss = false) {
        let data = [];
        try {
            data = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../data/self/${userId}.json`)));
        } catch (error) {
            console.log(error);
            this.createInfo(userId);
        }
        let arr = [];
        if (isBoss) {
            arr = data;
        } else {
            arr = data.filter(function(i) {
                delete i.isPublic;
                delete i.shareKey;
                return i.isActive;
            });
        }
        return {
            list: arr.slice((index - 1) * step, index * step),
            index: index,
            step: step,
            length: Math.ceil(arr.length / step)
        };
    },
    createInfo(userId) {
        try {
            fs.writeFileSync(path.resolve(__dirname, `../data/self/${userId}.json`), "[]");
        } catch (error) {
            console.log('create user zipai list error! ' + error);
        }
    },
    sort(userId, isBoss = false) {
        let list = fs.readdirSync(path.resolve(__dirname, `../data/self/`));
        let arr = [];
        list.forEach(e => {
            if (e.endsWith(".json")) {
                let data = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../data/self/${e}`)));
                let nub = 0;
                if (isBoss) {
                    nub = data.length;
                } else {
                    nub = data.filter(function(i) {
                        return i.isActive;
                    }).length;
                }
                let id = e.replace(".json", "")
                arr.push({
                    id: id,
                    isTarget: id === userId,
                    length: nub
                });
            }
        });

        arr.sort((a, b) => { return b.length - a.length });

        return arr;
    }
}