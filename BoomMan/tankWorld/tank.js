class __TANK {
    constructor(x, y, height, width) {
        this._state = 'ready';
        this._world = null;
        this._brush = null;

        width--;
        height--;

        this._points = [{
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

        this._speedX = 0;
        this._speedY = 0;

        this._choice = new __CHOICE();
        // this._memory = new __MEMORY();
    }

    moveMemoryList() {
        return [{
            'actionId': 'goForward',
            'actionCallback': null,
            'originTimes': 10
        },{
            'actionId': 'turnBack',
            'actionCallback': null,
            'originTimes': 10
        },{
            'actionId': 'turnLeft',
            'actionCallback': null,
            'originTimes': 10
        },{
            'actionId': 'turnRight',
            'actionCallback': null,
            'originTimes': 10
        }]
    }

    load(world) {
        this._world = world;
        this._brush = world.earth.getContext("2d");
    }

    engineStart() {
        this._state = 'engineStart';
    }

    goForward() {
        console.log('goForward');
    }

    turnBack() {
        console.log('turnBack');
    }

    turnLeft() {
        console.log('turnLeft');
    }

    turnRight() {
        console.log('turnRight');
    }

    checkMoveable() {
        // 先判断是不是在边界
    }

}