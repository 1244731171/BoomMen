let kit = {
    /**
     * @description: 返回直线斜率
     * @param {number} x1 
     * @param {number} y1 
     * @param {number} x2 
     * @param {number} y2 
     * @returns {number} A
     */
    getA: (x1, y1, x2, y2) => {
        let A = (y1 - y2) / (x1 - x2);
        return A;
    },
    /**
     * @description: 返回位移
     * @param {number} x 
     * @param {number} y 
     * @param {number} a 
     * @returns {number} B
     */
    getB: (x, y, a) => {
        let B = y - a * x;
        return B;
    },
    /**
     * @description: 返回相交点X
     * @param {number} a1 
     * @param {number} b1 
     * @param {number} a2 
     * @param {number} b2 
     * @returns {number} X
     */
    getX: (a1, b1, a2, b2) => {
        let X = (b2 - b1) / (a1 - a2);
        return X;
    },
    /**
     * @description: 返回相交点Y
     * @param {number} a 
     * @param {number} x
     * @param {number} b
     * @returns {number} Y
     */
    getY: (a, x, b) => {
        let Y = a * x + b;
        return Y;
    },
    /**
     * @description: 生成线段
     * @param {number} x1 
     * @param {number} y1 
     * @param {number} x2 
     * @param {number} y2 
     * @returns {object} {x1:,x2:,x3:,x4:}
     */
    createLineSegment: (x1, y1, x2, y2) => {
        return {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        }
    },
    /**
     * @description: 生成直线，斜率a和位移b
     * @param {object: lineSegment} line: 线段
     */
    getLineInfo: (line) => {
        let x1 = line.x1;
        let y1 = line.y1;
        let x2 = line.x2;
        let y2 = line.y2;

        let a = kit.getA(x1, y1, x2, y2);
        let b = kit.getB(x1, y1, a);

        return {
            a: a,
            b: b
        };
    },
    /**
     * @description: 计算两条直线的相交点
     * @param {object: lineSegment} line: 线段
     */
    getCrashPoint: (line1, line2) => {
        let a1 = line1.a;
        let b1 = line1.b;
        let a2 = line2.a;
        let b2 = line2.b;

        let x = kit.getX(a1, b1, a2, b2);
        let y = kit.getY(a1, x, b1);
        return {
            x: x,
            y: y
        };
    },

    checkIsCrash: (x1, y1, x2, y2, a1, b1, a2, b2) => {
        let line1, line2;
        if (typeof x1 === 'object' && typeof x1 === 'object') {
            line1 = x1;
            line2 = y1;
            x1 = line1.x1;
            y1 = line1.y1;
            x2 = line1.x2;
            y2 = line1.y2;
            a1 = line2.x1;
            b1 = line2.y1;
            a2 = line2.x2;
            b2 = line2.y2;
        } else {
            line1 = kit.createLineSegment(x1, y1, x2, y2);
            line2 = kit.createLineSegment(a1, b1, a2, b2);
        }

        let line1Info = kit.getLineInfo(line1);
        let line2Info = kit.getLineInfo(line2);

        if (line1Info.a === line2Info.a) {
            return false;
        }

        let point = kit.getCrashPoint(line1Info, line2Info);
        let x = point.x;
        let y = point.y;

        if ((Math.min(x1, x2) <= x && x <= Math.max(x1, x2))
            && (Math.min(a1, a2) <= x && x <= Math.max(a1, a2))
            && (Math.min(y1, y2) <= y && y <= Math.max(y1, y2))
            && (Math.min(b1, b2) <= y && y <= Math.max(b1, b2))) {
            return true;
        } else {
            return false;
        }
    }
}