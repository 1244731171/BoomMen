let fs = require('fs'); // 文件系统模块
let Request = require('request')

let data = [];
let orgdata = { "cangjingyouxiang": ["10162", "11289", "11479", "11709", "12339", "12501", "12800", "12838", "13216", "13535", "13705", "13714", "13762", "13784", "14246", "14280", "14327", "14496", "14704", "14989", "15335", "16252", "16584", "16727", "17636", "17672", "17736", "18017", "18371", "18744", "18747", "9799"], "daji": ["10185", "10474", "10618", "10706", "10733", "10828", "11451", "11590", "11597", "11599", "11833", "12352", "12657", "12660", "12661", "12937", "12998", "13501", "13505", "13943", "14268", "14272", "14274", "14278", "14487", "14492", "14697", "14700", "15246", "15250", "15257", "15593", "15792", "16190", "16194", "16403", "16467", "16471", "16825", "16830", "17355", "17548", "17559", "17730", "17733", "17772", "17796", "17817", "17820", "17825", "17826", "17930", "18163", "18186", "18194", "18296", "18303", "18480", "18522", "18636", "18641", "18713", "18752", "18903", "18908", "19011", "7584", "7882", "8548", "8955", "9216", "9754"], "fengmumu": ["10379", "10745", "10773", "12960", "13538", "14997", "15342", "15677", "15681", "15685", "15985", "16164", "16545", "16730", "16832", "17353", "17542", "17798", "17800", "18103", "18106", "18118", "18129", "18135", "18171", "18430", "18433", "18442", "18452", "18502", "18710", "18769", "19060", "7460", "8271", "8274"], "liuyuer": ["10476", "10487", "10738", "11356", "11541", "11553", "11751", "11767", "11788", "12237", "12353", "12354", "12543", "12625", "12626", "12629", "12813", "12815", "12816", "12936", "13008", "13480", "13682", "13744", "13750", "13754", "13941", "13945", "13948", "14269", "14273", "14489", "15245", "15254", "15584", "15587", "15590", "15595", "15790", "15794", "15796", "16076", "16605", "16829", "17783", "17799", "17804", "7827", "8235"], "mengxinyue": ["10105", "10341", "10444", "11642", "12889", "12890", "13642", "14116", "14559", "14599", "14626", "14649", "15183", "15484", "15723", "17386", "18086", "18888", "19031", "19047", "19049", "8229", "8579", "8590", "8720", "8981", "9428", "9429", "9567", "9614"], "shenjiaxi": ["10320", "11359", "11554", "11769", "3271", "3430", "3512", "4960", "5730", "5734", "7263", "7693", "7698", "7914", "7919", "7924", "8329", "8337", "8338", "8605", "8607", "8617", "9018"], "wangyuchun": ["10586", "11363", "11473", "11693", "11694", "11695", "11700", "11835", "12205", "12363", "12369", "12375", "12393", "12398", "12402", "12404", "12408", "12841", "12943", "13209", "13213", "13229", "13552", "13777", "13862", "13863", "14107", "14334", "14565", "15008", "15009", "15209", "15419", "15439", "15445", "15522", "15525", "15680", "15764", "15785", "15870", "15921", "15958", "16010", "16071", "16263", "16295", "16298", "16437", "16731", "16758", "16766", "16819", "17304", "17321", "17546", "17557", "17560", "17564", "17568", "17731", "17751", "17775", "17778", "17786", "17810", "17816", "17822", "17829", "17927", "18178", "18183", "18189", "18195", "18294", "18297", "18302", "18518", "18523", "18643", "18693", "18721", "18724", "18753", "18754", "19003", "3652", "4284", "4287", "4289", "4292", "4300", "4302", "4308", "4975", "5054", "5077", "5196", "5226", "5855", "5866", "6405", "6863", "7462", "7464", "7717", "7947", "9197"], "younisi": ["12931", "12934", "12938", "13007", "13502", "13504", "13506", "13746", "13748", "13752", "13756", "13940", "13947", "14271", "14275", "14486", "14493", "14494", "14998", "15129", "15248", "15252", "15343", "15350", "15527", "15585", "15589", "15591", "15597", "15684", "15766", "15795", "15803", "15867", "15975", "15990", "16061", "16192", "16198", "16297", "16467", "16475", "16606", "16831", "17732", "17743", "17767", "17780", "17801", "17818", "18081", "18155", "18187", "18196", "18488", "18497", "18524", "18733", "19014"], "zhouyanxi": ["10069", "10171", "10179", "10482", "10495", "10497", "10628", "10631", "10668", "10681", "10705", "10715", "10749", "10778", "11345", "11459", "11462", "11463", "11466", "11557", "11598", "11831", "11832", "12230", "12232", "12233", "12350", "12351", "12506", "12575", "12743", "12870", "12930", "12935", "12959", "13429", "13430", "13431", "13500", "13503", "13586", "13587", "13588", "13589", "13749", "13755", "13844", "13942", "14483", "14490", "14696", "14701", "15116", "15130", "15249", "15253", "15256", "15261", "15596", "15789", "15793", "15972", "16077", "16191", "16196", "16467", "16468", "16473", "16608", "16828", "17356", "17359", "17724", "17737", "17754", "17762", "17803", "17812", "17827", "18029", "18190", "18197", "18304", "18455", "18475", "18521", "18638", "18734", "18757", "18905", "18989", "19001", "7609", "7880", "8158", "8995", "9207"], "zhukeer": ["12421", "18373", "18742", "18745", "18746", "18748", "18749", "19038", "19039", "19040", "19041", "3199", "3202", "3289", "3291", "3297", "3309", "3324", "3333", "3340", "3344", "3420", "3421", "3457", "3462", "3468", "3470", "3481", "3494", "3497", "3507", "4296", "4304", "4311", "5705"] };
let list = [
    // 沈佳熹
    11769, 11554, 11359, 10320, 9018, 8617, 8607, 8605, 8338, 8337, 8329, 7924, 7919, 7914, 7698, 7693, 7263, 5734, 5730, 4960, 3512, 3430, 3271
];

