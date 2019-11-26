let fs = require('fs'); // 文件系统模块
let Request = require('request')

let data = [];
let id = 182518;
let mname = "";

let writedown = () => {
    let str = "";
    let _url = [];
    if(!data.length){
        check();
        return;
    }
    data.forEach(e => {
        _url.push(`<img src="${e.i}" vu="${e.v}"/>`);
    });
    // console.log(JSON.stringify(_url));
    let org = fs.readFileSync(`./basemid.html`);
    fs.open(`./mid/mid_${id}.html`, 'w', (err, fd) => {
        if (err) {
        }
        str = org.toString().replace("{{body}}", _url.join(""));//JSON.stringify(log);
        str = str.toString().replace("{{title}}", mname);//JSON.stringify(log);
        fs.writeFile(fd, str, (err) => {
            if (err) {
            }
            fs.close(fd, (err) => {
                console.log(`${id} save!`);
                check();
            });
        });
    });
}

let check = () => {
    data = [];
    mname = "";
    id++;
    rq(0, id);
}

let baseUrl = "https://mvd.fldma.top/back";
let url = `https://hhap.lfjda.top/ym/nc/listModelTrends?mid=26&lastId=0`
let rq = (index, id) => {
    url = `http://hhap.lfjda.top/ym/nc/listModelTrends?mid=${id}&lastId=${index}`
    console.log(url);
    Request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        // console.log(body);
        if (body.code == "200") {
            let j = body.dataObj;
            let e = j.trendsList;
            let lastIndox = j.lastId;
            e.forEach(d => {
                if (d.video_url) {
                    data.push({
                        v: baseUrl + d.video_url,
                        i: baseUrl + d.cover_url
                    });
                    mname = d.model_name;
                }
            });
            if (lastIndox.toString() != "-1") {
                rq(lastIndox, id);
            } else {
                writedown();
            }
        } else {
            writedown();
        }
    });
}
rq(0, id);