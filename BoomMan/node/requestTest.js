const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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

// request('https://qingyou.wumacps.com:443/album/reward?id=2672&s=11111111', { json: false }, (err, res, body) => {
//     if (err) { return console.log(err); }
//     console.log(body);
// let id = '1';
// let Burl = 'http://189671.com/d/t/' + id + '.txt';
// let getCurl = (cid) => {
//     return 'http://189671.com/d/d/' + id['substr'](0, 2) + '/' + (id['substr'](- 2) * 1) + '/' + id + '.txt';
// }

// request(Burl, { json: true }, (err, res, body) => {
//     if (err) { return console.log(err); }
//     var data = body[1];
//     console.log(data);
// });

// request.post(
//     {
//         uri: 'http://www.manhuacun.com/Mh/inforedit.html&mhid=692&ji_no=11',
//         form: {},
//         Cookie: ''
//     }, (err, res, body) => {
//         if (err) { return console.log(err); }
//         console.log(res, 11111111111);
//         console.log(body, 22222222);
//     });


// Set the headers for the request
// var headers = {
//     'Content-Type': 'application/json',
//     'User-Agent': ' Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
//     // 'Content-Length': Buffer.byteLength(post_data),
//     'Cookie': 'PHPSESSID=p3nr1fprr7hfk4r0l4ahg8u2b2; UM_distinctid=16b6a463d9444a-0b46708abc4994-3e385a0a-1fa400-16b6a463d952e6; CNZZDATA1277644898=1671604651-1560855448-%7C1560859256; uloginid=7961519809'
// };
// // Configure the request
// var options = {
//     url: 'http://www.aj566.com/wp-content/uploads/2019/09/果哥出品-黑色-女神nina-14分钟白金版.mp4',
//     method: 'GET',
//     headers: headers
// };
// request(options, (err, res, body) => {
//     if (err) { return console.log(err); }
//     console.log(body);
//     // let imgsrc = body.match(/http\:\/\/([a-z]|\.|\_|[0-9]|\/)*.jpg/g);
//     // console.log(JSON.stringify(imgsrc));
//     // var matchUrl = body.match(/\/index([a-z.0-9]|\/|\.)*html/g);
//     // console.log(JSON.stringify(matchUrl));
// });


request(`http://www.aj566.com/wp-content/uploads/2019/09/%E5%A5%B6%E7%BE%8A.mp4`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body);
});