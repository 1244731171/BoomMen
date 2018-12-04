const E = 'east';
const S = 'south';
const W = 'west';
const N = 'north';
const FACELIST = [E, N, W, S];

class __TANK {
    constructor(x, y, height, width, face = E) {
        this._state = 'ready';
        this._world = null;
        this._brush = null;

        this._type = "tank";
        this._isMoveable = true;
        this._uid = this._type + (new Date().getTime() * Math.random());

        width--;
        height--;

        // 左上，右上，右下，左下
        this._position = [{
            'x': x,
            'y': y
        }, {
            'x': x + width,
            'y': y
        }, {
            'x': x + width,
            'y': y + height
        }, {
            'x': x,
            'y': y + height
        }];

        // 必须有一个是0
        this._speedX = 0;
        this._speedY = 0;
        this._face = face;

        this._moveChoice = new __CHOICE();
        this._moveChoice.initPossibility(this.moveChoiceList);
        this._checkCornerChoice = new __CHOICE();
        // this._memory = new __MEMORY();

    }

    get type() {
        return this._type;
    }

    get isMoveable() {
        return this._isMoveable;
    }

    get uid() {
        return this._uid;
    }

    get position() {
        return this._position;
    }

    addSpeedX(speed) {
        this._face = speed > 0 ? E : W;
        this._speedX = speed;
        this._speedY = 0;
    }

    addSpeedY(speed) {
        this._face = speed > 0 ? S : N;
        this._speedY = speed;
        this._speedX = 0;
    }

    get moveChoiceList() {
        let self = this;
        return [{
            'actionId': 'goForward',
            'actionCallback': self.goForward.bind(self),
            'originTimes': 10
        }, {
            'actionId': 'turnLeft',
            'actionCallback': self.turnLeft.bind(self),
            'originTimes': 10
        }, {
            'actionId': 'turnRight',
            'actionCallback': self.turnRight.bind(self),
            'originTimes': 10
        }];
    }

    load(world) {
        this._world = world;
        this._brush = world.earth.getContext("2d");
    }

    engineStart() {
        let self = this;
        self._state = 'engineStart';
        TIME.on(self._uid, self.checkMoveable.bind(self));
    }

    goForward() {
        console.log('goForward', this._uid);
    }

    turnLeft() {
        console.log('turnLeft', this._uid);
    }

    turnRight() {
        console.log('turnRight', this._uid);
    }

    checkMoveable() {
        // 先判断是不是在边界
        let self = this;
        let spx = self._speedX;
        let spy = self._speedY;

        let orgPoints = self._position.concat();
        let point1, point2;

        switch (self._face) {
            case E:
                point1 = orgPoints[1];
                point1.x += spx;
                point2 = orgPoints[2];
                point2.x += spx;
                break;
            case W:
                point1 = orgPoints[0];
                point1.x += spx;
                point2 = orgPoints[3];
                point2.x += spx;
                break;
            case S:
                point1 = orgPoints[0];
                point1.y += spy;
                point2 = orgPoints[1];
                point2.y += spy;
                break;
            case N:
                point1 = orgPoints[2];
                point1.y += spy;
                point2 = orgPoints[3];
                point2.y += spy;
                break;
        }
        if(self.checkHit(point1, point2)){
            self._speedX = 0;
            self._speedY = 0;
            self._moveChoice.decide();
        }else{
            self.move();
        }
    }

    checkHit(p1, p2) {
        console.log(1111);
        let list = this._world.list;
        let rangeX = this._world.rangeX;
        let rangeY = this._world.rangeY;
        let isHit = false;
        let ps;

        // 先测边界
        if (p1.x < 0 || p2.x < 0 || p1.x > rangeX || p2.x > rangeX
            || p1.y < 0 || p2.y < 0 || p1.y > rangeY || p2.y > rangeY) {
            isHit = true;
        }
        // 在测对象
        for (let ele of list) {
            if (ele.uid == this._uid) {
                continue;
            }

            ps = ele.position;
            if (ps && ps instanceof Array) {
                if (CROSS.easyCheckPointRectangleCross(p1, ps)
                    || CROSS.easyCheckPointRectangleCross(p2, ps)) {
                    isHit = true;
                    break;
                }
            }
        }
        return isHit;
    }

    move() {
        let p = this._position;
        this._brush.lineWidth = 0.5;
        this._brush.fillStyle = "#81D8D0";
        this._brush.strokeStyle = "#81D8D0";
        this._brush.beginPath();
        this._brush.moveTo(p[0].x, p[0].y);
        this._brush.lineTo(p[1].x, p[1].y);
        this._brush.lineTo(p[2].x, p[2].y);
        this._brush.lineTo(p[3].x, p[3].y);
        this._brush.closePath();
        this._brush.fill();
    }
}