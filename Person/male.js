// sex
const SEX_F = 'XX';
const SEX_M = 'XY';
const _SEX_M = 'YX';

const PERSON = require('./person');

module.exports = class FAMALE extends PERSON {
    constructor() {
        super();
        this.dna.dna.static.sex = SEX_M;
    }
}