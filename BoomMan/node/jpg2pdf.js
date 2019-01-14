const PDF = require('pdfkit');
const fs = require('fs');
const gm = require('gm');

const pdf = new PDF({
    autoFirstPage: false
});

let writer = fs.createWriteStream('./1.pdf');

let h, w;
gm('./10_2.jpg').size((err, size) => {
    if (!err) {
        h = size.height/3;
        w = size.width/3;
        cb();
    } else {
        console.log(err);
    }
});

let cb = () => {
    console.log('w(%s),h(%s)', w, h);

    pdf.pipe(writer);

    pdf.addPage({
        size: [w, h],
    }).image('./10_2.jpg', 0, 0, {
        width: w,
        height: h
    });

    pdf.on('end',(err)=>{console.log(11111111111111)});

    pdf.end();
}