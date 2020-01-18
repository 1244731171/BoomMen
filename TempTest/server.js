let express = require('express');
let bodyParser = require('body-parser');
let server = express();

server.listen(8100);
server.use(bodyParser.urlencoded({extended:false}));
server.use('/', express.static('./BoomMen/TempTest'));
let startTime = new Date();
console.log(`${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()} 启动`);