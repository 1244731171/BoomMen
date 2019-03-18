let imageData = [];
let images = [];
let addData = (data) => {
    imageData = data;
    lazyLoad();
}
let index = 0;
let lazyLoad = () => {
    if(imageData.length){
        preLoadImg(imageData.splice(0,10));
    }else{
        alert("load End");
    }
}

 // 预处理图片
 function preLoadImg(source){
    let pr = [];
    source.forEach(url => {// 预加载图片
        let img = new Image();
        images.push(img);
        let p = loadImage(img, url)
                .then()
                .catch(err => console.error(err))
        pr.push(p);
    })

    // 图片全部加载完
    Promise.all(pr)
            .then(() => {
                let i = 0;
                images.forEach(element => {
                    document.body.append(element);
                    document.body.append(document.createElement('br'));
                });

                index++;
                images = [];
                lazyLoad();
            });

}
// 预加载图片
function loadImage(img, url) {
    return new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    })
}