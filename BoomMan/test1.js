

class test1 {
    constructor(){
        this.text = 1;
        if(this.text){
            import("./test3").then(function(skin) {
                new test3.show();
            });
        }else{
            import("./test3").then(function(skin) {
                new skin.show();
            });
        }
    }

    show(){
        console.log(this.text);
    }
}