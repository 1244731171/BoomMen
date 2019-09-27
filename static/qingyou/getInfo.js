let fs = require('fs'); // 文件系统模块
let Request = require('request')

let data = [];
let data2 = [];

let writedown = () => {
    let str = "";
    let _url = [];
    data.forEach(e=>{
        e.data.forEach(f=>{
            _url.push(f.video_url);
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

let url = `https://lms.tokyowins.com/appjsonv1/authUserOpus?app_type=ios&auth_userid=22511&pageindex=3&token=iKjFHCJGSXTHCUeoEyBibufJiRULsluN&type=video&urlencode=false&user_id=95476&version=1`
let rq = (index, id) => {
    console.log(url);
    url =  `https://lms.tokyowins.com/appjsonv1/authUserOpus?app_type=ios&auth_userid=${id}&pageindex=${index}&token=iKjFHCJGSXTHCUeoEyBibufJiRULsluN&type=video&urlencode=false&user_id=95476&version=1`
    Request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        j = body.data;
        if(j.data){
            let e = j.data;
            e.forEach(d => {
                data2.push({
                    "title":d.title,
                    "url":d.h5,
                    "data":d.opus
                });
                data.push({
                    "title":d.title,
                    "url":d.h5,
                    "data":d.opus
                });
            });
        }
        writedown();
        console.log(j.PageCount +'==='+ j.PageIndex)
        if(j.PageCount > j.PageIndex){
            rq(j.PageIndex+1,id);
        }
    });
}



rq(0, 22511)