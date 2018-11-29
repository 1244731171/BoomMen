class Shell {
    constructor(World){
        this._world = World;
        this._type = "shell";
        this._uid = this._type + new Date().getTime;
        
        this._width = 50;
        this._height = 10;
    }

    fire(x, y, speedX, speedY){
        // x,y是初始中心大小
    }
}