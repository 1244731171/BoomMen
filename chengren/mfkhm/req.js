const request = require('request');

let opts_pc = {
    method: 'GET',
    headers: {
        'Content-Type': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36',
        'Cookie': 'UM_distinctid=16e447ddad771f-02ef374e4453095-54123110-1fa400-16e447ddad8947; _ga=GA1.2.1616809352.1573107139; PHPSESSID=ktsn3rr1fskv6suuqnks6l8hst; Hm_lvt_b758f643969ba87ea94388bba92a2673=1573188202,1573288303,1573793481,1573908266; __51cke__=; _gid=GA1.2.544437722.1573908300; nav_switch=booklist; CNZZDATA1278024109=1836593598-1573103611-https%253A%252F%252Fwww.google.com%252F%7C1573912330; _gat_gtag_UA_83227386_4=1; Hm_lpvt_b758f643969ba87ea94388bba92a2673=1573913262; __tins__20389389=%7B%22sid%22%3A%201573913242810%2C%20%22vd%22%3A%202%2C%20%22expires%22%3A%201573915061711%7D; __51laig__=7'
    }
};
let opts_mobile = {
    method: 'GET',
    headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Content-Type': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'user-agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Mobile Safari/537.36',
        // 'Cookie': 'UM_distinctid=16e447ddad771f-02ef3744453095-54123110-1fa400-16e447ddad8947; _ga=GA1.2.1616809352.1573107139; __cfduid=dea7a4463264f5d1d68c309b1884f182d1573917067; nav_switch=booklist; PHPSESSID=ihbds6lshcc5acjnaq6a9f8ind; CNZZDATA1278024109=1836593598-1573103611-https%253A%252F%252Fwww.google.com%252F%7C1582263747; Hm_lvt_b758f643969ba87ea94388bba92a2673=1581066798,1581067643,1581579293,1582264523; _gid=GA1.2.789825824.1582264524; Hm_lpvt_b758f643969ba87ea94388bba92a2673=1582264799; _gat_gtag_UA_83227386_4=1'
    }
};

let req = (opts, callback, retryTimes) => {
    request(opts, (err, res, body) => {
        if (err || res.statusCode !== 200) {
            console.log(`ERROR! retry: ${retryTimes}, ${(err || res.statusCode)}`);
            if (retryTimes < 2) {
                retryTimes++;
                req(opts, callback, retryTimes);
            } else {
                callback("", 'ERROR');
            }
        } else {
            callback(body);
        }
    });
}

module.exports = {
    get: (options) => {
        let retryTimes = 0;
        let { url, callback, type } = options;
        console.log(`request url: ${url}`);
        let opts = {};
        if (type) {
            opts = opts_mobile;
        } else {
            opts = opts_pc;
        }
        opts.url = url;
        req(opts, callback, retryTimes);
        // setTimeout(function() {
        //     request(opts, (err, res, body) => {
        //         if (err || res.statusCode !== 200) {
        //             console.log(err || res.statusCode);
        //             callback("", 'ERROR');
        //         } else {
        //             callback(body);
        //         }
        //     });
        // }, 1500);
    }
}