let tinify = require('tinify');
let fs = require('fs')
let path = require('path')

tinify.key = "R6gxfzz08ZhLyQccf42Qf2NqyHwP73d6"

let name = '1580479253423.png'

fs.renameSync(path.resolve(__dirname, `../static/dia/data/${name}`), path.resolve(__dirname, `../static/dia/data/o_${name}`))
var source = tinify.fromFile(path.resolve(__dirname, `../static/dia/data/o_${name}`));
var resized = source.resize({
    method: "scale",
    width: 300
});
resized.toFile(path.resolve(__dirname, `../static/dia/data/s__${name}`));