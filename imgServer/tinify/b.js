let tinify = require('tinify');
let fs = require('fs')
let path = require('path')

tinify.key = "R6gxfzz08ZhLyQccf42Qf2NqyHwP73d6"

let name = 'upload_3ca6f97a6045e452f7911ae5e8f08faa.png'

// fs.renameSync(path.resolve(__dirname, `.tinify/${name}`), path.resolve(__dirname, `.tinify/o_${name}`))

let ti = (p1, p2) => {
    tinify.fromFile(p1).resize({
        method: "scale",
        width: 300
    }).toFile(p2);
}


module.exports = {
    start: () => {
        ti(path.resolve(__dirname, `./${name}`), path.resolve(__dirname, `./s__${name}`))
    }
}