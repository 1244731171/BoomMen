const fs = require('fs');

// const PATH = 'E:/soft/yundown/yundown/download/';
// const PATH = 'Q:/好孩子看不到/国内写真/（萝莉）柚木写真/[柚木]红白调教(50P)_files/'
// const PATH = 'O:/新建文件夹/新建文件夹/'
const PATH = 'E:/迅雷下载/灌篮高手 超清版（建议支持至少300ppi的设备看）/';

fs.readdir(PATH, (err, path)=>{
    path.forEach(ele => {
        if(ele.indexOf('part') !== -1){
            let eles = ele.split('_');
            console.log(ele);
            if(eles.length>=2){
                console.log(PATH+eles[0]+'.rar');
                rename(PATH+ele, PATH+eles[0]+'.rar')
            }
        }
        let nele = ele.replace('[井上雄彦] ', '');
        nele = nele.replace('Vol_', ' 第');
        nele = nele.replace('_', ' ');
        nele = nele.replace('.mobi', '卷.mobi');
        // console.log(PATH+nele);
        rename(PATH+ele, PATH+nele);
        // rename(PATH+ele,PATH+ele+'.jpg')
    })
})

let rename = (p1,p2) => {
    fs.rename(p1, p2, (err) => {
        if (err) throw err;
      });
}