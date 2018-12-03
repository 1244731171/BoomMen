class __CHOICE {
    constructor(possibilityList) {
        // 可能性列表
        this._possibilityList = [];
        // 可能性map
        this._possibilityMap = {};
        // 最近一次选择
        this._lastActionId = null;
        // id
        this._uid = new Date().getTime();
        // buff
        this._passiveStep = 3;
        // debuff
        this._positiveStep = 1;
        // normal
        this._normalStep = 1;

        this.initPossibility(possibilityList);
    }

    initPossibility(possibilityList) {
        // [{
        //     "actionId": 111,
        //     "actionCallback": function(){},
        //     "originTimes": 10
        // }]
        // 重置
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
}