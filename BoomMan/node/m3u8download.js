const request = require('request');
const fs = require('fs');

let Burl = 'https://fsk.saozhibo.com/20190317/668829eb6d5aa3d87e47d57c975f2641/hls/hls-720p.m3u8';
if(!Burl.startsWith('http')){
    Burl = 'http://' + Burl; 
}
let host = Burl.split('/').splice(0,3).join('/');
let path = 'e:/ts/1.ts';
let data = [];
request(Burl, { json: true }, (err, res, body) => {
    // console.log(Burl);
    if (err) { return console.log(err); }
    // var data = body[1];
    let bodys = body.split('\n');
    bodys.forEach(ele => {
        if(ele.indexOf('.jpg') !== -1){
            data.push(host + ele);
        }
    });
    // console.log(body);
    download(data[20], path, ()=>{
        download(data[20], path, ()=>{});
    })
});

let download = (url, path, cb) => {
    console.log(url);
    let writer = fs.createWriteStream(path);
    let reader = request(url);
    writer.on('close', () => {
        console.log('done!');
        cb();
    });
    writer.on('error', err => {
        console.log('error!',err);
    });
    reader.pipe(writer);
    // request(url).pipe(fs.createWriteStream(path))
    // .on('close', function () {
    //     console.log('done!');
    //     cb();
    // });
}
