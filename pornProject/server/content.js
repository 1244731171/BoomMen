const fs = require("fs");
const path = require("path");

let lessonData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/content/lesson.json")));

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
        let arr = [];
        for (let key in lessonData) {
            arr.push(key);
        }
        return arr.reverse();
    },
    getLesson(name, index = 1, step = 5, isBoss = false) {
        let arr = [];
        let content = lessonData[name];
        for (let key in content) {
            arr.push(content[key]);
        }
        let list = arr.slice((index - 1) * step, index * step);
        return {
            list: list,
            index: index,
            step: step,
            length: Math.ceil(arr.length / step)
        };
    },
    getHot(index = 1, step = 5, isBoss = false) {
        if (index < 1) {
            index = 1;
        }
        console.log(index);
        return new Promise(function(resolve, reject) {
            let data = fs.readFileSync(path.resolve(__dirname, "../data/content/hot.json"));
            data = JSON.parse(data);
            // console.log(JSON.stringify(data))
            let list = data.slice((index - 1) * step, index * step);
            // console.log(JSON.stringify(list))
            // console.log(data.slice((index - 1) * step, step));
            resolve({
                list: list,
                index: index,
                step: step,
                length: Math.ceil(data.length / step)
            });
        });
    },
    getNew(isBoss = false) {

    },
    updateLessonInfo() {
        lessonData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/content/lesson.json")));
    }
}