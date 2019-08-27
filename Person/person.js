// // sex
// const SEX_F = 'XX';
// const SEX_M = 'XY';
// const _SEX_M = 'YX';
// // age
// const MIN_AGE = 0;
// const MAX_AGE = 200;
// const DIF_AGE = 5;
// // iq (normal Person)
// const MIN_IQ = 80;
// const MAX_IQ = 120;
// const DIF_IQ = 10;
// // justice
// const MIN_JUSTICE = -100;
// const MAX_JUSTICE = 100;
// const DIF_JUSTICE = 10;
// // san
// const MAX_SAN = 100;
// const LOW_SAN = MAX_SAN * 0.4;
// // hp
// const MIN_HP = 0;
// const MAX_HP = 100;
// const NOR_HP = MAX_HP;
// const LOW_HP = MAX_HP * 0.1
// // pressurizeAbility
// const MIN_PRE_ABL = 0;
// const MAX_PRE_ABL = 2;
// // decompressAbility
// const MIN_DCP_ABL = 0;
// const MAX_DCP_ABL = 2;
// // learnAbility
// const MIN_LRN_ABL = 0;
// const MAX_LRN_ABL = 2;
// // energy
// const MIN_ENERGY = 0;
// const MAX_ENERGY = 100;
// const NOR_ENERGY = MAX_ENERGY * 0.6;
// const LOW_ENERGY = MAX_ENERGY * 0.1;
// // money
// const DEF_MONEY = 10000;

// // unit
// const UNIT_TIME = 10e1; // 10e2
// const UNIT_DAY_TIME = 24 * UNIT_TIME;
// const UNIT_YEAR_TIME = 30 * UNIT_TIME;
// const UNIT_HP = 1;
// const UNIT_SAN = 1;
// const UNIT_MONEY = 1;

// // money
// const SPENT_MONEY = UNIT_MONEY * 30;
// // san
// const ADD_SAN_BY_HP_PER_TIME = 1;
// const ADD_SAN_BY_SEX_PER_TIME = 10;
// const LOST_SAN_BY_WORK_PER_TIME = 2;
// const LOST_SAN_BY_DAY_PER_TIME = 2;
// const LOAD_SAN_BY_DAY_UNIT_TIME = UNIT_TIME * 15;
// // hp
// const ADD_HP_PER_TIME = 10;
// const ADD_HP_UNIT_TIME = 1;
// const LOST_HP_UNIT_TIME = 10;
// const LOST_HP_PER_TIME = 10;

const T = require('./tool');
const C = require('./config');

let checkAttr = (dna) => {

};

class DNA {
    constructor(parentA, parentB) {
        // makebaby
        if (parentA && parentB) {
            let dnaA = parentA.dna;
            let dnaB = parentB.dna;
            let sex = dnaA.sex.split("")[T.random()] + dnaB.sex.split("")[T.random()];
            if (sex === _SEX_M) {
                sex = SEX_M;
            }
            let iq = T.compare(dnaA.iq, dnaB.iq);
            let maxAge = T.compare(dnaA.maxAge, dnaB.maxAge);
            let justice = T.compare(dnaA.justice, dnaB.justice);
            this.dna = {
                static: {
                    id: new Date().getTime(),
                    sex: [C.SEX_F, C.SEX_M][T.random()],
                    iq: T.random(iq.min - C.DIF_IQ, iq.max + C.DIF_IQ), // 取值很不友好
                    maxHp: C.MAX_HP,
                    maxVit: C.MAX_VIT
                },
                dynamic: {
                    maxAge: T.random(maxAge.min - C.DIF_AGE, maxAge.max + C.DIF_AGE),
                    justice: T.random(justice.min - C.DIF_JUSTICE, justice.max + C.DIF_JUSTICE)
                }
            };
        } else if (parentA) {
            // clone
            this.dna = parentA.dna;
        } else {
            // godson
            this.dna = {
                static: {
                    id: new Date().getTime(),
                    sex: [C.SEX_F, C.SEX_M][T.random()],
                    iq: T.random(parseInt(C.MAX_IQ * 0.8), C.MAX_IQ), // 取值很不友好
                    maxHp: C.MAX_HP,
                    maxVit: C.MAX_VIT
                },
                dynamic: {
                    maxAge: T.random(parseInt(C.MAX_AGE * 0.3), C.MAX_AGE),
                    justice: T.random(C.MIN_JUSTICE, C.MAX_JUSTICE)
                }
            };
        }
    }
    get id() {
        return this.dna.static.id;
    }
    get sex() {
        return this.dna.static.sex;
    }
    get iq() {
        return this.dna.static.iq;
    }
    get maxHp() {
        return this.dna.static.maxHp;
    }
    get maxAge() {
        return this.dna.dynamic.maxAge;
    }
    get justice() {
        return this.dna.dynamic.justice;
    }
    set id(id) { }
    set sex(sex) { }
    set iq(iq) { }
    set maxHp(hp) { }
    set maxAge(age) {
        this.dna.dynamic.maxAge = age;
    }
    set justice(justice) {
        this.dna.dynamic.justice = justice;
    }
}

