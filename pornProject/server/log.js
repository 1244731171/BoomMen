let fs = require("fs");
let path = require("path");

let logFilePath = path.resolve(__dirname, "../../static/log/p/log.html");

let appendStr = "";

let debounce = (func, time) => {
    let t = -1;
    return function() {
        clearTimeout(t);
        let self = this;
        let args = arguments;
        t = setTimeout(() => {
            func.apply(self, args);
        }, time);
    };
}

module.exports = function(str) {
    appendStr += `<br><span>${str}</span>`
    debounce(function() {
        fs.appendFileSync(logFilePath, appendStr);
        appendStr = "";
    }, 1000);
}