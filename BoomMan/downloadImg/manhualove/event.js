class event {
    constructor() {
        this.eventList = {};
    }
    on(type, cb) {
        this.eventList[type] = this.eventList[type] || [];
        this.eventList[type].push(cb);
    }
    off(type, cb) {
        let i = -1;
        if (cb && (i = this.eventList[type].indexOf(cb)) !== -1) {
            this.eventList[type].splice(i, 1);
        }else{
            this.eventList[type] = [];
            delete this.eventList[type];
        }
    }
    fire(info){
        let type = info.type;
        let data = info.data;
        let cbs;
        if((cbs = this.eventList[type]) && cbs.length){
            cbs.forEach(ele => {
                ele(data);
            });
        }
    }
}
module.exports = event;