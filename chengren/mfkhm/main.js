const chapter = require('./chapter');
const image = require('./image');
const download = require('./download');
const log = require('./logger');

const fs = require('fs');

let id = 569;
let _bookInfo = {};

let bookList = fs.readFileSync("./target.json", "utf-8");
bookList = JSON.parse(bookList);
log(`target json length is ${bookList.length}`);

let temp = fs.readFileSync("./temp.html", "utf-8");

let out = () => {
    fs.writeFileSync(`./output/${_bookInfo.name}.json`, JSON.stringify(_bookInfo));
    log(`${_bookInfo.name}.json is created successful!`);
}
let isDownload = false;
let isReq = 0;
let isLast = false;

let afterDownloadAll = () => {
    if(isDownload && isLast){
        // doNext();
    }
}

let doNext = (id) => {
    id = id || bookList.shift();
    _bookInfo = {};

    isDownload = false;
    isReq = 0;
    isLast = false;

    chapter.get(id, (chapter_data) => {
        let { name, chapters } = chapter_data;
        log(`book => charpter: ${name}; ${'\n'}${chapters.join('\n')}`);

        try {
            let localBookInfo = fs.readFileSync(`./output/${name}.json`, "utf-8");
            if (localBookInfo) {
                localBookInfo = JSON.parse(localBookInfo || "");
                if (localBookInfo.chaptersUrl.length == chapters.length) {
                    log('exist BOOK JSON');
                    return;
                    // return doNext();
                } else {
                    log('length not = ');
                }
            } else {
                log('null json');
            }
        } catch (e) {
        }

        _bookInfo.name = name;
        _bookInfo.id = id;
        _bookInfo.chaptersUrl = chapters;
        _bookInfo.chapters = [];
        try {
            fs.mkdirSync(`e:/hanman2/${_bookInfo.name}/`);
        } catch (error) { }
        let checkNextChapter = (chapters, index) => {
            let chapterUrl = chapters[index];
            if (chapterUrl) {
                isReq++;
                image.get(chapterUrl, (image_data) => {
                    let { name, images } = image_data;
                    log(`charpter => image:${name};${'\n'}${images.join('\n')}`);
                    let _chapterInfo = {
                        name: name,
                        images: images,
                        path: `e:/hanman2/${_bookInfo.name}/${index}_${name}/`
                    };
                    _bookInfo.chapters.push(_chapterInfo);

                    try {
                        fs.mkdirSync(_chapterInfo.path);
                    } catch (error) { }

                    let i = 1;
                    let urls = [];
                    images.forEach((url) => {
                        download.add(url, _chapterInfo.path + i + ".jpg");
                        urls.push(`<img src="./${index}_${name}/${i}.jpg" />`);
                        i++;
                    });

                    let html = temp.replace("{{title}}", name);
                    html = html.replace("{{index}}", index);
                    html = html.replace("{{img}}", urls.join("\n"));
                    fs.writeFileSync(`e:/hanman2/${_bookInfo.name}/${index}.html`, html);

                    index++;
                    if(index === chapters.length) {
                        isLast = true;
                        log(" ==========> Last Chapters");
                    }
                    afterDownloadAll();
                    checkNextChapter(chapters, index);
                });
            } else {
                out();
                download.addAll(() => {
                    log(" ==========> Download All");
                    isDownload = true;
                    afterDownloadAll();
                });
            }
        }
        checkNextChapter(chapters, 0);
    });
}

doNext(64);
