// sex
const SEX_F = 'XX';
const SEX_M = 'XY';
const _SEX_M = 'YX';
// age
const MIN_AGE = 0;
const MAX_AGE = 200;
const DIF_AGE = 5;
// iq (normal Person)
const MIN_IQ = 80;
const MAX_IQ = 120;
const DIF_IQ = 10;
// justice
const MIN_JUSTICE = -100;
const MAX_JUSTICE = 100;
const DIF_JUSTICE = 10;
// san
const MAX_SAN = 100;
const LOW_SAN = MAX_SAN * 0.4;
// hp
const MIN_HP = 0;
const MAX_HP = 100;
const NOR_HP = MAX_HP;
const LOW_HP = MAX_HP * 0.1
// pressurizeAbility
const MIN_PRE_ABL = 0;
const MAX_PRE_ABL = 2;
// decompressAbility
const MIN_DCP_ABL = 0;
const MAX_DCP_ABL = 2;
// learnAbility
const MIN_LRN_ABL = 0;
const MAX_LRN_ABL = 2;
// energy
const MIN_ENERGY = 0;
const MAX_ENERGY = 100;
const NOR_ENERGY = MAX_ENERGY * 0.6;
const LOW_ENERGY = MAX_ENERGY * 0.1;
// money
const DEF_MONEY = 10000;

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

const T = require('./tool');

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
                    sex: [SEX_F, SEX_M][T.random()],
                    iq: T.random(iq.min - DIF_IQ, iq.max + DIF_IQ), // 取值很不友好
                    maxHp: MAX_HP
                },
                dynamic: {
                    maxAge: T.random(maxAge.min - DIF_AGE, maxAge.max + DIF_AGE),
                    justice: T.random(justice.min - DIF_JUSTICE, justice.max + DIF_JUSTICE)
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
                    sex: [SEX_F, SEX_M][T.random()],
                    iq: T.random(parseInt(MAX_IQ * 0.8), MAX_IQ), // 取值很不友好
                    maxHp: MAX_HP
                },
                dynamic: {
                    maxAge: T.random(parseInt(MAX_AGE * 0.3), MAX_AGE),
                    justice: T.random(MIN_JUSTICE, MAX_JUSTICE)
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
            energy: NOR_ENERGY,
            hp: NOR_HP,
            san: MAX_SAN,
            money: DEF_MONEY,
            source: {}
        };
    }
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
    get justice() {
        return this.dna.justice;
    }
    get age() {
        return this.status.id;
    }
    get energy() {
        return this.status.sex;
    }
    get hp() {
        return this.status.iq;
    }
    get san() {
        return this.status.maxHp;
    }
    get money() {
        return this.status.maxAge;
    }
    get source() {
        return this.status.justice;
    }
    /** 
     * CONSCIOUSNESS 意识
    */
    checkStatus() {
    }
    /** 
     * BEHIVE 行为
    */
    makeBaby() {
        // new person
    }
    eat() {
        // add HP
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
}