//依赖模块
const logger = require("./log");
const PDF = require('pdfkit');
const fs = require('fs');
const gm = require('gm');

let list = [];

let isDoing = false;
let len = 0;
let timer = -1;
let check = () => {
    if (list.length) {
        // if (!isDoing) {
        if (len < 5) {
            let info = list.splice(0, 1)[0];
            create(info.imagePath, info.pdfPath);
        } else {
            clearTimeout(timer);
            timer = setTimeout(check, 100);
        }
    }
}
let create = (imagePath, pdfPath) => {
    isDoing = true;
    len++;
    logger.log('__JPG2PDF__: try to create PDF, image path >>> %s, pdf path >>> %s', imagePath, pdfPath)
    if (fs.existsSync(pdfPath)) {
        logger.log('__JPG2PDF__: PDF is EXISTED!');
        isDoing = false;
        len--;
        check();
        return;
    }
    gm(imagePath).size((err, size) => {
        if (!err) {
            let h = size.height;
            let w = size.width;
            let writer = fs.createWriteStream(pdfPath);

            let pdf = new PDF({
                autoFirstPage: false
            });

            pdf.pipe(writer);

            pdf.addPage({
                size: [w, h],
            }).image(imagePath, 0, 0, {
                width: w,
                height: h
            });

            pdf.on('end', () => {
                logger.log('__JPG2PDF__: SUCCESSFUL!');
                isDoing = false;
                len--;
                check();
            });

            pdf.end();
        } else {
            logger.log('__JPG2PDF__: ERROR! >>> ', err);
        }
    });
}
module.exports = {
    add: (imagePath, pdfPath) => {
        list.push({
            imagePath: imagePath,
            pdfPath: pdfPath
        });
        check();
    },
    isFinish: () => {
        return !list.length && !len
    }
}