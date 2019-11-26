const req = require('./req');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

let base = 'https://www.mfkhm.com';
let url = "https://www.mfkhm.com/book/";
module.exports = {
    get: (id, callback) => {
        req.get({
            url: `${url}${id}`,
            callback: (str, status) => {
                if (status !== "ERROR") {
                    let chapters = str.match(/\/chapter\/\d{1,10}/g) || [];
                    // let name = str.match(/1\>\w{1,100}\</g) || [];
                    let body = new JSDOM(str);
                    let name = body.window.document.querySelector("h1").innerHTML;
                    name = name.replace(/\/|\||\\|\"|\<|\>|\*|\?|\:/g,"");
                    let output = chapters.map(e => {
                        return base + e;
                    });
                    let _output = [];
                    output.forEach(ele => {
                        if(_output.indexOf(ele) == -1){
                            _output.push(ele);
                        }
                    });
                    callback({
                        name: name,
                        chapters: _output
                    });
                    // console.log(name);
                    // console.log(output.join("\n"));
                } else {
                    callback([]);
                    console.log("book => chapter, ERROR!");
                }
            }
        });
    }
}