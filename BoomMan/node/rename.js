const fs = require('fs');

const PATH = 'E:/迅雷下载/a001/';
// const PATH = 'E:/soft/yundown/yundown/download/';
// const PATH = 'Q:/好孩子看不到/国内写真/（萝莉）柚木写真/[柚木]红白调教(50P)_files/'
// const PATH = 'L:/新建文件夹/';
// const PATH = 'Q:/好孩子看不到/超级精品图片/bunnybunny_love/';
// const PATH = 'O:/散图/';
// const PATH = 'O:/temp/';
// const PATH = 'Q:/好孩子看不到/国内写真/（萝莉）少女映画/'


let loop = (_path) => {
    console.log('PATH ===> ', _path);
    fs.readdir(_path, (err, path)=>{
        path.forEach(ele => {
            let nele = ele;
            // if(ele.indexOf('part') !== -1){
            //     let eles = ele.split('_');
            //     // console.log(ele);
            //     if(eles.length>=2){
            //         rename(PATH+ele, PATH+eles[0]+'.rar')
            //     }
            // }
    
            // if(ele.toString().endsWith('_large')){
            //     // console.log(ele)
            //     nele = ele.replace('_large', '');
            //     rename(PATH+ele,PATH+nele)
            // }
    
            // if(ele.indexOf(".") == -1 && ele.indexOf('saved_resource') != -1){
            //     console.log(_path+ele);
            //     nele = ele + '.jpg';
            //     rename(_path+ele,_path+nele);
            // }

            // if(ele.endsWith('_files')){
            //     nele = _path+ele+'/';
            //     console.log(nele);
            //     loop(nele);
            // }
            orgele = ele;
            ele = PATH + ele;
            nele = PATH + nele;
            if(ele.endsWith('.jpg')){
                nele = ele.split("p")[1];
                // 0000.j length = 8
                while(nele.length < 6){
                    nele = "0" + nele;
                }
                nele = PATH + nele.replace(".j", ".ts");
                rename(ele, nele);
            }
            
            if(ele.endsWith('.ts')){
                nele = ele.split("p")[1] || orgele;
                // 0000.ts length = 8
                while(nele.length < 7){
                    nele = "0" + nele;
                }
                nele = PATH + nele;
                rename(ele, nele);
            }

            // console.log(_path+ele);
            // nele = ele.replace(/少女映画/g,'').replace(/少女映畫/g,'')
            // .replace(/\[/g,'').replace(/\]/g,'')
            // .replace(/【/g,'').replace(/】/g,'')
            // .replace(/ /g,'').replace(/-/g,'');
            // rename(_path+ele,_path+nele);
            // // console.log(PATH+nele);
            // // rename(PATH+ele, PATH+nele);
            // // rename(PATH+ele,PATH+ele+'.jpg')
        })
    });
}

loop(PATH);

let rename = (p1, p2) => {
    console.log(p1 + ' => TO => ' + p2);
    console.log('==============================');
    if(fs.existsSync(p2)){

    }else{
        fs.rename(p1, p2, (err) => {
            if (err) throw err;
        });
    }
}