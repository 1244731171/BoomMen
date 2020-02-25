const req = require('./req');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let base = 'https://www.mfkhm.com';
module.exports = {
    get: (url, callback) => {
        req.get({
            url: url,
            type: 'mobile',
            callback: (str, status) => {
                if (status !== "ERROR") {
                    let body = new JSDOM(str);
                    let images = body.window.document.querySelectorAll("img[data-original]");
                    let name = body.window.document.querySelector(".view-fix-top-bar-title").innerHTML;
                    name = name.replace(/\/|\||\\|\"|\<|\>|\*|\?|\:/g, "");
                    let output = [];
                    images.forEach((dom) => {
                        let _url = dom.getAttribute('data-original');
                        let style = dom.getAttribute("style") || "";
                        // console.log(`style ==> ${style}`);
                        if (style.indexOf("display:none") == -1 && _url.endsWith(".jpg")) {
                            output.push(_url);
                        }
                    });
                    callback({
                        images: output,
                        name: name
                    });
                } else {
                    console.log("ERROR");
                }
            }
        });
    }
}