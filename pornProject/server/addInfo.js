const fs = require('fs');
const path = require('path');

let fileList = fs.readdirSync(path.resolve(__dirname, "../data/content/temp"));
let lessons = {};
if (fs.existsSync(path.resolve(__dirname, `../data/content/lesson.json`))) {
    lessons = JSON.parse(fs.readFileSync(path.resolve(__dirname, `../data/content/lesson.json`)));
}
let lessonName = new Map();

for (var key in lessons) {
    lessonName.set(key, 1)
}


module.exports = {
    next() {
        if (fileList.length == 0) {
            return {
                path: "",
                name: ""
            }
        }
        let name = fileList.shift();
        return {
            path: `/temp/${name}`,
            name: name,
            lessons: [...lessonName.keys()]
        };
    },
    save(info) {
        let { name, tags, lesson, txt } = info;
        lessons[lesson] = lessons[lesson] || {};
        lessons[lesson][name] = {
            name: name,
            tags: tags,
            txt: txt,
            src: `/img/${name}`,
            type: "gif"
        };
        lessonName.set(lesson, 1);
        fs.writeFileSync(path.resolve(__dirname, `../data/content/lesson.json`), JSON.stringify(lessons));

        fs.renameSync(path.resolve(__dirname, `../data/content/temp/${name}`), path.resolve(__dirname, `../data/content/img/${name}`))
        return "good";
    }
}