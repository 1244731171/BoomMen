class Shell {
    constructor(World) {
        this._world = World;
        this._type = "shell";
        this._isMoveable = true;
        this._uid = this._type + (new Date().getTime() * Math.random());

        this._width = 50;
        this._height = 10;
        this._position = [];
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

    get position(){
        return this._position;
    }

    fire(x, y, speedX, speedY) {
        // x,y是初始中心大小
    }
}