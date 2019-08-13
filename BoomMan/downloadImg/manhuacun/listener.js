list = {};
module.exports = {
    on: (type, callback) => {
        if (!list[type]) {
            list[type] = [];
        }
        list[type].push(callback);
    },
    fire: (type) => {
        if(!list[type]){
            return;
        }
        list[type].forEach(e => {
            e();
        });
    }
}