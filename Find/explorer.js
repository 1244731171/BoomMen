// a => isStone
// b => bottomPossible
// d => deadpath
// f => faced
// l => leftPossible
// p => isPass
// r => rightPossible
// t => topPossible
// x => xPoint
// y => yPonit

class Explorer {
    constructor(world) {
        this.step = 0;
        this.cx = null;
        this.cy = null;
        this.fx = null;
        this.fy = null;
        this.checkSort = [];
        this.faceMap = {
            'r': 'l',
            'l': 'r',
            't': 'b',
            'b': 't'
        };
        this.isFollowLast = true;
        this.lastTo = null;
        this.start = null;
        this.finish = null;

        this.world = world;

        this.list = this.world.orgData;
    }
    startCalculatePath(cx, cy, fx, fy) {
        this.start = start;
        this.finish = finish;
        this.cx = cx;
        this.cy = cy;
        this.fx = fx;
        this.fy = fy;
        this.list[this.cx][this.cy]['d'] = true;
        let self = this;
        this.timer = setInterval(self.check.bind(self), 100);
    }
    stopCalculatePath(isOver) {
        clearInterval(this.timer);
        this.step = 0;
        if(!isOver){
            // this.start = null;
            // this.finish = null;
            this.lastTo = null;
            this.isFollowLast = false;
            this.clearAllPath();
            this.startCalculatePath(this.cx, this.cy, this.fx, this.fy);
        }
    }
    sortCheckFace(lastTo) {
        let x = this.fx - this.cx;
        let y = this.fy - this.cy;
        let x1, x2, y1, y2;
        if (x >= 0) {
            x1 = "r";
            x2 = "l";
        } else {
            x1 = "l";
            x2 = "r";
            x = -1 * x;
        }
        if (y >= 0) {
            y1 = "b";
            y2 = "t";
        } else {
            y1 = "t";
            y2 = "b";
            y = -1 * y;
        }
        if (x < y) {
            this.checkSort = [x1, y1, y2, x2];
        } else {
            this.checkSort = [y1, x1, x2, y2];
        }
        let index = -1;
        if (lastTo) {
            let from = this.faceMap[this.lastTo];

            // 先把最后一次移动作为第三优先级
            index = this.checkSort.indexOf(this.lastTo);
            if (index === 1 && this.isFollowLast) {
                // 如果最后一次是在 前两个优先级上则强制提到第一级
                // 惯性移动思维
                this.checkSort.splice(1, 1);
                this.checkSort.unshift(this.lastTo);
            }
            if (index === 3) {
                let temp = this.checkSort.splice(3, 1)[0];
                this.checkSort.push(temp);
            }
            // 优先前置来源类
            index = this.checkSort.indexOf(from);
            this.checkSort.splice(index, 1);
            this.checkSort.unshift(from);
        }

        if (x === 0 && y === 1) {
            index = this.checkSort.indexOf(y1);
            this.checkSort.splice(index, 1);
            this.checkSort.unshift(y1);
        }
        if (y === 0 && x === 1) {
            index = this.checkSort.indexOf(x1);
            this.checkSort.splice(index, 1);
            this.checkSort.unshift(x1);
        }
    }
    clearOldPath() {
        this.list.forEach((x) => {
            x.forEach((y) => {
                delete y['p'];
                y['f'] = "";
            });
        });
    }
    clearAllPath() {
        this.list = this.world.orgData;
        this.world.clear();
    }
    check() {

        // check this.finish
        if (this.cx === this.fx && this.cy === this.fy) {
            console.log('get this.finish point');
            this.stopCalculatePath(true);
            return;
        }

        let info = this.list[this.cx][this.cy];
        info['p'] = true;
        let dom = document.querySelector(`#ID_${this.cx}_${this.cy}`);
        dom.classList.add("path");

        // check possiable on self
        if (this.list[this.cx - 1] && this.list[this.cx - 1][this.cy] && !this.list[this.cx - 1][this.cy]['a'] && !this.list[this.cx - 1][this.cy]['d']) {
            info['l'] = this.list[this.cx - 1][this.cy];
        } else {
            info['l'] = false;
        }
        if (this.list[this.cx + 1] && this.list[this.cx + 1][this.cy] && !this.list[this.cx + 1][this.cy]['a'] && !this.list[this.cx + 1][this.cy]['d']) {
            info['r'] = this.list[this.cx + 1][this.cy];
        } else {
            info['r'] = false;
        }
        if (this.list[this.cx][this.cy - 1] && !this.list[this.cx][this.cy - 1]['a'] && !this.list[this.cx][this.cy - 1]['d']) {
            info['t'] = this.list[this.cx][this.cy - 1];
        } else {
            info['t'] = false;
        }
        if (this.list[this.cx][this.cy + 1] && !this.list[this.cx][this.cy + 1]['a'] && !this.list[this.cx][this.cy + 1]['d']) {
            info['b'] = this.list[this.cx][this.cy + 1];
        } else {
            info['b'] = false;
        }

        this.sortCheckFace(this.lastTo);
        dom.innerHTML = (this.step);
        console.log(`${this.step} last to ==> ${this.lastTo}`);
        console.log(`${this.step} current ==> ${this.cx} - ${this.cy}`);
        console.log(`${this.step} ==> ${JSON.stringify(this.checkSort)}`);
        console.log(`${this.step} info ==> T:${info.t ? info.t.d : null};R:${info.r ? info.r.d : null};B:${info.b ? info.b.d : null};L:${info.l ? info.l.d : null}`);

        // check next
        let canMove = false;
        let preInfo, nextInfo;
        this.lastTo = null;
        for (let next of this.checkSort) {
            if (info[next]) {
                canMove = true;
                nextInfo = info[next];
                if (nextInfo['p']) {
                    // 往回走 不能是同方向
                    if (!preInfo && (nextInfo['f'] || "").indexOf(next) === -1) {
                        preInfo = nextInfo;
                    }
                    nextInfo = null;
                } else {
                    // 即将移动的方向 为下一次判断方向做准备的
                    this.lastTo = next;
                    break;
                }
            }
        }

        // move
        if (canMove) {
            // 可以成功移动到下一格
            if (nextInfo) {
                nextInfo['f'] = nextInfo['f'] + (this.lastTo || "");
                this.cx = nextInfo['x'];
                this.cy = nextInfo['y'];
            } else {
                this.cx = preInfo['x'];
                this.cy = preInfo['y'];
                info['d'] = true;
                // dom.classList.remove("path");
                dom.classList.add("deadpath");
            }
        } else {
            console.log("no path can move!");
            this.stopCalculatePath(false);
        }
        this.step++;
    }
}



