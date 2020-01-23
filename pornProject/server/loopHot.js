let fs = require("fs");
let path = require("path");

let loop = () => {
    let arr = JSON.parse(fs.readFileSync(path.resolve("../data/content/hot.json")));
    let arrMap = new Map(arr.map(value => [value.src, value]));
    let imgs = fs.readdirSync(path.resolve("../data/content/img"));
    let video = fs.readdirSync(path.resolve("../data/content/video"));
    imgs.forEach(e => {
        let path = `/img/${e}`;
        if (!arrMap.has(path)) {
            type = e.split(".");
            type = type[type.length - 1];
            arrMap.set(path, {
                "src": `/img/${e}`,
                "type": type,
                "txt": ""
            });
        }
    });
    video.forEach(e => {
        let path = `/video/${e}`;
        if (!arrMap.has(path)) {
            arrMap.set(path, {
                "src": `/video/${e}`,
                "type": "video",
                "txt": ""
            });
        }
    });

    arr = [...arrMap.values()];

    // 是否随机
    // arr.sort(() => Math.random() - Math.random());

    fs.writeFileSync(path.resolve("../data/content/hot.json"), JSON.stringify(arr));
}

loop()