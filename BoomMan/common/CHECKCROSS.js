class __CROSS {
    constructor() {

    }
    /**
     * @description: 返回直线斜率
     * @param {number} x1 
     * @param {number} y1 
     * @param {number} x2 
     * @param {number} y2 
     * @returns {number} A
     */
    getLineA(x1, y1, x2, y2) {
        if (x1 == x2) {
            return Infinity;
        }
        let A = (y1 - y2) / (x1 - x2);
        return A;
    }
    /**
     * @description: 返回位移
     * @param {number} x 
     * @param {number} y 
     * @param {number} a 
     * @returns {number} B
     */
    getLineB(x, y, a) {
        if (a == Infinity) {
            return x;
        }
        let B = y - a * x;
        return B;
    }
    /**
     * @description: 返回相交点X
     * @param {number} a1 
     * @param {number} b1 
     * @param {number} a2 
     * @param {number} b2 
     * @returns {number} X
     */
    getLineCrossPointX(a1, b1, a2, b2) {
        let X = (b2 - b1) / (a1 - a2);
        return X;
    }
    /**
     * @description: 返回相交点Y
     * @param {number} a 
     * @param {number} x
     * @param {number} b
     * @returns {number} Y
     */
    getLineCrossPointY(a, x, b) {
        let Y = a * x + b;
        return Y;
    }
    /**
     * @description: 生成线段
     * @param {number} x1 
     * @param {number} y1 
     * @param {number} x2 
     * @param {number} y2 
     * @returns {object} {x1:,x2:,x3:,x4:}
     */
    createLineSegment(x1, y1, x2, y2) {
        return {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        }
    }
    /**
     * @description: 生成直线，斜率a和位移b
     * @param {object: lineSegment} line: 线段
     */
    getLineInfo(line) {
        let x1 = line.x1;
        let y1 = line.y1;
        let x2 = line.x2;
        let y2 = line.y2;

        let a = this.getLineA(x1, y1, x2, y2);
        let b = this.getLineB(x1, y1, a);

        return {
            a: a,
            b: b
        };
    }
    /**
     * @description: 生成线段，两断点+斜率a+位移b
     * @param {object: lineSegment} line: 线段
     */
    getLineSegementInfo(x1, y1, x2, y2) {
        let a = this.getLineA(x1, y1, x2, y2);
        let b = this.getLineB(x1, y1, a);
        return {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            a: a,
            b: b
        }
    }
    /**
     * @description: 计算两条直线的相交点
     * @param {object: lineSegment} line: 线段
     */
    getLinesCrossPoint(line1, line2) {
        let a1 = line1.a;
        let b1 = line1.b;
        let a2 = line2.a;
        let b2 = line2.b;

        let x = this.getLineCrossPointX(a1, b1, a2, b2);
        let y = this.getLineCrossPointY(a1, x, b1);
        return {
            x: x,
            y: y
        };
    }

    checkLinesCross(x1, y1, x2, y2, a1, b1, a2, b2) {
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
            line1 = this.createLineSegment(x1, y1, x2, y2);
            line2 = this.createLineSegment(a1, b1, a2, b2);
        }

        let line1Info = this.getLineInfo(line1);
        let line2Info = this.getLineInfo(line2);

        if (line1Info.a === line2Info.a) {
            return false;
        }

        let point = this.getLinesCrossPoint(line1Info, line2Info);
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


    getCircleInfo(a, b, r) {
        // 圆心位置变为位移位置要取反
        return {
            x: a,
            y: b,
            a: -a,
            b: -b,
            r: r
        };
    }

    easyCheckCircleLineCross(circle, lineSegement) {
        // 只限用与线段长短与园半径差距很大的时候；
        let a = circle.a;
        let b = circle.b;
        let r = circle.r;
        let x1 = lineSegement.x1;
        let x2 = lineSegement.x2;
        let y1 = lineSegement.y1;
        let y2 = lineSegement.y2;
        let isPoint1In = (Math.pow(x1 + a, 2) + Math.pow(y1 + b, 2)) < Math.pow(r, 2);
        let isPoint2In = (Math.pow(x2 + a, 2) + Math.pow(y2 + b, 2)) < Math.pow(r, 2);
        return isPoint1In || isPoint2In;
    }

    checkCirclesCross(circle1, circle2) {
        // 只限用与线段长短与园半径差距很大的时候；
        let a1 = cirle1.a;
        let b1 = cirle1.b;
        let r1 = cirle1.r;
        let a2 = cirle2.a;
        let b2 = cirle2.b;
        let r2 = cirle2.r;

        let distances = Math.sqrt(Math.pow((a1 - a2), 2) + Math.pow(Math.pow(b1 - b2), 2));
        return distances < (r1 + r2);
    }

    getPointsDistance(point1, point2) {
        let d = Math.pow((point1.y - point2.y), 2) + Math.pow((point2.x - point1.x), 2);
        d = Math.sqrt(d);
        return d;
    }

    // 算点到直线的最小距离
    getPointLineMinDistance(point, line) {
        let x = point.x;
        let y = point.y;
        let a = line.a;
        let b = line.b;

        // 用面积法算比较简单
        // 先算 x,y 在直线上对应的点坐标
        let linePoint1 = {
            x: x,
            y: a * x + b
        };
        let linePoint2 = {
            x: (y - b) / a,
            y: y
        };

        // 算出两点距离
        let pointsDistance = this.getPointsDistance(linePoint1, linePoint2);

        return (Math.max(x, linePoint2.x) - Math.min(x, linePoint2.x)) * (Math.max(y, linePoint1.y) - Math.min(y, linePoint1.y)) / pointsDistance;
    }

    checkPointAtTheSameSide(points, line) {
        let result = {
            frontSide: [],
            backSide: [],
            online: [],
        };
        let a = line.a;
        let b = line.b;
        var x, y;

        points.forEach(point => {
            x = point.x;
            y = point.y;
            if (y > a * x + b) {
                result.frontSide.push(point);
            } else if (y < a * x + b) {
                result.backSide.push(point);
            } else {
                result.online.push(point);
            }
        });

        return result;
    }

    easyCheckLineSegementsCross(lineSegement1, lineSegement2) {
        let x1, x2, x3, x4, y1, y2, y3, y4;
        if (lineSegement1.x1 == lineSegement1.x2 && lineSegement2.x1 == lineSegement2.x2) {
            // 同垂直y轴
            y1 = lineSegement1.y1;
            y2 = lineSegement1.y2;
            y3 = lineSegement2.y1;
            y4 = lineSegement2.y2;
            if (lineSegement1.x1 != lineSegement2.x1) {
                return false;
            } else {
                return Math.max(y1, y2, y3, y4) - Math.min(y1, y2, y3, y4) <= (Math.max(y1, y2) - Math.min(y1, y2) + Math.max(y3, y4) - Math.min(y3, y4))
            }
        } else if (lineSegement1.y1 == lineSegement1.y2 && lineSegement2.y1 == lineSegement2.y2) {
            // 同垂直x轴
            // 同垂直y轴
            x1 = lineSegement1.x1;
            x2 = lineSegement1.x2;
            x3 = lineSegement2.x1;
            x4 = lineSegement2.x2;
            if (lineSegement1.y1 != lineSegement2.y1) {
                return false;
            } else {
                return Math.max(x1, x2, x3, x4) - Math.min(x1, x2, x3, x4) <= (Math.max(x1, x2) - Math.min(x1, x2) + Math.max(x3, x4) - Math.min(x3, x4))
            }
        } else {
            if (lineSegement1.x1 == lineSegement1.x2) {
                y1 = Math.min(lineSegement1.y1, lineSegement1.y2);
                y2 = Math.max(lineSegement1.y1, lineSegement1.y2);
                y3 = lineSegement2.y1;
            } else {
                y1 = Math.min(lineSegement2.y1, lineSegement2.y2);
                y2 = Math.max(lineSegement2.y1, lineSegement2.y2);
                y3 = lineSegement1.y1;
            }
            return y1 <= y3 && y3 <= y2;
        }
    }
}

const CROSS = new __CROSS();