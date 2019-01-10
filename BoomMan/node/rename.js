const fs = require('fs');

const path = 'E:/hanman/Super Dick(欲求王)/';

fs.readdir(path, (err, path)=>{
    path.forEach(ele => {
        if(ele.endsWith('.jpg')){
            let eles = ele.split('_');
            let i = parseInt(eles[0]);
            // if(22 <= i && i <= 26){
            //     rename(path+ele, (path+(i+1)+"_"+eles[1]));
            // }else if(i === 27){
            //     fs.unlinkSync(path+ele);
            // }else if(74 <= i && i <= 100){
            //     rename(path+ele, (path+i+1+"_"+eles[1]));
            // }
            console.log(ele)
        }
    })
})

let rename = (p1,p2) => {
    fs.rename(p1, p2, (err) => {
        if (err) throw err;
      });
}