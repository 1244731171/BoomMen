
let checkCirclesCross = (circle1, circle2) => {
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