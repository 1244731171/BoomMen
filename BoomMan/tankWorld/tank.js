const E = 'east';
const S = 'south';
const W = 'west';
const N = 'north';
const FACELIST = [E, S, W, N];

class __TANK {
    constructor(x, y, height, width, face = E) {
        this._state = 'ready';
        this._world = null;
        this._brush = null;

        this._type = "tank";
        this._isMoveable = true;
        this._uid = this._type + (new Date().getTime() * Math.random());

        this._viewRange = 300;

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
        this._checkCornerChoice.initPossibility(this.checkCornerChoiceList);
        // this._memory = new __MEMORY();

        this.calculateSpeed();
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

    addSpeed(speed) {
        this.calculateSpeed(speed);
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

    get checkCornerChoiceList() {
        let self = this;
        let arr = [];
        arr.push({
            'actionId': 'keepWalking',
            'actionCallback': self.move.bind(self),
            'originTimes': 100
        });
        return arr;
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

    engineStop() {
        let self = this;
        self._state = 'engineStop';
        TIME.off(self._uid);
    }

    goForward() {
        console.log('goForward', this._uid);
    }

    turnLeft() {
        console.log('turnLeft', this._uid);
        this._face = this.calculateFace(this._face, 'left');
        this.calculateSpeed();
    }

    turnRight() {
        console.log('turnRight', this._uid);
        this._face = this.calculateFace(this._face, 'right');
        this.calculateSpeed();
    }

    calculateFace(face, turn) {
        let index;
        let newFace;
        switch (turn) {
            case 'left':
                index = FACELIST.indexOf(face);
                index = index ? index - 1 : FACELIST.length - 1;
                newFace = FACELIST[index];
                break;
            case 'right':
                index = FACELIST.indexOf(face);
                index = index + 1 === FACELIST.length ? 0 : index + 1;
                newFace = FACELIST[index];
                break;
        }
        return newFace;
    }

    calculateSpeed(speed) {
        speed = speed || this._speedX + this._speedY;
        speed = Math.abs(speed);
        switch (this._face) {
            case E:
                this._speedX = speed;
                this._speedY = 0;
                break;
            case S:
                this._speedX = 0;
                this._speedY = speed;
                break;
            case W:
                this._speedX = -1 * speed;
                this._speedY = 0;
                break;
            case N:
                this._speedX = 0;
                this._speedY = -1 * speed;
                break;
        }
    }

    checkMoveable() {
        // console.log(JSON.stringify(this._position));
        // 先判断是不是在边界
        let self = this;
        // self.draw();
        if (self.checkMoveAbleByFace(self._face)) {
            if (self.checkView()) {
                self._checkCornerChoice.decide();
                self.move();
            } else {
                self.move();
            }
        } else {
            self._moveChoice.decide();
            self.draw();
        }
    }

    checkMoveAbleByFace(face) {
        let self = this;
        let spd = Math.abs(self._speedY + self._speedX);

        let orgPoints = self._position.concat();
        let point1, point2;

        switch (face) {
            case E:
                // 看1,2号位
                point1 = CROSS.clonePoint(orgPoints[1]);
                point1.x += spd;
                point2 = CROSS.clonePoint(orgPoints[2]);
                point2.x += spd;
                break;
            case S:
                // 看2,3号位
                point1 = CROSS.clonePoint(orgPoints[2]);
                point1.y += spd;
                point2 = CROSS.clonePoint(orgPoints[3]);
                point2.y += spd;
                break;
            case W:
                // 看3,0号位
                point1 = CROSS.clonePoint(orgPoints[3]);
                point1.x -= spd;
                point2 = CROSS.clonePoint(orgPoints[0]);
                point2.x -= spd;
                break;
            case N:
                // 看0,1号位
                point1 = CROSS.clonePoint(orgPoints[0]);
                point1.y -= spd;
                point2 = CROSS.clonePoint(orgPoints[1]);
                point2.y -= spd;
                break;
        }

        return !self.checkHit(point1, point2);
    }

    checkView() {
        let self = this;
        let left = self.calculateFace(self._face, 'left');
        let right = self.calculateFace(self._face, 'right');
        let isLeftAble = self.checkMoveAbleByFace(left);
        let isRightAble = self.checkMoveAbleByFace(right);
        let choiceList = self.checkCornerChoiceList;
        if (isLeftAble) {
            choiceList.push({
                'actionId': 'turnLeft',
                'actionCallback': self.turnLeft.bind(self),
                'originTimes': 10
            });
        }
        if (isRightAble) {
            choiceList.push({
                'actionId': 'turnRight',
                'actionCallback': self.turnRight.bind(self),
                'originTimes': 10
            });
        }
        self._checkCornerChoice.initPossibility(choiceList);

        return choiceList.length !== 1;
    }

    checkCorner() {

    }

    checkHit(p1, p2) {
        let list = this._world.list;
        let rangeX = this._world.rangeX - 1;
        let rangeY = this._world.rangeY - 1;
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
        let spx = this._speedX;
        let spy = this._speedY;
        for (let ele of p) {
            ele['x'] += spx;
            ele['y'] += spy;
        }
        this.draw();
    }

    draw() {
        let p = this._position;
        this._brush.lineWidth = 1;
        this._brush.strokeStyle = "#F9B4B6";
        this._brush.beginPath();
        this._brush.moveTo(p[0].x, p[0].y);
        this._brush.lineTo(p[1].x, p[1].y);
        this._brush.lineTo(p[2].x, p[2].y);
        this._brush.lineTo(p[3].x, p[3].y);
        this._brush.closePath();
        this._brush.stroke();
    }
}