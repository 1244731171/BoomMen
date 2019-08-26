const PERSON = require('./person');
const MALE = require('./male');
const FAMALE = require('./famale');
const EVENT = require('./event');

let eventer = new EVENT();

let adam = new FAMALE();
let eva = new MALE();

let theone = new PERSON(adam, eva);

console.log(`theone: {id:${theone.id},sex:${theone.sex},iq:${theone.iq},hp:${theone.maxHp},justice:${theone.justice},age:${theone.maxAge}}`)
// console.log(`theone: {id:${thateone.id},sex:${thateone.sex},iq:${thateone.iq},hp:${thateone.maxHp},justice:${thateone.justice},age:${thateone.maxAge}}`)
