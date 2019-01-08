const fs = require('fs');
let logList = [''];
let log = (...args) => {
    // console.log(args);
    let str = args[0];
    let strs = '';
    if (args.length > 1) {
        strs = str.split('%s');
        if (strs.length == 1) {
            for (let i = 1, j = args.length; i < j; i++) {
                str += args[i];
            }
        } else {
            str = '';
            for (let i = 0, j = strs.length; i < j; i++) {
                str += (strs[i] + (args[i + 1] || ''));
            }
        }
    }
    console.log(str);
    logList.push(str);
}

let writeLog = () => {
    if (!logList.length) {
        return;
    }
    fs.open('./log.log', 'a', (err, fd) => {
        if (err) {
            console.log('__LOG__: ERROR ' + err);
            return;
        }
        fs.writeFile(fd, logList.join('\n'), (err) => {
            if (err) {
                console.log('__LOG__: ERROR ' + err);
            }
            logList = [''];
            fs.close(fd, (err) => {
                if (err) {
                    console.log('__LOG__: ERROR ' + err);
                } else {
                }
            });
        });
    });
}

let timer1 = -1;
let timer2 = -1;
let startWrite = () => {
    timer1 = setInterval(writeLog, 10000);
}

let clearLogFile = () => { 
    fs.open('./log.log', 'w', (err, fd) => {
        if (err) {
            console.log('__LOG__: ERROR ' + err);
            return;
        }
        fs.writeFile(fd, '', (err) => {
            if (err) {
                console.log('__LOG__: ERROR ' + err);
            }
            logList = [''];
            fs.close(fd, (err) => {
                if (err) {
                    console.log('__LOG__: ERROR ' + err);
                } else {
                    console.log('__LOG__: CLEAR! ');
                }
            });
        });
    });
}

clearLogFile();

startWrite();

module.exports = {
    log: log,
    out: () => {
        this.log('logger out!');
        writeLog();
        clearInterval(timer1);
    }
};

// log('1234');
// log('1234', 100);
// log('12%s34', 100);
// log('1234%s', 100);
// console.log(logList);