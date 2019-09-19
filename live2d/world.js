class WORLD {
    constructor(eventer, timer) {
        this.eventer = eventer;
        this.timer = timer;
        this.world = $("body");
        this.world.css({
            "over-flow": "hidden",
            "padding": 0,
            "margin": 0
        });
        this.objList = [];

        this.config = {
            // g: 9.8, // m/s^2  => px/s^2
            g: 9.8 / timer.config.gap, // m/s^2  => px/s^2
            maxHeight: this.world.height(),
            maxWidth: this.world.width()
        };


        this.initEvent();
    }
    initEvent() {
        let { objList, eventer, timer, config } = this;
        let { g } = config;
        eventer.on("timeupdate", (t) => {
            t = t / timer.config.gap;
            let status, maxHeight, maxWidth;
            for (let i = 0; i < objList.length; i++) {
                status = objList[i].obj.status;
                if (status.fix === "all") {
                    return;
                }
                maxHeight = config.maxHeight - status.height;
                maxWidth = config.maxWidth - status.width;
                status.vy = status.vy + (g + status.ay) * t;
                status.top = status.top + status.vy * t;
                status.vx = status.vx + status.ax * t;
                status.left = status.left + status.vx * t;
                if (status.top >= maxHeight) {
                    status.top = maxHeight;
                    status.vy = 0;
                    status.ay = 0;
                    status.fix = "all";
                    objList[i].obj.update();
                    i--;
                // } if (status.left >= maxWidth) {
                //     status.top = maxHeight;
                //     status.vy = 0;
                //     status.ay = 0;
                //     objList[i].obj.update();
                //     status.fix = "all";
                //     i--;
                } else {
                    objList[i].obj.update();
                }
            }
        });
        eventer.on("updateTimeGap", () => {
            config.g = 9.8 / timer.config.gap;
        });
    }
    add(obj) {
        this.objList.push({
            obj: obj,
            info: {}
        });
        this.world.append(obj.dom);
    }
}