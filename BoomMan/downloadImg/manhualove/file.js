const fs = require('fs');

let _delete = (path) => {
    if (isExists(path)) {
        fs.unlink(path);
    }
}

let isExists = (path) => {
    return fs.existsSync(path);
}

let read = (path, cb) => {
    if (!cb || typeof cb !== 'function') {
        return logger.error('__file__: ERROR! >>> callback is undefined');
    }
    fs.readFile(path, function (err, data) {
        if (err) {
            return logger.error('__file__: ERROR! >>> ', err);
        }
        cb(data);
    });
}

let write = (path, content, callback) => {
    fs.open(path, 'w', (err, fd) => {
        if (err) {
            logger.log('__file__: ERROR & unlink ' + err);
            fs.unlink(fd);
        }
        fs.writeFile(fd, content, (err) => {
            if (err) {
                logger.log('__file__: ERROR & unlink' + err);
                fs.unlink(fd);
            }
            fs.close(fd, (err) => {
                if (err) {
                    logger.log('__file__: ERROR & unlink ' + err);
                    fs.unlink(fd);
                }
                if (callback && typeof callback === 'function') {
                    callback();
                }
            });
        });
    });
}

module.exports = {
    delete: _delete,
    isExists: isExists,
    read: read,
    write: write
}