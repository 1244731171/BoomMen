const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const request = require("request");

let mainUrl = 'https://www.k886.net/index-comic-name-%E4%B8%8D%E5%80%AB%E9%A7%95%E8%A8%93%E7%8F%AD-id-35958';
let userAgent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36";

request(mainUrl, { json: false }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body);
    // var matchUrl = body.match(/\/index([a-z.0-9]|\/|\.)*html/g);
    let dom = new JSDOM(body);
    let a = dom.window.document.querySelector("#oneCon1").querySelectorAll('a');
    console.log(dom.window.document.querySelector("title").text);
    a.forEach(ele => {
       console.log(ele.href);
    });
});

// const dom = new JSDOM(``, {
//     url: mainUrl,
//     contentType: "text/html",
//     userAgent: userAgent,
//     includeNodeLocations: true
// });

// console.log(dom.window.document.querySelector('div'));