
let fs = require('fs');


// 图片转base64
let img_bitmap = fs.readFileSync(`e:/mine/dia/1.jpg`);
let img_base64 = Buffer.from(img_bitmap, 'binary').toString('base64'); // base64编码
