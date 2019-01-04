const fs = require('fs');
let str = fs.readFileSync('./1.json', 'utf8');
// bufferOriginal.toString('utf8')
console.log(str)