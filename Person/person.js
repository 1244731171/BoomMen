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
            this.godMade();
        }
    }
    static SEX() {
        return this.INBORN.SEX;
    }
    static ID(){
        return this.INBORN.ID;
    }
    static MAX_AGE(){
        return this.INBORN.MAX_AGE;
    }
    static IQ(){
        return this.INBORN.IQ;
    }
    static SAN_LOW(){
        return this.ACQUIRED.SAN_LOW;
    }
    static AGE(){
        return this.STATUS.AGE;
    }
    static MONEY(){
        return this.STATUS.MONEY;
    }
    static SAN(){
        return this.STATUS.SAN;
    }
    static HP(){
        return this.STATUS.HP;
    }
    parentMade(parent) {
        let MAMA = parent[0].SEX === SEX_F ? parent[0] : parent[1];
        let BABA = parent[0].SEX !== SEX_F ? parent[0] : parent[1];

        this.INBORN.SEX = MAMA[this.random(2)] + BABA[this.random(2)];
        this.INBORN.ID = new Date().getTime();
        this.INBORN.MAX_AGE = this.random(MAMA.MAX_AGE, BABA.MAX_AGE);
        this.INBORN.IQ = this.random(MAMA.IQ, BABA.IQ);

        this.ACQUIRED.SAN_LOW = SAN_LOW;
        
        this.STATUS.AGE = 0;
        this.STATUS.MONEY = 1e3;
        this.STATUS.SAN = SAN_MAX;
        this.STATUS.HP = HP_MAX;
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
        max = Math.max(max, min);
        min = Math.min(max, min);
        return parseInt(Math.random() * (max - min)) + min;
    }
    born(){
        
    }
}