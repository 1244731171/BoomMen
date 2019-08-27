let step = 1;

class event {
    constructor() {
        this.eventList = {};
    }
    on(type, cb) {
        let uid = `${new Date().getTime()}_${(step++)}`;
        this.eventList[type] = this.eventList[type] || [];
        this.eventList[type].push({
            id: uid,
            cb: cb
        });
        return uid
    }
    off(type, cb) {
        let i = -1;
        if (cb && typeof cb === 'function') {
            let list = this.eventList[type];
            for (let i = 0, j = list.length; i < j; i++) {
                if (list[i].cb === cb || list[i].id === cb) {
                    this.eventList[type].splice(i, 1);
                    break;
                }
            }
        } else {
            this.eventList[type] = [];
            delete this.eventList[type];
        }
    }
    fire(info) {
        let type = info.type;
        let data = info.data;
        let cbs;
        if ((cbs = this.eventList[type]) && cbs.length) {
            cbs.forEach(ele => {
                ele.cb(data);
            });
        }
    }
}
module.exports = event;