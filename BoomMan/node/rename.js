const fs = require('fs');

// const PATH = 'E:/soft/yundown/yundown/download/';
// const PATH = 'Q:/好孩子看不到/国内写真/（萝莉）柚木写真/[柚木]红白调教(50P)_files/'
const PATH = 'O:/新建文件夹/新建文件夹/'
const PATH = 'Q:/好孩子看不到/超级精品图片/bunnybunny_love';

fs.readdir(PATH, (err, path)=>{
    path.forEach(ele => {
        if(ele.indexOf('part') !== -1){
            let eles = ele.split('_');
            console.log(ele);
            if(eles.length>=2){
                rename(PATH+ele, PATH+eles[0]+'.rar')
            }
        }
        // rename(PATH+ele,PATH+ele+'.jpg')
    })
});



let rename = (p1, p2) => {
    console.log(p1);
    console.log('TO');
    console.log(p2);
    if(fs.existsSync(p1)){

    }else{
        fs.rename(p1, p2, (err) => {
            if (err) throw err;
        });
    }
}