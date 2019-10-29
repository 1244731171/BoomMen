
let fs = require('fs'); // 文件系统模块
let Request = require('request')

let data = [];
let url = `http://www.adeeplove.me/photo_show.aspx?id=1601`;

let getUrl = (index) => {
    return `https://edge169.stream.highwebmedia.com/live-hls/amlst:krissmoon-sd-fc305575989630ee3db22de3a425d3e7e848c450e59556373df00670a68f3865_trns_h264/media_w719135003_b3096000_t64RlBTOjMwLjA=_${index}.ts`;
}

let writedown = (str = "",index) => {
    fs.open(`./d/${index}.ts`, 'w', (err, fd) => {
        if (err) {
        }
        fs.writeFile(fd, str, (err) => {
            if (err) {
            }
            fs.close(fd, (err) => {
                console.log(`${index} save!`);
                check();
            });
        });
    });
}
let check = (flag) => {
    return
    if(flag){
        rq(index);
    }else{
        setTimeout(()=>{
            rq(index);
        },1000);
    }
}

let rq = () => {
    url = getUrl(index);
    url = "https://www.800-cdn.com/20190925/6cnu5hFc/720kb/hls/MM5q5071006.ts";
    console.log(url);
    Request(url, { json: true }, (err, res, body) => {
        // console.log(body);
        if(!err && res.statusCode == 200 && body){
            writedown(new Buffer(body),index);
            index++;
            return
            check(1);
        }else{
            check();
        }
    });
}
let index = 6750;
rq();

// copy/b  E:\workspace\Boom\BoomMen\static\qingyou\zhibo\d\*.ts  E:\workspace\Boom\BoomMen\static\qingyou\zhibo\new7.ts