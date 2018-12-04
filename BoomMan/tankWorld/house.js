
// create house
class house {
    constructor(x, y, width, height) {
        this._type = 'house';
        this._uid = this._type + (new Date().getTime() * Math.random());
        this._isMoveable = false;
        this._world = null;
        this._brush = null;

        width--;
        height--;

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
    }

    get uid() {
        return this._uid;
    }

    get type() {
        return this._type;
    }

    get isMoveable() {
        return this._isMoveable;
    }

    get position(){
        return this._position;
    }

    load(world) {
        let self = this;
        this._world = world;
        this._brush = world.earth.getContext("2d");
        TIME.on('draw' + self._uid, self.draw.bind(self));
    }

    draw() {
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