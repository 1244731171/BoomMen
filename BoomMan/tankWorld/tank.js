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
        this._uid = this._type + "_" + (new Date().getTime() * Math.random()).toString().substr(1,4);

        this._viewRange = 300;
        this._host = 'auto';

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

        this._currentShell;
        this._isReloading = false;
        this._reloadTime = 1000;
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

    get left() {
        return this._position[0]['x'];
    }

    get right() {
        return this._position[2]['x'];
    }

    get top() {
        return this._position[0]['y'];
    }

    get bottom() {
        return this._position[2]['y'];
    }

    get corePosition() {
        return {
            x: this.left + (this.right - this.left) / 2,
            y: this.top + (this.bottom - this.top) / 2
        };
    }

    get moveChoiceList() {
        let self = this;
        return [{
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
            'actionCallback': self.goForward.bind(self),
            'originTimes': 100
        });
        return arr;
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

    loadAutoControl() {
        this._host = 'auto';
        let self = this;
        self._checkCornerChoice.on();
        self._moveChoice.on();
        TIME.off(self._uid);
        TIME.on(self._uid, self.checkMoveable.bind(self));
    }

    removeAutoControl() {
        let self = this;
        self._checkCornerChoice.off();
        self._moveChoice.off();
        TIME.off(self._uid);
        TIME.on(self._uid, self.draw.bind(self));
    }

    loadManualControl() {
        this._host = 'manual';
    }

    removeManualControl() {
    }

    load(world) {
        this._world = world;
        this._brush = world.earth.getContext("2d");
    }

    engineStart() {
        let self = this;
        self._state = 'engineStart';
        TIME.on(self._uid, self.checkMoveable.bind(self));
        self.reload();
    }

    engineStop() {
        let self = this;
        self._state = 'engineStop';
        TIME.off(self._uid);
    }

    goForward() {
        // console.log('goForward', this._uid);
        if (this.checkMoveAbleByFace(this._face)) {
            this.move();
        } else {
            this._moveChoice.decide();
            this.draw();
            this.checkView();
        }
    }

    turnLeft() {
        // console.log('turnLeft', this._uid);
        this._face = this.calculateFace(this._face, 'left');
        this.calculateSpeed();
    }

    turnRight() {
        // console.log('turnRight', this._uid);
        this._face = this.calculateFace(this._face, 'right');
        this.calculateSpeed();
    }

    turnToEast() {
        if(this._host !== 'manual'){
            return;
        }
        this.addSpeedX(Math.abs(this._speedX + this._speedY));
    }

    turnToSouth() {
        if(this._host !== 'manual'){
            return;
        }
        this.addSpeedX(-1 * Math.abs(this._speedX + this._speedY));
    }

    turnToWast() {
        if(this._host !== 'manual'){
            return;
        }
        this.addSpeedY(Math.abs(this._speedX + this._speedY));
    }

    turnToNorth() {
        if(this._host !== 'manual'){
            return;
        }
        this.addSpeedY(-1 * Math.abs(this._speedX + this._speedY));
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
        if (this.checkCorner()) {
            this._checkCornerChoice.decide();
            this.draw();
        } else {
            this.goForward();
        }
        // }
        // // console.log(JSON.stringify(this._position));
        // // 先判断是不是在边界
        // let self = this;
        // // self.draw();
        // if (self.checkMoveAbleByFace(self._face)) {
        //     if (self.checkCorner()) {
        //         self._checkCornerChoice.decide();
        //         self.move();
        //     } else {
        //         self.move();
        //     }
        // } else {
        //     self._moveChoice.decide();
        //     self.draw();
        // }
        // self.checkView();
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
        let minX = self._position[0].x;
        let maxX = self._position[2].x;
        let minY = self._position[0].y;
        let maxY = self._position[2].y;
        let rangeX = self._world.rangeX - 1;
        let rangeY = self._world.rangeY - 1;
        let targetList, viewLineX1, viewLineX2;
        switch (self._face) {
            case E:
                viewLineX1 = {
                    x1: maxX,
                    y1: minY,
                    x2: rangeX,
                    y2: minY
                };
                viewLineX2 = {
                    x1: maxX,
                    y1: maxY,
                    x2: rangeX,
                    y2: maxY
                };
                targetList = self.checkViewTarget(viewLineX1, viewLineX2);
                break;
            case S:
                viewLineX1 = {
                    x1: minX,
                    y1: maxY,
                    x2: minX,
                    y2: rangeY
                };
                viewLineX2 = {
                    x1: maxX,
                    y1: maxY,
                    x2: maxX,
                    y2: rangeY
                };
                targetList = self.checkViewTarget(viewLineX1, viewLineX2);
                break;
            case W:
                viewLineX1 = {
                    x1: 0,
                    y1: minY,
                    x2: minX,
                    y2: minY
                };
                viewLineX2 = {
                    x1: 0,
                    y1: maxY,
                    x2: minX,
                    y2: maxY
                };
                targetList = self.checkViewTarget(viewLineX1, viewLineX2);
                break;
            case N:
                viewLineX1 = {
                    x1: minX,
                    y1: 0,
                    x2: minX,
                    y2: minY
                };
                viewLineX2 = {
                    x1: maxX,
                    y1: 0,
                    x2: maxX,
                    y2: minY
                };
                targetList = self.checkViewTarget(viewLineX1, viewLineX2);
                break;
        }
        // this._brush.strokeStyle = "#ff0000";
        // this._brush.beginPath();
        // this._brush.moveTo(viewLineX1.x1, viewLineX1.y1);
        // this._brush.lineTo(viewLineX1.x2, viewLineX1.y2);
        // this._brush.moveTo(viewLineX2.x1, viewLineX2.y1);
        // this._brush.lineTo(viewLineX2.x2, viewLineX2.y2);
        // this._brush.stroke();
        if (targetList.length) {
            // console.log("%s >>>>>>> %s", this._uid, targetList[0].uid);
            if(this._host === 'auto'){
                this.checkFire();
            }
        }
    }

    checkFire(){
        if(this._currentShell){
            this.fire();
        }else{
            this.reload();
        }
    }

    reload(){
        let self = this;
        if(!self._isReloading){
            self._isReloading = true;
            setTimeout(function(){
                self._currentShell = new SHELL(self._world, self.uid);
                self._isReloading = false;
            }, self._reloadTime);
        }
    }

    fire(){
        this._currentShell.fire(this.corePosition['x'], this.corePosition['y'], this._speedX, this._speedY);
        this._currentShell = null;
        this.reload();
    }

    checkViewTarget(viewLineX1, viewLineX2) {
        let self = this;
        let list = self._world.list;
        let viewList = [];
        let target;
        for (let i = 0, j = list.length; i < j; i++) {
            target = list[i];
            if (target['type'] !== self.type || this.uid === target.uid) {
                continue;
            }
            if (CROSS.easyCheckLineSegementRectangleCross(viewLineX1, target.position)
                || CROSS.easyCheckLineSegementRectangleCross(viewLineX2, target.position)) {
                viewList.push(target);
            }
        }
        return viewList;
    }


    checkCorner() {
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
        // if(isLeftAble || isRightAble){
        //     console.log('>>>>>checkCorner, left is %s, righrt is %s', isLeftAble, isRightAble);
        // }
        self._checkCornerChoice.initPossibility(choiceList);

        return choiceList.length !== 1;
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

            if(ele.type !== 'house' && ele.type !== 'tank'){
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
        this.checkView();
    }

    draw() {
        let p = this._position;
        this._brush.lineWidth = 1;
        this._brush.strokeStyle = "#F9B4B6";
        this._brush.strokeStyle = "#FF0000";
        this._brush.beginPath();
        this._brush.moveTo(p[0].x, p[0].y);
        this._brush.lineTo(p[1].x, p[1].y);
        this._brush.lineTo(p[2].x, p[2].y);
        this._brush.lineTo(p[3].x, p[3].y);
        this._brush.closePath();

        let midX = this.corePosition['x'];
        let midY = this.corePosition['y'];
        this._brush.moveTo(midX, midY);
        switch (this._face) {
            case E:
                this._brush.lineTo(this.right, midY);
                break;
            case S:
                this._brush.lineTo(midX, this.bottom);
                break;
            case W:
                this._brush.lineTo(this.left, midY);
                break;
            case N:
                this._brush.lineTo(midX, this.top);
                break;
        }
        this._brush.stroke();
    }

    destroy(){
        TIME.off(this.uid);
        this._world.remove(this);
    }
}