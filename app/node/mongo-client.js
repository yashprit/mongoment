import {MongoClient} from 'mongodb';

export default class MongoDbConnection{
	constructor(ip, port, database, options){
		console.log(this.MongoClient);
		this.ip = ip;
		this.port = port;
		this.options = options;
		this.databaseName = database;
	}

	_getConnectionString(){
		return `mongodb://${this.ip}:${this.port}/${this.databaseName}`;
	}

	connect(){
		const url = this._getConnectionString();
		return new Promise((resolve, reject) => {
			const mongoClient = MongoClient.connect(url, (err, db) => {
				if(err) reject(err);
				else resolve(db);
			});
		});
	}
}