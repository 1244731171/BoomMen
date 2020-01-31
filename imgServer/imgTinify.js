let tinify = require('tinify');
let fs = require('fs')
let path = require('path')

let _server = {};
let p = path.resolve(__dirname, './1.txt');

tinify.key = "R6gxfzz08ZhLyQccf42Qf2NqyHwP73d6"

let tini = () => {
    console.log("check!!!")
    if (fs.existsSync(p)) {
        console.log("tinify!!!")
        let list = [...fs.readdirSync(path.resolve(__dirname, `../static/dia/data/`))];
        list.forEach(f => {
            if (!f.startsWith("s__") && f !== "1.jpg" && !fs.existsSync(path.resolve(__dirname, `../static/dia/data/s__${f}`))) {

                tinify.fromFile(path.resolve(__dirname, `../static/dia/data/${f}`)).resize({
                    method: "scale",
                    width: 300
                }).toFile(path.resolve(__dirname, `../static/dia/data/s__${f}`));
            }
        });
        fs.unlinkSync(p);
    }
    setTimeout(tini, 1000);
}


module.exports = function() {
    tini();
}