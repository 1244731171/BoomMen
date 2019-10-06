let fs = require('fs'); // 文件系统模块
let Request = require('request')

let data = [];
let data2 = [];

let writedown = () => {
    let str = "";
    let _url = [];
    // console.log(JSON.stringify(_url));
    fs.open(`./ainfo.txt`, 'w', (err, fd) => {
        if (err) {
        }
        str = data.join("\n") || "";//JSON.stringify(log);
        fs.writeFile(fd, str, (err) => {
            if (err) {
            }
            fs.close(fd, (err) => {
                // console.log('saved');
            });
        });
    });
    fs.open(`./3.html`, 'w', (err, fd) => {
        if (err) {
        }
        str = data2.join("") || "";//JSON.stringify(log);
        fs.writeFile(fd, str, (err) => {
            if (err) {
            }
            fs.close(fd, (err) => {
                // console.log('saved');
            });
        });
    });
}

let url = `https://lms.tokyowins.com/appjsonv1/authUserOpus?app_type=ios&auth_userid=22511&pageindex=3&token=iKjFHCJGSXTHCUeoEyBibufJiRULsluN&type=album&urlencode=false&user_id=95476&version=1`
let rq = (index, id) => {
    console.log(url);
    url =  `https://lms.tokyowins.com/appjsonv1/authUserOpus?app_type=ios&auth_userid=${id}&pageindex=${index}&token=iKjFHCJGSXTHCUeoEyBibufJiRULsluN&type=album&urlencode=false&user_id=95476&version=1`
    Request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        j = body.data;
        if(j.data){
            let e = j.data;
            e.forEach(d => {
                d.opus.forEach(f=>{
                    let p = f.photo.split("?")[0];
                    data.push(p);
                    data2.push('<a href="' + p + '" download="1.jpg"><img src="' + p + '"></a>');
                })
            });
        }
        if(j.PageCount > j.PageIndex){
            rq(j.PageIndex+1,id);
        }else{
            writedown();
        }
    });
}



rq(0, 22511)