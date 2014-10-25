'use strict'

var server = require('./server.js');
var connection = require('./util/connection.js')

module.exports = function (host, port) {

	var mongoclient = connection.loadConnection(host, port)
	var db = mongoclient.db("blog_development");
	db.collection('categories').update({"name" : "Associations"}, {"sample" : "Associations"}, {upsert:true}, function(err, result) {
		console.log(result);
	})



};


