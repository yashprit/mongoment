'use strict'

require('./server.js');
require('./util/connection.js');

process.on('uncaughtException', function (err) {
    global.log.error('error: ', err.red);
    global.log.info(err.stack);
    window.alert(err);
    return false;
});

var mongoInstance = loadConnection('localhost');

console.log(mongoInstance);
