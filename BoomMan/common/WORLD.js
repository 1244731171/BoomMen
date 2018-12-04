class __WORLD {
    constructor(width, height) {

        let canvas = document.createElement('canvas');
        this._universe = window;
        this._canvas = canvas;
        this._width = width;
        this._height = height;
        this._worldBrush = canvas.getContext("2d");
        this._objectList = [];

        this.loaded = undefined;

        this._drawEffectMap = {};

        this._init();
    }

    _init() {
        let self = this;
        if (document && document.body) {
            self.init();
        } else {
            TIME.on('createEarth', () => {
                if (document && document.body) {
                    self.init().bind(self);
                }
            });
        }
    }

    init() {
        let self = this;
        document.body.append(self._canvas);
        self._canvas.style.width = self._width;
        self._canvas.style.height = self._height;
        self._canvas.style.position = "absolute";
        self._canvas.style.top = "0px";
        self._canvas.style.left = "0px";
        self._canvas.style.border = "1px solid #000000";
        self._canvas.width = self._width;
        self._canvas.height = self._height;
        self.initEvent();
        TIME.off('createEarth');
    }

    initEvent() {
        let self = this;
        TIME.on('clearWorld', self.clearWorld.bind(self));

        if (typeof self.loaded == 'function') {
            self.loaded();
        }

    }

    clearWorld() {
        this._worldBrush.clearRect(0, 0, this.rangeX, this.rangeY);
    }

    set rangeX(x) {
        this._width = x;
    }

    set rangeY(y) {
        this._height = y;
    }

    get rangeX() {
        return this._width;
    }

    get rangeY() {
        return this._height;
    }

    get earth() {
        return this._canvas;
    }

    get list() {
        return this._objectList;
    }

    add(object) {
        this._objectList.push(object);
        try {
            object.load(this);
        } catch (e) {
            console.error('object %s No Such Method "load"!', object.uid);
        }
    }

    remove(object) {
        var index = this._objectList.indexOf(object);
        if (index >= 0) {
            this._objectList.splice(index, 1);
            object.destroy();
        }
    }
}