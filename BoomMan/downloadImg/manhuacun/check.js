const request = require('request');
const jsdom = require("jsdom");
const fs = require("fs");
const download = require("./download");
let cookie = fs.readFileSync("./cookie.txt");
// const path = require('path'); 
const { JSDOM } = jsdom;

const PATH = 'e:/hanman/';

let jsonData = [];
let jsonMap = {};
let htmlData = [];

let exists = (path) => {
    return fs.existsSync(path);// || path.existsSync(path);
}

let isFile = (path) => {
    return exists(path) && fs.statSync(path).isFile();
}

let isDir = (path) => {
    return exists(path) && fs.statSync(path).isDirectory();
}

let isCheckingNet = 0;
let checkNetCharpter = (id, name) => {
    isCheckingNet++;
    // Set the headers for the request
    let headers = {
        'Content-Type': 'application/json',
        'Cookie': cookie
    };
    // Configure the request
    let options = {
        url: `http://www.mh009.com/Mhpc/mhinfo.php?mhid=${id}`,
        method: 'GET',
        headers: headers
    };
    request(options, (err, res, body) => {
        if (err) {
            bookMap[name]['net_length'] = -1;
            bookMap[name]['url'] = options.url;
        } else {
            // let charpters = body.match(/第\d{1,2}話/g) || [];
            let charpters = body.match(/\<p class\=\"subtitle\"\>/g) || [];
            let len = charpters.length;
            // while(len > 0 && (body.indexOf(`第${len}話`) === -1 && body.indexOf(`第${len}话`) === -1)){
            //     len--;
            // }
            bookMap[name]['net_length'] = len;
            bookMap[name]['url'] = options.url;
        }
        isCheckingNet--;
        checkEnd();
    });
}

let checkLocalHtml = (name) => {
    let dir = PATH + name;
    let html = dir + '/localHtml/';
    if (isDir(dir) && isDir(html)) {
        let localHtml = fs.readdirSync(html);
        // bookMap[path]['html'] = localHtml;
        bookMap[name]['html_length'] = localHtml.length;
    }
}

let checkJsonData = (name) => {
    let jsonPath = name + "/data.json"
    if (isDir(name) && isFile(jsonPath)) {
        bookMap[name]['download'] = true;
        let data = JSON.parse(fs.readFileSync(jsonPath) || "[]");
        bookMap[name]['json_length'] = data.length;
    } else {
        bookMap[name]['download'] = false;
        bookMap[name]['json_length'] = 0;
    }
}

let checkEnd = () => {
    if (isCheckingNet === 0 && isLoopBook) {
        bookData = [];
        for (let name in bookMap) {
            let book = bookMap[name];
            bookData.push(book);
            if (!book['download']) {
                console.log(`${name} is not download`);
            } else if (book['net_length'] != book['json_length'] || book['json_length'] != book['html_length']) {
                console.log(`net_length=${book['net_length']}, json_length=${book['json_length']}, html_length=${book['html_length']}`);
                console.log(JSON.stringify(book));
            }
        }
        fs.open('./netData.json', 'w', (err, fd) => {
            if (err) {
            }
            let str = JSON.stringify(bookData);
            fs.writeFile(fd, str, (err) => {
                if (err) {
                }
                fs.close(fd, (err) => {
                    console.log('saved');
                });
            });
        });
    }
}

let bookData = fs.readFileSync('./data.json');
bookData = JSON.parse(bookData);
let bookMap = {};
let isLoopBook = false;
bookData.forEach(e => {
    bookMap[e.name] = e
    checkNetCharpter(e.id, e.name);
    checkLocalHtml(e.name);
    checkJsonData(e.name);
});
isLoopBook = true;