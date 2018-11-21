import test3 from "./test3";

class test1 {
    constructor(){
        this.text = 1;
        if(this.text){
            import test3 from "./test3";
            new test3.show();
        }else{
            import test2 from "./test2";
        }
    }

    show(){
        console.log(this.text);
    }
}