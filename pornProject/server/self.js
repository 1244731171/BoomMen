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
        let data = [];
        try {
            data = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../data/self/${userId}.json`)));
        } catch (error) {
            this.createInfo(userId);
        }
        data.push({
            path: `../self/${fileName}`,
            fileName: fileName,
            isActive: false,
            shareKey: getKey(4),
            isPublic: false,
            title: "",
            tag: []
        });
    },
    activeLink(body) {
        let { userId, fileName, tag, title, isPublic } = body;
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
    },
    passiveLink(fileName, userId) {
        let data = [];
        try {
            data = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../data/self/${userId}.json`)));
        } catch (error) {
            this.createInfo(userId);
        }
        data.some(function(info) {
            if (info.fileName === fileName) {
                info.isActive = false;
                return true;
            } else {
                return false;
            }
        });
    },
    getList(userId, index = 0, step = 10, isBoss = false) {
        let data = [];
        try {
            data = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../data/self/${userId}.json`)));
        } catch (error) {
            this.createInfo(userId);
        }
        if (isBoss) {
            return data;
        }
        let arr = data.filter(function(i) {
            return i.isActive;
        });
        return {
            data: arr.slice(index * step, step),
            index: index,
            length: arr.length
        };
    },
    createInfo(userId) {
        try {
            fs.writeFile(path.resolve(__dirname, `../data/self/${userId}.json`), "[]");
        } catch (error) {
            console.log('create user zipai list error! ' + error);
        }
    }
}