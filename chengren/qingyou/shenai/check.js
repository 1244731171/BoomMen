let fs = require('fs'); // 文件系统模块
let Request = require('request')

let data = [];
let id = 1793;
let url = `http://www.adeeplove.me/photo_show.aspx?id=1601`;

let writedown = (str = "") => {
    // if (!data.length) {
    //     return;
    // }
    // data.forEach(e=>{
    //     str += `\n title: ${e.t}`;
    //     str += `\n url: http://${e.u}`;
    //     str += `\n code: ${e.k}`;
    // });
    // console.log(JSON.stringify(_url));
    // fs.open(`./baidu.txt`, 'w', (err, fd) => {
    //     if (err) {
    //     }
    //     // fs.writeFile(fd, str, (err) => {
    //     //     if (err) {
    //     //     }
    //     //     fs.close(fd, (err) => {
    //     //         console.log(`${id} save!`);
    //     //         check();
    //     //     });
    //     // });
    // });
    str = str.replace("<title>", "");
    str = str.replace("</title>", "");
    str = str.replace("提取码：", "");
    fs.appendFile(`./baidu.txt`, str, (err) => {
        console.log(err);
        // fs.close(`./baidu.txt`,  (err) => {
        //     console.log(err);
        // });
    })
}
let check = () => {
    if(id> 0){
        rq(--id)
    }
}

let rq = (id) => {
    url = `http://www.adeeplove.me/photo_show.aspx?id=${id}`
    console.log(url);
    Request(url, { json: true }, (err, res, body) => {
        if (err) { 
            checks();
            return console.log(err); 
        }
        if(res.statusCode == "404"){
            check();
            return;
        }
        // data.push({
        //     u: (body.match(/pan\.baidu\.com\/s\/([0-9a-zA-z_-]){10,30}/g) || [])[0],
        //     k: (body.match(/提取码：([0-9a-zA-Z]{4})/g) || [])[0],
        //     t: (body.match(/\<title\>[\s\S]*?\<\/title\>/g) || [])[0],
        // });
        let str = "";
        str += `url: https://${(body.match(/pan\.baidu\.com\/s\/([0-9a-zA-z_-]){10,30}/g) || [])[0]} \n`;
        str += `code: ${(body.match(/提取码：([0-9a-zA-Z]{4})/g) || [])[0]} \n`;
        str += `title: ${(body.match(/\<title\>[\s\S]*?\<\/title\>/g) || [])[0]} \n\n\n`;
        writedown(str);
        check();
    });
}
rq(id);