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
class World {
    constructor(width = 900, height = 600, unit = 30, dom = document.body) {
        let list = [];

        for (let i = 0, j = width / unit; i < j; i++) {
            list[i] = [];
            for (let x = 0, y = height / unit; x < y; x++) {
                list[i][x] = {
                    x: i,
                    y: x,
                    a: Math.random() > 0.6,
                    f: ""
                };
            }
        }

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
                dom.append(div);
            });
        });

        this.list = list;
    }
    get orgData() {
        let data = JSON.parse(JSON.stringify(this.list));
        return data;
    }
    clear(){
        document.querySelectorAll(".block").forEach(e => {
            e.classList.remove("deadpath");
            e.classList.remove("path");
            e.innerHTML = "";
        });
    }
}