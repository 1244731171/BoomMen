let list = [];
let unit = 30;
let width = 600;
let height = 600;

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
// x => xPoint
// y => yPonit
// p => isPass
// l => leftPossible
// r => rightPossible
// t => topPossible
// b => bottomPossible
// d => deadpath

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

let startCalculatePath = () => {
    cx = parseInt(start.id.split("_")[1]);
    cy = parseInt(start.id.split("_")[2]);
    fx = parseInt(finish.id.split("_")[1]);
    fy = parseInt(finish.id.split("_")[2]);
    let x1, y1, x2, y2;
    if (cx < fx) {
        x1 = "r";
        x2 = "l";
    } else {
        x1 = "l";
        x2 = "r";
    }
    if (cy < fy) {
        y1 = "t";
        y2 = "b";
    } else {
        y1 = "b";
        y2 = "t";
    }
    if (fy - cy > fx - cx) {
        checkSort = [y1, x1, y2, x2];
    } else {
        checkSort = [x1, y1, x2, y2];
    }
    window.timer = setInterval(check, 500);
};

let stopCalculatePath = () => {
    clearInterval(window.timer);
    start = null;
    finish = null;
}

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

    // check next
    let canMove = false;
    let preInfo, nextInfo;
    for (let next of checkSort) {
        if (info[next]) {
            canMove = true;
            nextInfo = info[next];
            if (nextInfo['p']) {
                preInfo = nextInfo;
                nextInfo = null;
            } else {
                break;
            }
        }
    }

    // move
    if (canMove) {
        // 可以成功移动到下一格
        if (nextInfo) {
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