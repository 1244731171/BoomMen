
let getCircleInfo = (a, b ,r) => {
    return {
        a: a,
        b: b,
        r: r
    };
}

let easyCheckCircleLineCross = (circle, lineSegement) => {
    // 只限用与线段长短与园半径差距很大的时候；
    let a = cirle.a;
    let b = cirle.b;
    let r = cirle.r;
    let x1 = lineSegement.x1;
    let x2 = lineSegement.x2;
    let y1 = lineSegement.y1;
    let y2 = lineSegement.y2;
    let isPoint1In = (Math.pow(x1 + a, 2) + Math.pow(y1 + b, 2)) < Math.pow(r, 2);
    let isPoint2In = (Math.pow(x2 + a, 2) + Math.pow(y2 + b, 2)) < Math.pow(r, 2);
    return isPoint1In || isPoint2In;
}