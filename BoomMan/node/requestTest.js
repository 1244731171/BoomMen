const request = require('request');
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// https://github.com/jsdom/jsdom
// https://www.npmjs.com/package/jsdom

// request('http://www.hanman.co/index/chapters/index/id/645.html', { json: false }, (err, res, body) => {
//     if (err) { return console.log(err); }
//     var matchUrl = body.match(/http\:\/\/([a-z]|\.|[0-9]|\/)*.jpg/g);
//     console.log(JSON.stringify(matchUrl));
// });

// request('http://www.hanman.co/index/books/index/id/24.html', { json: false }, (err, res, body) => {
//     if (err) { return console.log(err); }
//     console.log(body);
//     var matchUrl = body.match(/\/index([a-z.0-9]|\/|\.)*html/g);
//     console.log(JSON.stringify(matchUrl));
// });

// https://www.npmjs.com/package/request

request('https://qingyou.wumacps.com:443/album/reward?id=2672&s=11111111', { json: false }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body);
});
// request.post({uri:'http://s6e.yaaja.com/album/reward', form: {id:'2672',s:'sssssssssssssss'}},(err, res, body) => {
//     if (err) { return console.log(err); }
//     console.log(res,11111111111);
//     console.log(body,22222222);
// });