const request = require('request');
const jsdom = require("jsdom");
const fs = require("fs");
const download = require("./download");
const { JSDOM } = jsdom;

let data = {};
let rq = (type, lastId) => {
    let options = {
        url: `http://a.wymh.cc/Mh/api.php?status=0&free_type=${type}&cateids=0&lid=${lastId}`,
        method: 'GET',
        // headers: headers
    };
    // console.log(options.url);
    request(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }else{
            // console.log(body);
            let dom = new JSDOM(body);
            let tagas = dom.window.document.querySelectorAll('a');
            let titles = dom.window.document.querySelectorAll('.title');
            console.log(tagas.length + '  =  ' + titles.length);
        }
        
    });
}

rq(2, 227);
