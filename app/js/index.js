'use strict'

var server = require('./server.js');
var connection = require('./util/connection.js')

module.exports.connect = function (host, port) {
	return connection.loadConnection(host, port)
};



