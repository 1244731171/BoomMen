let fs = require("fs");
module.exports = (str) => {
    fs.appendFileSync(`./log.log`, str + "\n");
}