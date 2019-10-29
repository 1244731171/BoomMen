let fs = require('fs'); // 文件系统模块
let Request = require('request')
let readlineSync = require("readline-sync");

let data = [];
let data2 = [];

let writedown = () => {
    let str = "";
    let _url = [];
    let _url2 = [];
    data.forEach(e=>{
        e.data.forEach(f=>{
            _url.push(f.video_url);
            _url2.push(`<img src="${e.img}" vu="${f.video_url}"/>`);
        });
    });
    // console.log(JSON.stringify(_url));
    let org = fs.readFileSync(`./info.txt`)
    fs.open(`./info.txt`, 'w', (err, fd) => {
        if (err) {
        }
        str = org + "\n" + _url.join("\n") || "";//JSON.stringify(log);
        fs.writeFile(fd, str, (err) => {
            if (err) {
            }
            fs.close(fd, (err) => {
                // console.log('saved');
            });
        });
    });
    let temp = JSON.stringify(data2);
    fs.open(`./info.json`, 'w', (err, fd) => {
        if (err) {
        }
        str = temp || "";//JSON.stringify(log);
        fs.writeFile(fd, str, (err) => {
            if (err) {
            }
            fs.close(fd, (err) => {
                // console.log('saved');
            });
        });
    });
    data = [];
}

let writedownAll = () => {
    let str = "";
    let _url2 = [];
    data2.forEach(e=>{
        e.data.forEach(f=>{
            if(f.video_url){
                _url2.push(`<img src="${e.img}" vu="${f.video_url}"/>`);
            }
        });
    });
    let org = fs.readFileSync(`./basemid.html`);
    fs.open(`./infovideo.html`, 'w', (err, fd) => {
        if (err) {
        }
        str = org.toString().replace("{{body}}", _url2.join(""));//JSON.stringify(log);
        // str = str.toString().replace("{{title}}", mname);//JSON.stringify(log);
        fs.writeFile(fd, str, (err) => {
            fs.close(fd, (err) => {});
        });
    });
}


let url = `https://lms.tokyowins.com/appjsonv1/authUserOpus?app_type=ios&auth_userid=22511&pageindex=3&token=iKjFHCJGSXTHCUeoEyBibufJiRULsluN&type=video&urlencode=false&user_id=95476&version=1`
let rq = (index, id) => {
    url =  `https://lms.tokyowins.com/appjsonv1/authUserOpus?auth_userid=${id}&pageindex=${index}&token=iKjFHCJGSXTHCUeoEyBibufJiRULsluN&urlencode=false&user_id=95476&version=1`
    console.log(url);
    Request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        j = body.data;
        if(j.data){
            let e = j.data;
            e.forEach(d => {
                data2.push({
                    "title":d.title,
                    "url":d.h5,
                    "data":d.opus,
                    "img":d.photo
                });
                data.push({
                    "title":d.title,
                    "url":d.h5,
                    "data":d.opus,
                    "img":d.photo
                });
            });
        }
        writedown();
        console.log(j.PageCount +'==='+ j.PageIndex)
        if(j.PageCount > j.PageIndex){
            rq(j.PageIndex+1,id);
        }else{
            writedownAll();
            console.log("done!");
        }
    });
}



let str = readlineSync.question("need output:");
if(str){
    rq(0, str);
}else{
    console.log("null ID!");
    return;
}
