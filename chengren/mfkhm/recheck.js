const fs = require("fs");
const download = require('./download');

let out = fs.readdirSync("./output/");

let check = (json) => {
    let chapters = json.chapters;
    let path, images;
    chapters.forEach(info => {
        path = info.path;
        images = info.images;
        let is = fs.readdirSync(path);
        if(is.length != images.length){
            console.log(path);
            deepCheck(path, images)
        }
    });
};

let deepCheck = (path, images) => {
    let len = images.length;
    let p;
    for(let i = 1; i <= len; i++){
        p = path + i + ".jpg";
        if(!fs.existsSync(p)){
            console.log(`${images[i-1]} => ${p}`);
            download.add(images[i-1], p);
        }
    }
};

out.forEach(e => {
    check(JSON.parse(fs.readFileSync("./output/" + e, "utf-8")));
});

