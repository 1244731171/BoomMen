const request = require('request');

let opts = {
    method: 'GET',
    headers: {
        'Content-Type': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36',
        'Cookie': 'UM_distinctid=16e447ddad771f-02ef374e4453095-54123110-1fa400-16e447ddad8947; _ga=GA1.2.1616809352.1573107139; PHPSESSID=ktsn3rr1fskv6suuqnks6l8hst; Hm_lvt_b758f643969ba87ea94388bba92a2673=1573188202,1573288303,1573793481,1573908266; __51cke__=; _gid=GA1.2.544437722.1573908300; nav_switch=booklist; CNZZDATA1278024109=1836593598-1573103611-https%253A%252F%252Fwww.google.com%252F%7C1573912330; _gat_gtag_UA_83227386_4=1; Hm_lpvt_b758f643969ba87ea94388bba92a2673=1573913262; __tins__20389389=%7B%22sid%22%3A%201573913242810%2C%20%22vd%22%3A%202%2C%20%22expires%22%3A%201573915061711%7D; __51laig__=7'
    }
};

module.exports = {
    get: (options) => {
        let { url, callback, type } = options;
        console.log(`request url: ${url}`);
        opts.url = url;
        request(opts, (err, res, body) => {
            if(err || res.statusCode !== 200){
                console.log(err || res.statusCode);
                callback("", 'ERROR');
            }else{
                callback(body);
            }
        });
    }
}