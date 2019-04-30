const SEX_F = 'XX';
const SEX_M = 'XY';
const MAX_AGE = 120;
const MIN_IQ = 80;
const MAX_IQ = 150;
//SAN值(Sanity)（直译为理智）
const SAN_MAX = 100;
const SAN_LOW = SAN_MAX * 0.4;
const HP_MAX = 100;

// unit
const UNIT_TIME = 10e2;
const UNIT_HP = 1;
const UNIT_SAN = 1;
const UNIT_MONEY = 1;

// money
const SPENT_MONEY = UNIT_MONEY * 30;
// san
const ADD_SAN_BY_HP_PER_TIME = 1;
const ADD_SAN_BY_SEX_PER_TIME = 10;
const LOST_SAN_BY_WORK_PER_TIME = 2;
const LOST_SAN_BY_DAY_PER_TIME = 2;
const LOAD_SAN_BY_DAY_UNIT_TIME = UNIT_TIME * 15;
// hp
const ADD_HP_PER_TIME = 10;
const ADD_HP_UNIT_TIME = 1;
const LOST_HP_UNIT_TIME = 10;
const LOST_HP_PER_TIME = 10;

module.exports = class Person {
    constructor(parent) {
        this.init();
        if (parent) {
            this.parentMade(parent);
        } else {
            this.godMade(parent);
        }
    }
    static SEX() {
        return this.SEX;
    }
    parentMade() {

    }
    godMade() {
        this.INBORN.SEX = this.random(2) ? SEX_F : SEX_M;
        this.INBORN.ID = new Date().getTime();
        this.INBORN.MAX_AGE = MAX_AGE;
        this.INBORN.IQ = this.random(MAX_IQ, MIN_IQ);

        this.ACQUIRED.SAN_LOW = SAN_LOW;
        
        this.STATUS.AGE = 0;
        this.STATUS.MONEY = 1e3;
        this.STATUS.SAN = SAN_MAX;
        this.STATUS.HP = HP_MAX;
    }
    init() {
        this.INBORN = {};
        this.ACQUIRED = {};
        this.STATUS = {};
    }
    random(max, min = 0) {
        return parseInt(Math.random() * (max - min)) + min;
    }
    born(){
        
    }
}