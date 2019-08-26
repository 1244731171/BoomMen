let Tool = {
    random: (a = 1, b = 0, d = 0) => {
        let c = Tool.compare(a, b);
        if (d !== 0) {
            return parseFloat((Math.random() * (c.max - c.min) + c.min).toFixed(d));
        } else {
            return parseInt((Math.random() * (c.max - c.min) + c.min).toFixed(d));
        }
    },
    compare: (a, b = 0) => {
        return {
            min: Math.min(a, b),
            max: Math.max(a, b)
        };
    },
};

module.exports = Tool;