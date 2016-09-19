import {MongoClient} from 'mongodb';

export default class MongoDbConnection{
	constrcutor(ip, port, database, options){
		this.ip = ip;
		this.port = port;
		this.options = options;
		this.databaseName = database;
	}

	_getConnectionString(){
		return `mongodb://${this.ip}:${this.port}/${this.databaseName}`;
	}

	connect(){
		const url = _getConnectionString();
		return new Promise((reslve, reject) => {
			const mongoClient = new MongoClient(url, (err, db) => {
				if(err) reject(err);
				else resolve(db);
			});
		});
	}
}