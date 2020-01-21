const fs = require("fs");
const path = require("path");

module.exports = {
    getList(id, type , isBoss = false){
        return {
            length: 100,
            index: 1,
            data:[]
        }
    },
    getTags(isBoss = false) {

    },
    getLessons(isBoss = false){
        return {
            length: 100,
            index: 1,
            data:[]
        }
    },
    getHot(isBoss = false){

    },
    getNew(isBoss = false){

    }
}