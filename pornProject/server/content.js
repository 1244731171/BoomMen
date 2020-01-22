const fs = require("fs");
const path = require("path");

module.exports = {
    getList(id, type, isBoss = false) {
        return {
            length: 100,
            index: 1,
            data: []
        }
    },
    getTags(isBoss = false) {

    },
    getLessons(isBoss = false) {
        return {
            length: 100,
            index: 1,
            data: []
        }
    },
    getHot(index = 1, step = 5, isBoss = false) {
        if (index < 1) {
            index = 1;
        }
        console.log(index);
        return new Promise(function(resolve, reject) {
            let data = fs.readFileSync(path.resolve(__dirname, "../data/content/hot.json"));
            data = JSON.parse(data);
            let list = data.slice((index - 1) * step, index * step);
            console.log(JSON.stringify(list))
                // console.log(data.slice((index - 1) * step, step));
            resolve({
                list: list,
                index: index,
                step: step,
                length: parseInt(data.length / step)
            });
        });
    },
    getNew(isBoss = false) {

    }
}