let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let formidable = require('formidable');
let fs = require('fs');

let multer = require('multer');

let server = express();
let readlineSync = require("readline-sync");

let writeHtml = () => {
    let list = fs.readdirSync(path.resolve(__dirname, '../static/dia/data'));
    console.log(JSON.stringify(list))
    let str = "";
    list.forEach(e => {
        // str += `<img src="./data/${e}" /><br/>`
        str += `<a href="./data/${e}" target="blank" /><br/>`
    });
    fs.writeFileSync(path.resolve(__dirname, '../static/dia/1.html'), str);
    console.log('write html 1')
}

module.exports = {
    start() {
        server.listen(8101);
        server.use(bodyParser.urlencoded({ extended: false }));
        server.use(express.json())

        server.use('/delete', function(req, res) {
            console.log('/delete' + JSON.stringify(req.query.id));
            try {
                fs.unlinkSync(path.resolve(__dirname, `../static/dia/data/${req.query.id}`))
                res.send("ok")
            } catch (error) {
                res.send(error)
            }
        });

        let startTime = new Date();
        console.log(`${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()} 启动`);
    }
}