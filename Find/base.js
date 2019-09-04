let list = [];
let unit = 30;
let width = 1200;
let height = 1800;
let timeGap = 100;

let step = 0;

for (let i = 0, j = width / unit; i < j; i++) {
    list[i] = [];
    for (let x = 0, y = height / unit; x < y; x++) {
        list[i][x] = {
            x: i,
            y: x,
            a: Math.random() > 0.6
        };
    }
}

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

list.forEach((x) => {
    x.forEach((y) => {
        let div = document.createElement("div");
        div.id = `ID_${y.x}_${y.y}`;
        div.style.top = `${unit * y.y}px`;
        div.style.left = `${unit * y.x}px`;
        if (y.a) {
            div.className = "stone block";
        } else {
            div.className = "block";
        }
        document.body.append(div);
    });
});

let cx, cy, fx, fy;
let checkSort = [];
let faceMap = {
    'r': 'l',
    'l': 'r',
    't': 'b',
    'b': 't'
};

let startCalculatePath = () => {
    cx = parseInt(start.id.split("_")[1]);
    cy = parseInt(start.id.split("_")[2]);
    fx = parseInt(finish.id.split("_")[1]);
    fy = parseInt(finish.id.split("_")[2]);
    list[cx][cy]['d'] = true;
    window.timer = setInterval(check, timeGap);
};

let stopCalculatePath = () => {
    clearInterval(window.timer);
    start = null;
    finish = null;
    lastTo = null;
    isFollowLast = false;
    clearOldPath();
};

let isFollowLast = true;
let sortCheckFace = (lastTo) => {
    let x = fx - cx;
    let y = fy - cy;
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
        checkSort = [x1, y1, y2, x2];
    } else {
        checkSort = [y1, x1, x2, y2];
    }
    let index = -1;
    if (lastTo) {
        let from = faceMap[lastTo];

        // 先把最后一次移动作为第三优先级
        index = checkSort.indexOf(lastTo);
        if (index === 1 && isFollowLast) {
            // 如果最后一次是在 前两个优先级上则强制提到第一级
            // 惯性移动思维
            checkSort.splice(1, 1);
            checkSort.unshift(lastTo);
        }
        if (index === 3) {
            let temp = checkSort.splice(3, 1)[0];
            checkSort.push(temp);
        }
        // 优先前置来源类
        index = checkSort.indexOf(from);
        checkSort.splice(index, 1);
        checkSort.unshift(from);
    }

    if (x === 0) {
        index = checkSort.indexOf(y1);
        checkSort.splice(index, 1);
        checkSort.unshift(y1);
    }
    if (y === 0) {
        index = checkSort.indexOf(x1);
        checkSort.splice(index, 1);
        checkSort.unshift(x1);
    }
};

let clearOldPath = () => {
    // document.querySelectorAll(".path").forEach(e => {
    //     e.classList.remove('path');
    // });
    // document.querySelectorAll(".deadpath").forEach(e => {
    //     e.classList.remove('deadpath');
    // });
    list.forEach((x) => {
        x.forEach((y) => {
            delete y['f'];
            delete y['p'];
        });
    });
}

let lastTo;
let check = () => {

    // check finish
    if (cx === fx && cy === fy) {
        console.log('get finish point');
        stopCalculatePath();
        return;
    }

    let info = list[cx][cy];
    info['p'] = true;
    let dom = document.querySelector(`#ID_${cx}_${cy}`);
    dom.classList.add("path");

    // check possiable on self
    if (list[cx - 1] && list[cx - 1][cy] && !list[cx - 1][cy]['a'] && !list[cx - 1][cy]['d']) {
        info['l'] = list[cx - 1][cy];
    } else {
        info['l'] = false;
    }
    if (list[cx + 1] && list[cx + 1][cy] && !list[cx + 1][cy]['a'] && !list[cx + 1][cy]['d']) {
        info['r'] = list[cx + 1][cy];
    } else {
        info['r'] = false;
    }
    if (list[cx][cy - 1] && !list[cx][cy - 1]['a'] && !list[cx][cy - 1]['d']) {
        info['t'] = list[cx][cy - 1];
    } else {
        info['t'] = false;
    }
    if (list[cx][cy + 1] && !list[cx][cy + 1]['a'] && !list[cx][cy + 1]['d']) {
        info['b'] = list[cx][cy + 1];
    } else {
        info['b'] = false;
    }

    sortCheckFace(lastTo);
    dom.innerHTML = (step);
    console.log(`${step} last to ==> ${lastTo}`);
    console.log(`${step} current ==> ${cx} - ${cy}`);
    console.log(`${step} ==> ${JSON.stringify(checkSort)}`);
    console.log(`${step} info ==> T:${info.t ? info.t.d : null};R:${info.r ? info.r.d : null};B:${info.b ? info.b.d : null};L:${info.l ? info.l.d : null}`);

    // check next
    let canMove = false;
    let preInfo, nextInfo;
    lastTo = null;
    for (let next of checkSort) {
        if (info[next]) {
            canMove = true;
            nextInfo = info[next];
            if (nextInfo['p']) {
                // 往回走 不能是同方向
                if(!preInfo && (nextInfo['f'] || "").indexOf(next) === -1){
                    preInfo = nextInfo;
                }
                nextInfo = null;
            } else {
                // 即将移动的方向 为下一次判断方向做准备的
                lastTo = next;
                break;
            }
        }
    }

    // move
    if (canMove) {
        // 可以成功移动到下一格
        if (nextInfo) {
            nextInfo['f'] = nextInfo['f'] + (lastTo || "");
            cx = nextInfo['x'];
            cy = nextInfo['y'];
        } else {
            cx = preInfo['x'];
            cy = preInfo['y'];
            info['d'] = true;
            // dom.classList.remove("path");
            dom.classList.add("deadpath");
        }
    } else {
        console.log("no path can move!");
        stopCalculatePath();
    }
    step++;
};

let start = null;
let finish = null;

document.querySelectorAll(".block").forEach((d) => {
    d.addEventListener("click", (e) => {
        let target = e.target;
        if (!start) {
            start = target;
            start.classList.add("start");
            console.log(`start point => [${start.id}]`);
        } else if (!finish) {
            finish = target;
            finish.classList.add("finish");
            console.log(`finish point => [${finish.id}]`);
            startCalculatePath();
        }
    });
});
