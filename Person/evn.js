const PERSON = require('./person');
const MALE = require('./male');
const FAMALE = require('./famale');
const EVENT = require('./event');
const C = require('./config');

let eventer = new EVENT();
setInterval(() => {
    eventer.fire({
        type: "timeupdate",
        data: new Date().getTime()
    });
}, C.UNIT_TIME);

let adam = new FAMALE();
let eva = new MALE();

let theone = new PERSON(adam, eva);
theone.startHeartBeat(eventer);

console.log(`theone: {id:${theone.id},sex:${theone.sex},iq:${theone.iq},hp:${theone.maxHp},justice:${theone.justice},age:${theone.maxAge}}`)
// console.log(`theone: {id:${thateone.id},sex:${thateone.sex},iq:${thateone.iq},hp:${thateone.maxHp},justice:${thateone.justice},age:${thateone.maxAge}}`)
