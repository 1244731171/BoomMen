let fs = require('fs'); // 文件系统模块
let Request = require('request')

let basePath = "./img";
let dir = fs.readdirSync(basePath);
let obj = {};
dir.forEach(e=>{
    let name = e;
    obj[name] = [];
    fs.readdirSync(basePath+"/"+name).forEach(f=>{
        obj[name].push(f.replace(".html", ""));
    });
});

console.log(JSON.stringify(obj));