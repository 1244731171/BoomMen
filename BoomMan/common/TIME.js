class __TIME {
    constructor(rate = 33) {
        let self = this;
        self._timeList = [];
        self._rate = rate;

        self._timer = setInterval(self._calculate.bind(self), rate);
    }

    on(id, event) {
        this._timeList.push({
            id: id,
            event: event
        });
    }

    off(id) {
        let list = this._timeList;
        for (const index in list) {
            let event = list[index];
            if (event.id == id) {
                list.splice(index, 1);
            }
        }
    }

    freeze() {
        clearInterval(this._timer);
    }

    unfreeze() {
        let self = this;
        self._timer = setInterval(self._calculate.bind(self), self._rate);
    }

    set rate(rate) {
        this.freeze();
        this._rate = rate;
        this.unfreeze();
    }

    get rage (){
        return this._rate;
    }

    _calculate() {
        this._timeList.forEach(element => {
            element['event']();
        });
    }
}

const TIME = new __TIME();