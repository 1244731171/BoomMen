const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// https://github.com/jsdom/jsdom
// https://www.npmjs.com/package/jsdom

request('http://www.hanman.co/index/chapters/index/id/645.html', { json: false }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body);
    // const dom = new JSDOM(body);
    // console.log(dom.window.document.querySelector("body")); 
    const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    // console.log(dom.window.document.querySelector("p").textContent); // "Hello world"
});