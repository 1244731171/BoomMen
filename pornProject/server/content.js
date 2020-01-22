const fs = require("fs");
const path = require("path");

module.exports = {
    getList(id, type, isBoss = false) {
        return {
            length: 100,
            index: 1,
            data: []
        }
    },
    getTags(isBoss = false) {

    },
    getLessons(isBoss = false) {
        return {
            length: 100,
            index: 1,
            data: []
        }
    },
    getHot(isBoss = false) {
        return new Promise(function(resolve, reject) {
            resolve({
                list: [{
                    src: "/img/1.jpg",
                    dire: "con_col",
                    type: "jpg",
                    txt: "Nice Body!"
                }, {
                    src: "/img/2.jpg",
                    dire: "con_col",
                    type: "jpg",
                    txt: "Nice Body!"
                }, {
                    src: "/img/1.gif",
                    dire: "con_col",
                    type: "jpg",
                    txt: "好体位"
                }, {
                    src: "/img/2.gif",
                    dire: "con_col",
                    type: "jpg",
                    txt: "口交"
                }, {
                    src: "/img/3.gif",
                    dire: "con_col",
                    type: "jpg",
                    txt: "内射"
                }, {
                    src: "/img/4.gif",
                    dire: "con_col",
                    type: "jpg",
                    txt: "Sex"
                }, {
                    src: "/video/jiaochaung_1.mp4",
                    dire: "con_col",
                    type: "video",
                    txt: "Sex"
                }],
                index: 1,
                length: 1
            });
        });
    },
    getNew(isBoss = false) {

    }
}