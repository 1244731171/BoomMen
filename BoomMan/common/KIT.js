class __KIT {
    constructor() {

    }

    randomFloat(min, max) {
        if (max === undefined) {
            return (Math.random() * min);
        } else {
            return (min + Math.random() * (max - min));
        }
    }

    randomInt(min, max) {
        if (max === undefined) {
            return Math.round(Math.random() * min);
        } else {
            return Math.round(min + Math.random() * (max - min));
        }
    }

    randomUInt(min, max) {
        if (max === undefined) {
            return Math.round(Math.random() * min) || randomUInt(min);
        } else {
            return Math.round(min + Math.random() * (max - min)) || randomUInt(min, max);
        }
    }
}

const KIT = new __KIT();