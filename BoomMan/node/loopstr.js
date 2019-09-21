let fs = require("fs");

let writedown = (name, str) => {
    fs.open(`${name}`, 'w', (err, fd) => {
        if (err) {
        }
        str = str || log;//JSON.stringify(log);
        fs.writeFile(fd, str, (err) => {
            if (err) {
            }
            fs.close(fd, (err) => {
                // console.log('saved');
            });
        });
    });
}

let src = "https://tou22.yyhdyl.com/20190908/5cf3de74e5e038b1b241620f3d8f7169/hls/hls-480p380.jpg";
let arr = [];
let max = 0;
if (/hls\-480p/.test(src)) {
    src = src.split("hls-480p");
    max = parseInt(src[1].replace(".jpg", "")) + 1;
    while (max--) {
        arr.push(src[0] + "hls-480p" + max + ".jpg");
    }
} else if (/hls\-720p/.test(src)) {
    src = src.split("hls-720p");
    max = parseInt(src[1].replace(".jpg", "")) + 1;
    while (max--) {
        arr.push(src[0] + "hls-720p" + max + ".jpg");
    }
} else if (/hls\-1080p/.test(src)) {
    src = src.split("hls-1080p");
    max = parseInt(src[1].replace(".jpg", "")) + 1;
    while (max--) {
        arr.push(src[0] + "hls-1080p" + max + ".jpg");
    }
} else if (/hls\-360p/.test(src)) {
    src = src.split("hls-360p");
    max = parseInt(src[1].replace(".jpg", "")) + 1;
    while (max--) {
        arr.push(src[0] + "hls-360p" + max + ".jpg");
    }
}

writedown("loop.txt", arr.join("\n"));