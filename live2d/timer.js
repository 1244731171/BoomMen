class TIME {
    constructor(eventer) {
        this.eventer = eventer;
        this.timer = -1;
        this.config = {};
    }
    start(t = 1000) {
        if(this.config.gap !== t){
            this.config.gap = t;
            this.eventer.fire({
                type: "updateTimeGap",
                data: t
            });
        }
        this.timer = setInterval(() => {
            this.eventer.fire({
                type: "timeupdate",
                data: t
            });
        }, t);
    }
    stop() {
        clearInterval(this.timer);
    }
}