let bigdata = [];
for (var key in orgdata) {
    bigdata.push({
        name: key,
        list: orgdata[key]
    });
}

console.log(bigdata);

let name = "";
let _i = 0;
let id = list[_i];
let url;

let writedown = () => {
    let str = "";
    if (!data.length) {
        return;
    }
    // console.log(JSON.stringify(_url));
    fs.open(`./img/${name}/${id}.html`, 'w', (err, fd) => {
        if (err) {
        }
        str = data.join("");
        data = [];
        fs.writeFile(fd, str, (err) => {
            if (err) {
            }
            fs.close(fd, (err) => {
                console.log(`./img/${name}/${id}.html save!`);
                check();
            });
        });
    });
}

let check = () => {
    id = list[++_i];
    if (id) {
        rq(0, id)
    } else {
        checkBigData();
    }
}

let checkBigData = () => {
    let dd = bigdata.splice(0, 1)[0];
    if (!dd) {
        return;
    }
    name = dd.name;
    list = dd.list;
    _i = 0;
    id = list[_i];
    rq(0, id);
}

let rq = (index, id) => {
    url = `https://mtl.xtpxw.com/images/img/${id}/${index}.jpg`
    console.log(url);
    Request(url, { json: true }, (err, res, body) => {
        if (err || res.statusCode == "404") {
            writedown();
            return console.log(res.statusCode);
        }
        data.push(`<img src="../../../../../../../../meitulu/${id}_${index}.jpg"/>`);
        let local = `E:\\meitulu\\${id}_${index}.jpg`;

        fs.open(local, 'w', (err, fd) => {
            if (err) {
            }
            fs.writeFile(fd, body, (err) => {
                fs.close(fd, (err) => {
                });
            });
        });
        // fs.openSync(local)
        // fs.writeFileSync(body, local);
        index++;
        rq(index, id);
    });
}

checkBigData();