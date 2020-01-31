let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
// let formidable = require('formidable');
let fs = require('fs');

// let multer = require('multer');

let server = express();
// let readlineSync = require("readline-sync");

let writeHtml = () => {
    let list = fs.readdirSync(path.resolve(__dirname, '../static/dia/data'));
    console.log(JSON.stringify(list))
    let str = "";
    list.forEach(e => {
        if (!e.startsWith("s__") && e !== "1.jpg") {
            str += `<a href="./data/${e}" n="${e}" target="blank" />${e}<img src="${"s__"+e}"><br/>`;
        }
        // str += `<img src="./data/${e}" /><br/>`
    });
    fs.writeFileSync(path.resolve(__dirname, '../static/dia/1.html'), baseHTML.replace("{{body}}", str));
    console.log('write 1.html');
}

module.exports = {
    start() {

        let t = -1;

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
            } finally {
                clearTimeout(t);
                t = setTimeout(writeHtml, 100);
            }


        });

        let startTime = new Date();
        console.log(`${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()} 启动`);
    }
}