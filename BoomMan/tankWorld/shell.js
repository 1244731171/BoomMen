class SHELL {
    constructor(World, parentId, parent) {
        this._world = null;
        this._brush = null;
        this._type = "shell";
        this._isMoveable = true;
        this._uid = this._type + "_" + (new Date().getTime() * Math.random());
        this._parentId = parentId;
        this._parent = parent;
        this._team = parent.team;

        this._length = 5;
        this._speedX = 0;
        this._speedY = 0;
        this._unitSpeed = 3;
        this._position = [];

        this.loadWorld(World);
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

    get team() {
        return this._team;
    }

    set team(team) {
        this._team = team;
    }

    load(){
        
    }

    loadWorld(World){
        this._world = World;
        this._brush = World.earth.getContext("2d");
    }

    fire(x, y, speedX, speedY) {
        // x,y是初始中心大小
        let self = this;
        speedX *= this._unitSpeed;
        speedY *= this._unitSpeed;
        self._speedX = speedX;
        self._speedY = speedY;
        if(speedX < 0){
            self._position = [{
                x: x - self._length,
                y: y
            },{
                x: x,
                y: y
            }];
        }else if(speedX > 0){
            self._position = [{
                x: x,
                y: y
            },{
                x: x + self._length,
                y: y
            }];
        }else if(speedY < 0){
            self._position = [{
                x: x,
                y: y - self._length
            },{
                x: x,
                y: y
            }];
        }else if(speedY > 0){
            self._position = [{
                x: x,
                y: y
            },{
                x: x,
                y: y - self._length
            }];
        }
        self._world.add(self);

        self.draw();
        TIME.on(self.uid, self.move.bind(self));
    }

    move(){
        let self = this;
        self._position.forEach(function(ele){
            ele.x += self._speedX;
            ele.y += self._speedY;
        });
        self.checkHit();
        self.draw();
    }

    draw(){
        let p = this._position;
        this._brush.lineWidth = 1;
        this._brush.strokeStyle = "#000000";
        this._brush.beginPath();
        this._brush.moveTo(p[0].x, p[0].y);
        this._brush.lineTo(p[1].x, p[1].y);
        this._brush.stroke();
        this._brush.closePath();
        // console.log(p[0].x, p[0].y,p[1].x, p[1].y);
    }

    checkHit(){
        let self = this;
        let p = self._position;
        let minX = Math.min(p[0].x, p[1].x);
        let maxX = Math.max(p[0].x, p[1].x);
        let minY = Math.min(p[0].y, p[1].y);
        let maxY = Math.max(p[0].y, p[1].y);
        let lineSegement = {
            x1: minX,
            x2: maxX,
            y1: minY,
            y2: maxY
        };
        let ps;
        if(minX < 0 || minY < 0 || maxX > self._world.rangeX || maxY > self._world.rangeY){
            self.destroy();
        }else{
            let list = this._world.list;
            for (let ele of list) {
                if (ele.uid == this._uid) {
                    continue;
                }
    
                if(ele.type === 'shell'){
                    if(CROSS.easyCheckLineSegementsCross(lineSegement, {
                        x1: ele.position[0].x,
                        x2: ele.position[1].x,
                        y1: ele.position[0].y,
                        y2: ele.position[1].y
                    })){
                        ele.destroy();
                        self.destroy();    
                    }
                }else if(ele.type === 'tank'){
                    if(ele.uid === self._parentId){
                        continue;
                    }
                    ps = ele.position;
                    if (ps && ps instanceof Array) {
                        if (CROSS.easyCheckLineSegementRectangleCross(lineSegement, ps)){
                            ele.destroy();
                            self.destroy();    
                        }
                    }
                }else{
                    continue;
                }
    
    
            }
        }
    }

    destroy(){
        TIME.off(this.uid);
        this._world.remove(this);
    }
}