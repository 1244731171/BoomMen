/**
 * @description: 返回直线斜率
 * @param {number} x1 
 * @param {number} y1 
 * @param {number} x2 
 * @param {number} y2 
 */
let getA = (x1, y1, x2, y2) => {
    return (y1 - y2) / (x1 - x2);
}

/**
 * @description: 返回位移
 * @param {number} x 
 * @param {number} y 
 * @param {number} a 
 */
let getB = (x, y, a) => {
    return y - a * x;
}

/**
 * @deprecated: 返回相交点X
 * @param {number} a1 
 * @param {number} b1 
 * @param {number} a2 
 * @param {number} b2 
 */
let getX = (a1, b1, a2, b2) => {
    return (b2 - b1) / (a1 - a2);
}

/**
 * @deprecated: 返回相交点Y
 * @param {number} a 
 * @param {number} x
 * @param {number} b
 */
let getY = (a, x, b) => {
    return a * x + b;
}

let createLine = (x1, y1, x2, y2) => {
    return {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
    }
}

let getLineInfo = (line) => {
    let x1 = line.x1;
    let y1 = line.y1;
    let x2 = line.x2;
    let y2 = line.y2;

    let a = getA(x1, y1, x2, y2);
    let b = getB(x1, y1, a);

    return {
        a: a,
        b: b
    };
}

let getCrashPoint = (line1, line2) => {
    let a1 = line1.a;
    let b1 = line1.b;
    let a2 = line2.a;
    let b2 = line2.b;

    let x = getX(a1, b1, a2, b2);
    console.log('xxxxxx',x);
    let y = getY(a1, x, b1);
    console.log('yyyyyy',y);
    return {
        x: x,
        y: y
    };
}

let checkIsCrash = (x1, y1, x2, y2, a1, b1, a2, b2) => {
    let line1, line2;
    if(typeof x1 === 'object' && typeof x1 === 'object'){
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
    }else{
        line1 = createLine(x1, y1, x2, y2);
        line2 = createLine(a1, b1, a2, b2);
    }
        
    let line1Info = getLineInfo(line1);
    let line2Info = getLineInfo(line2);

    if(line1Info.a === line2Info.a) {
        return false;
    }

    let point = getCrashPoint(line1Info, line2Info);
    let x = point.x;
    let y = point.y;

    if((Math.min(x1, x2) <= x && x <= Math.max(x1, x2))
    && (Math.min(a1, a2) <= x && x <= Math.max(a1, a2))
    && (Math.min(y1, y2) <= y && y <= Math.max(y1, y2))
    && (Math.min(b1, b2) <= y && y <= Math.max(b1, b2))){
        return true;
    }else{
        return false;
    }
}

let line1 = createLine(0, 0, 1, 1);
let line2 = createLine(0, 0, 2, 2);
let line3 = createLine(0, 4, 4, 0);

let line1Info = getLineInfo(line1);
let line2Info = getLineInfo(line2);
let line3Info = getLineInfo(line3);

let point13 = getCrashPoint(line1Info, line3Info);
let point23 = getCrashPoint(line2Info, line3Info);

let isCrash12 = checkIsCrash(line1, line3);
let isCrash23 = checkIsCrash(line2, line3);

console.log('line1 >>>>>', JSON.stringify(line1));
console.log('line1 info >>>>>', JSON.stringify(line1Info));
console.log('\n');
console.log('line2 >>>>>', JSON.stringify(line2));
console.log('line2 info >>>>>', JSON.stringify(line2Info));
console.log('\n');
console.log('line3 >>>>>', JSON.stringify(line3));
console.log('line3 info >>>>>', JSON.stringify(line3Info));
console.log('\n');
console.log('line1, line3 crash point >>>>>', JSON.stringify(point13));
console.log('line2, line3 crash point >>>>>', JSON.stringify(point23));
console.log('\n');
console.log('line2, line3 is crash ? >>>>>', isCrash12);
console.log('line1, line3 is crash ? >>>>>', isCrash23);

