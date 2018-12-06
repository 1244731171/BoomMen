class __CHOICE {
    constructor(possibilityList) {
        this._type = "choice";
        // 可能性列表
        this._possibilityList = [];
        // 可能性map
        this._possibilityMap = {};
        // 最近一次选择
        this._lastActionId = null;
        // id
        this._uid = this._type + (new Date().getTime() * Math.random());
        // buff
        this._passiveStep = 3;
        // debuff
        this._positiveStep = 1;
        // normal
        this._normalStep = 1;
        // 是不是可以做决定
        this._enable = true;

        this.initPossibility(possibilityList);
    }

    initPossibility(possibilityList) {
        // [{
        //     "actionId": 111,
        //     "actionCallback": function(){},
        //     "originTimes": 10
        // }]
        // 重置
        if(!possibilityList || !possibilityList.length){
            return;
        }
        this._possibilityList = [];
        this._possibilityMap = {};

        for (var p of possibilityList) {
            let times = p['originTimes'];
            let id = p['actionId'];
            this._possibilityMap[id] = p['actionCallback'];
            while (times-- > 0) {
                this._possibilityList.push(id);
            }
        }
    }

    set passiveStep(step) {
        this._passiveStep = step;
    }

    set positiveStep(step) {
        this._positiveStep = step;
    }

    set normalStep(step) {
        this._normalStep = step;
    }

    decide() {
        if(!this._enable){
            return null;
        }
        this.normal();
        let index = Math.round(Math.random() * (this._possibilityList.length - 1));
        this._lastActionId = this._possibilityList[index];
        try {
            let callback = this._possibilityMap[this._lastActionId];
            callback();
        } catch (error) {
            console.error(error);
        }
        return this._lastActionId;
    }

    positive(actionId) {
        // buff
        actionId = actionId || this._lastActionId;
        if (!actionId) {
            return;
        }
        let step = this._positiveStep;
        while(step-- > 0){
            this._possibilityList.push(actionId);
        }
        this._lastActionId = null;
    }

    passive(actionId) {
        // debuff
        actionId = actionId || this._lastActionId;
        if (!actionId) {
            return;
        }
        let step = this._passiveStep;
        while(step-- > 0 && this._possibilityList.indexOf(actionId) > -1){
            let index = this._possibilityList.indexOf(actionId);
            this._possibilityList.splice(index, 1);
        }
        this._lastActionId = null;
    }

    normal(actionId) {
        actionId = actionId || this._lastActionId;
        if (!actionId) {
            return;
        }
        let step = this._normalStep;
        while(step-- > 0){
            this._possibilityList.push(actionId);
        }
        this._lastActionId = null;
    }

    on(){
        this._enable = true;
    }

    off(){
        this._enable = false;
    }
}