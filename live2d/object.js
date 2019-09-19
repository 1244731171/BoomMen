class OBJECT {
    constructor(config) {
        this.config = config;
        this.uid = (Math.random() * 1000).toString();
        this.dom = this.createDom();
        this.status = {};
        for(let key in config){
            this.status[key] = config[key];
        }
    }
    createDom(){
        let dom = $(`<div id="${this.uid}"></div>`);
        let { config } = this;
        dom.css({
            'position': 'absolute',
            // 'bottom': config.height || config.bottom,
            'top': config.top,
            'left': config.left,
            'width': config.width,
            'height': config.height,
            'background': 'red'
        });
        return dom;
    }
    update(){
        let { dom, status } = this;
        dom.css({
            'top': status.top,
            'left': status.left,
        });
        if(status.fix === "all"){
            status.cur = "fire";
            status.vy = -20;
            delete status.fix;
        }
        if(status.cur === "fire" && status.top < 750){
            status.cur = "fire2";
            status.ay = -1;
            status.ax = 1;
        }
    }
    get m() {
        return this.config.m;
    }
}