//依赖模块
const fs = require('fs');
const request = require("request");
const mkdirp = require('mkdirp');

let index = 0;
let path = "./欲求王";
let rootUrl = 'http://www.hanman.co';
let datas = ["/index/chapters/index/id/1016.html", "/index/chapters/index/id/1017.html", "/index/chapters/index/id/1018.html", "/index/chapters/index/id/1019.html", "/index/chapters/index/id/1020.html", "/index/chapters/index/id/1021.html", "/index/chapters/index/id/1022.html", "/index/chapters/index/id/1023.html", "/index/chapters/index/id/1024.html", "/index/chapters/index/id/1025.html", "/index/chapters/index/id/1026.html", "/index/chapters/index/id/1027.html", "/index/chapters/index/id/1028.html", "/index/chapters/index/id/1029.html", "/index/chapters/index/id/1030.html", "/index/chapters/index/id/1031.html", "/index/chapters/index/id/1032.html", "/index/chapters/index/id/1033.html", "/index/chapters/index/id/1034.html", "/index/chapters/index/id/1035.html", "/index/chapters/index/id/1036.html", "/index/chapters/index/id/1037.html", "/index/chapters/index/id/1038.html", "/index/chapters/index/id/1039.html", "/index/chapters/index/id/1040.html", "/index/chapters/index/id/1041.html", "/index/chapters/index/id/1042.html", "/index/chapters/index/id/1043.html", "/index/chapters/index/id/1044.html", "/index/chapters/index/id/1045.html", "/index/chapters/index/id/1046.html", "/index/chapters/index/id/1047.html", "/index/chapters/index/id/1048.html", "/index/chapters/index/id/1049.html", "/index/chapters/index/id/1050.html", "/index/chapters/index/id/1051.html", "/index/chapters/index/id/1052.html", "/index/chapters/index/id/1053.html", "/index/chapters/index/id/1054.html", "/index/chapters/index/id/1055.html", "/index/chapters/index/id/1056.html", "/index/chapters/index/id/1057.html", "/index/chapters/index/id/1059.html", "/index/chapters/index/id/1060.html", "/index/chapters/index/id/1061.html", "/index/chapters/index/id/1062.html", "/index/chapters/index/id/1063.html", "/index/chapters/index/id/1065.html", "/index/chapters/index/id/1066.html", "/index/chapters/index/id/1067.html", "/index/chapters/index/id/1068.html", "/index/chapters/index/id/1069.html", "/index/chapters/index/id/1070.html", "/index/chapters/index/id/1071.html", "/index/chapters/index/id/1072.html", "/index/chapters/index/id/1073.html", "/index/chapters/index/id/1074.html", "/index/chapters/index/id/1075.html", "/index/chapters/index/id/1076.html", "/index/chapters/index/id/1077.html", "/index/chapters/index/id/1078.html", "/index/chapters/index/id/1079.html", "/index/chapters/index/id/1080.html", "/index/chapters/index/id/1081.html", "/index/chapters/index/id/1082.html", "/index/chapters/index/id/1083.html", "/index/chapters/index/id/1084.html", "/index/chapters/index/id/1085.html", "/index/chapters/index/id/1086.html", "/index/chapters/index/id/1087.html", "/index/chapters/index/id/1088.html", "/index/chapters/index/id/1089.html", "/index/chapters/index/id/1090.html", "/index/chapters/index/id/1091.html", "/index/chapters/index/id/1092.html", "/index/chapters/index/id/1093.html", "/index/chapters/index/id/1094.html", "/index/chapters/index/id/1095.html", "/index/chapters/index/id/1096.html", "/index/chapters/index/id/1097.html", "/index/chapters/index/id/1098.html", "/index/chapters/index/id/1099.html", "/index/chapters/index/id/1100.html", "/index/chapters/index/id/1101.html"];
let info = [];

//创建目录
let makeDir = (path) => {
    mkdirp(path, err => {
        if (err) {
            console.log(err);
        }
    });
}

let loopNextPage = () => {
    let url;
    if (datas.length > 0) {
        url = datas.splice(0, 1)[0];
        index++;
        getImage(rootUrl + url);
    }else{
        loopEnd();
    }
}

let getImage = (url) => {
    request(url, { json: false }, (err, res, body) => {
        if (err) {
            console.log("error! " + url + ", " + index);
            console.log(err);
            loopEnd();
            return;
        }
        var matchUrl = body.match(/http\:\/\/([a-z]|\.|[0-9]|\/)*.jpg/g);
        console.log(index + "： " + url + ">>>" + JSON.stringify(matchUrl));
        info.push({
            index: index,
            url: url,
            data: matchUrl
        });
        loopNextPage();
    });
}

let loopEnd = () => {
    let str = JSON.stringify(info);

    fs.open((path + '/' + new Date().getTime() + 'data.json'), 'w', (err, fd) => {
        if (err) {
            console.log(err);
        }
        console.log(fd);
        fs.writeFile(fd, str, (err) => {
            if (err) {
                console.log(err);
            }
            fs.close(fd, (err) => {
                console.log(err ? err : 'success!');
            });
        });
    });
}

makeDir(path);

loopNextPage();