module.exports = class PERSON {
    constructor(parent) {
        if (parent) {
            this.dna = new DNA(parent[0], parent[1]);
        } else {
            this.dna = new DNA();
        }
        this.attr = [];
        this.status = {
            age: 0,
            energy: C.NOR_ENERGY,
            hp: C.NOR_HP,
            vit: C.MAX_VIT,
            san: C.MAX_SAN,
            money: C.DEF_MONEY,
            source: {}
        };
        this.checkAttr();
        // this.startHeartBeat();
    }
    checkAttr() { }
    get id() {
        return this.dna.id;
    }
    get sex() {
        return this.dna.sex;
    }
    get iq() {
        return this.dna.iq;
    }
    get maxHp() {
        return this.dna.maxHp;
    }
    get maxAge() {
        return this.dna.maxAge;
    }
    get maxVit() {
        return this.dna.maxVit;
    }
    get justice() {
        return this.dna.justice;
    }
    get age() {
        return this.status.age;
    }
    set age(age) {
        this.status.age = age;
    }
    get energy() {
        return this.status.energy;
    }
    get hp() {
        return this.status.hp;
    }
    get vit() {
        return this.status.vit;
    }
    set vit(vit) {
        this.status.vit = vit;
    }
    get san() {
        return this.status.san;
    }
    get money() {
        return this.status.money;
    }
    get source() {
        return this.status.source;
    }
    /** 
     * CONSCIOUSNESS 意识
    */
    checkStatus() {
        if(!this.checkAge()){
            this.say(`${this.id} is dead by too old!`);
            this.stopHeartBeat();
            return;
        }
        this.vit = this.vit - C.LOST_VIT_UNIT_TIME;
        this.checkVIT();
        if(!this.checkHp()){

        }
        console.log(JSON.stringify(this.status));
    }
    checkAge() {
        this.age = this.age + C.UNIT_TIME;
        if (this.age >= this.maxAge * C.UNIT_YEAR_TIME) {
            return false;
        } else {
            return true;
        }
    }
    checkHp(){

    }
    checkVIT(){
        if(this.vit < C.LOW_VIT){
            if(this.checkEat){
                this.eat();
            }
            if(this.vit <= 0){
                this.vit = 0;
                this.hp = this.hp - C.LOST_HP_BY_LOW_VIT_PRE_TIME;
                this.checkHp();
            }
        }
    }
    get checkEat() {
        return this.checkMoney(C.ADD_VIT_COST_MONEY_PER_TIME);
    }
    get checkMoney(money) {
        return this.money - money > 0;
    }
    /** 
     * BEHIVE 行为
    */
    makeBaby() {
        // new person
    }
    eat() {
        // add vit
        
    }
    relex() {
        // decompress
    }
    work() {
        // add money add source
    }
    communicate() {
        // decompress
    }
    say(str){
        // console
        console.log(str);
    }
    startHeartBeat(timer) {
        let self = this;
        self.timer = timer;
        self.eventId = timer.on('timeupdate', self.checkStatus.bind(self));
    }
    stopHeartBeat() {
        this.timer.off('timeupdate', this.eventId);
    }
}