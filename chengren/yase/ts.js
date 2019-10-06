let fs = require('fs'); // 文件系统模块

var url = `https://dan1.yyhdyl.com/20190809/858ecc58343eca1823e7fa2f50116b9f/hls/hls-720p46.jpg`;
// var url = `https://dan1.yyhdyl.com/20190811/f999a4f67e10b3b0e77a9ad953fd3927/hls/hls-720p1060.jpg`;
// var url = `https://shuang2.yyhdyl.com/20190510/b811bc490a0efb217f4a7484f34cebb1/hls/hls-720p186.jpg`;
// var url = `https://dan1.yyhdyl.com/20190811/bc13dab7522bf588741a30ba4e16edfe/hls/hls-720p52.jpg`; 
// var url = `https://dan1.yyhdyl.com/20190811/8716470e113c9b970df2f676d86dd9a4/hls/hls-720p92.jpg`;
// var url = `https://shuang2.yyhdyl.com/20190822/6f4c3b8fe3e3f7787f958b20bfae1b8a/hls/hls-720p104.jpg`;
// var url = `https://shuang2.yyhdyl.com/20190826/039228c61868571dabae4c2fa749c15a/hls/hls-720p123.jpg`;
// var url = `https://shuang2.yyhdyl.com/20181228/1be419b9bdc135b1b68b89f5387123b9/hls/hls-720p83.jpg`;
// var url = `https://shuang2.yyhdyl.com/20190816/7f4a2a006a7bae6e4d0a4a9774829e4d/hls/hls-720p126.jpg`;
// var url = `https://dan1.yyhdyl.com/20190107/7b084230b6613e3f47720e7da7eaa42a/hls/hls-480p120.jpg`;
// var url = `https://shuang2.yyhdyl.com/20181218/f0c34f5ebc8dc602e6a0f2869225b3ec/hls/hls-720p92.jpg`;
// var url = `https://shuang2.yyhdyl.com/20190730/2da237a7119cc5bc2df7909503accc60/hls/hls-720p38.jpg`;
// var url = `https://dan1.yyhdyl.com/20190811/aa838878e0032361c4f87ec184acbd7b/hls/hls-480p126.jpg`;
// var url = `https://shuang2.yyhdyl.com/20181230/43115fd628c74547f755b580d8de4d27/hls/hls-720p26.jpg`;
// var url = `https://shuang2.yyhdyl.com/20181218/c48f7380a2e78f56ef5a39957e0e44ea/hls/hls-720p78.jpg`;
// var url = `https://shuang2.yyhdyl.com/20190914/3174bbf109d7cb8067c1839347081c35/hls/hls-720p290.jpg`;
// var url = `https://shuang2.yyhdyl.com/20190914/3ea2df41f86b89d309332b9eea454fbf/hls/hls-720p246.jpg`;
// var url = `https://dan1.yyhdyl.com/20190825/988ddce72e4e936106faeb32384f3e0a/hls/hls-720p167.jpg`;
// var url = `https://dan1.yyhdyl.com/20181011/56daa2c12a899665d7796741d10f7145/hls/hls-720p18.jpg`;

url = url.replace(".jpg", "");
let index = url.length - 1;
while(url.charAt(index) !== "p"){
    --index;
}
let max = parseInt(url.substr(index - url.length + 1));
let base = url.substr(0, index + 1);
let data = [];

while(max >= 0){
    data.push(base + max + ".jpg");
    max--;
}

fs.open(`./nts.txt`, 'w', (err, fd) => {
    if (err) {
    }
    let str = data.join("\n");
    fs.writeFile(fd, str, (err) => {
        if (err) {
        }
        fs.close(fd, (err) => {
        });
    });
});