const fs = require('fs');

let dataNew = fs.readFileSync('./p_n.txt', 'utf8');
let dataOld = fs.readFileSync('./p_o.txt', 'utf8');

// console.log(dataNew);
// console.log(dataOld);

let matchUid = (target) => {
    return target.match(/(\&|\?)u\=([a-z]|[0-9]){32}/g) || target.match(/ ([a-z]|[0-9]){32} /g) || [];
}
let matchDate = (target) => {
    return target.match(/stime\=([0-9]){13}/g) || target.match(/\"[0-9]{13}\"/g) || target.match(/ [0-9]{13} /g) || [''];
}
let matchDateStr = (target) => {
    return matchDate(target)[0].toString().replace('stime=', '').replace(/"/g, '').replace(/ /g, '');
}
let matchFlashVersion = (target) => {
    return target.match(/plyrv\=3\.3\.12\.33/g) || [];
}
let matchH5Version = (target) => {
    return target.match(/v\=4\.1\.8/g) || [];
}

// console.log(matchDate(dataNew));
// console.log(matchDate(dataOld));

// return;
console.log('=================  NEW ================');

let b = dataNew.split('\n');
console.log(`new data length: ${b.length}`);
let c = matchUid(dataNew);
// let c = dataNew.match(/(\&|\?)ptid\=([0-9]){20}/g);
console.log(`new match u=xxx length: ${c.length}`);
let nu = {};
c.forEach(e => {
    let id = e.replace('?u=', '').replace('&u=', '').replace(/ /g, '');
    // let id = e.replace('?ptid=','').replace('&ptid=','');
    let uid = nu[id];
    nu[id] = uid === undefined ? 1 : uid + 1;
});
let newUserLength = 0;
for (let uid in nu) {
    newUserLength++;
    // console.log(`uid: ${uid} , len: ${nu[uid]} , per: ${(nu[uid] / c.length * 100).toFixed(2)}`);
}

console.log('================= OLD ================');

let ob = dataOld.split('\n');
console.log(`old data length: ${ob.length}`);
let oc = matchUid(dataOld);
// let oc = dataOld.match(/(\&|\?)ptid\=([0-9]){20}/g);
console.log(`old match u=xxx length: ${oc.length}`);
let ou = {};
oc.forEach(e => {
    let id = e.replace('?u=', '').replace('&u=', '').replace(/ /g, '');
    // let id = e.replace('?ptid=','').replace('&ptid=','');
    let uid = ou[id];
    ou[id] = uid === undefined ? 1 : uid + 1;
});
let oldUserLength = 0;
for (let uid in ou) {
    oldUserLength++;
    // console.log(`uid: ${uid} , len: ${ou[uid]} , per: ${(ou[uid] / oc.length * 100).toFixed(2)}`);
}

console.log('================= OLD & NEW compare ================');

let sameUserLength = 0;
let diffUserList = [];
let allDataLength = 0;
let sameUserOldDataLength = 0;
let sameUserNewDataLength = 0;
let sameUserDiffData = [];
for (let uid in ou) {
    allDataLength++;
    if (nu[uid]) {
        sameUserOldDataLength += ou[uid];
        sameUserNewDataLength += nu[uid];
        sameUserLength++;
        console.log(`uid: ${uid} , old_len: ${ou[uid]}, new_len: ${nu[uid]}, diff(new/old): ${(nu[uid] / ou[uid] * 100).toFixed(2)}%`);
        if(ou[uid] != nu[uid]){
            sameUserDiffData.push(uid);
        }
    } else {
        diffUserList.push({
            id: uid,
            data: ou[uid]
        });
    }
}
// console.log(`not in new data uid: \n ${JSON.stringify(diffUserList)}`);
console.log(`same user data in old data per: ${(sameUserOldDataLength / ob.length * 100).toFixed(2)}%`);
console.log(`same user data in new data per: ${(sameUserNewDataLength / b.length * 100).toFixed(2)}%`);
console.log(`old user length = ${oldUserLength} ; new user length = ${newUserLength}; same user length = ${sameUserLength}`);
console.log(`same user with diff data: ${sameUserDiffData.join(' , ')}`);

console.log('================= OLD DATA ==========================');
let oldDate = {};
let oldDateArr = [];
ob.forEach(e=>{
    let date = parseInt(matchDateStr(e));
    oldDateArr.push((date));
    if(e.indexOf(sameUserDiffData[1]) != -1){
        // console.log(e);
        let odd = oldDate[date];
        oldDate[date] = odd === undefined ? 1 : odd + 1;
        console.log(`${date} === ${new Date((date))}`);
    }
});
// for(let odk in oldDate){
//     console.log(`date: ${odk}, times: ${oldDate[odk]}`);
// }
console.log('================= NEW DATA ==========================');
let newDateArr = [];
b.forEach(e=>{
    let date = parseInt(matchDateStr(e));
    newDateArr.push((date));
    if(e.indexOf(sameUserDiffData[1]) != -1){
        // console.log(e);
        // let date = e.match(/stime\=([0-9]){13}/g)[0].replace('stime=', '');
        // newDateArr.push(parseInt(date));
        console.log(`${date} === ${new Date((date))}`);
    }
});

console.log(`\n ========== CHECK OLD & NEW DATE ========== \n`);

oldDateArr.sort();
newDateArr.sort();
console.log(`old. date form ${new Date(oldDateArr[0])} to ${new Date(oldDateArr[oldDateArr.length - 1])}`);
console.log(`old. date form ${new Date(newDateArr[0])} to ${new Date(newDateArr[newDateArr.length - 1])}`);
let invalidDateLength = 0;
for (let i = 0; i < oldDateArr.length; i++) {
    if(oldDateArr[i] > newDateArr[0]){
        console.log(`invalid data from old case date, length: ${i}`);
        break;
    }
}

let ov1 = dataOld.match(/v\=4\.1\.8/g) || [];
let ov2 = dataOld.match(/plyrv\=3\.3\.12\.33/g) || [];
let nv1 = dataNew.match(/v\=4\.1\.8/g) || [];
let nv2 = dataNew.match(/plyrv\=3\.3\.12\.33/g) || [];

console.log(`\n ========== CHECK OLD & NEW VERSION ========== \n`);

console.log(`version: plyrv length: ${ov2.length}, v length: ${ov1.length}; \n v total length: ${ov1.length + ov2.length}; data length ${ob.length};`);
console.log(`version: plyrv length: ${nv2.length}, v length: ${nv1.length}; \n v total length: ${nv1.length + nv2.length}; data length ${b.length};`);

console.log(`\n ========== CHECK SAME DATE ========== \n`);

// let oldDateSameDate = matchDate(dataOld);
let oldDateSameDate = matchDate(dataNew);
let oldDateSameDateMap = {};
oldDateSameDate.forEach(e=>{
    let id = parseInt(e.replace('stime=', '').replace(/"/g, '').replace(/ /g, ''));
    let odsmid = oldDateSameDateMap[id];
    oldDateSameDateMap[id] = odsmid === undefined ? 1 : odsmid + 1;
});
let oldDataSameDateLength = 0;
let oldDataNotSameDateLength = 0;
let oldDateLength = 0;
for(let did in oldDateSameDateMap){
    oldDateLength++;
    if(oldDateSameDateMap[did] !== 1){
        oldDataSameDateLength += oldDateSameDateMap[did];
        console.log(`get same date in old data: ${did}, length: ${oldDateSameDateMap[did]}`);
    }else{
        oldDataNotSameDateLength++;
    }
}
console.log(`total: ${oldDateLength}, same: ${oldDataSameDateLength}, diff: ${oldDataNotSameDateLength}`);
console.log(`same date in old data percent: ${oldDataSameDateLength / oldDateLength}`);

console.log(`\n ========== DIFF USER ========== \n`);

let targetUid = '';
// for(let d of diffUserList){
//     if(d.data === 1){
//         targetUid = d.id;
//         break;
//     }
// }
// console.log(`target uid: ${targetUid}`);
// for(let s of ob){
//     if(s.indexOf(targetUid) !== -1){
//         console.log(matchDateStr(s));
//         console.log(`is Flash: ${matchFlashVersion(s).length > 0}`);
//         console.log(`is H5: ${matchH5Version(s).length > 0}`);
//         break;
//     }
// }

// console.log(`diff user, length: ${diffUserList.length};`);

// diffUserList.sort((a,b)=>{
//     return b.data - a.data;
// });
// console.log(JSON.stringify(diffUserList[0]));
// targetUid = diffUserList[0].id;
// for(let s of ob){
//     diffUserList.forEach(e=>{
//         let id = e.id;
//         if(s.indexOf(id) !== -1){
//             let v = matchFlashVersion(s)[0] || matchH5Version(s)[0];
//             console.log(`date: ${new Date(parseInt(matchDateStr(s)))}; version: ${v}`);
//         }
//     });
//     // if(s.indexOf(targetUid) !== -1){
//     //     let v = matchFlashVersion(s)[0] || matchH5Version(s).length > 0;
//     //     console.log(`date: ${new Date(parseInt(matchDateStr(s)))}; version: ${v}`);
//     // }
// }