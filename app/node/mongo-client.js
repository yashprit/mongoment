import {MongoClient} from 'mongodb';

export default class MongoDbConnection{
	constructor(ip, port, database, options){
		this.ip = ip;
		this.port = port;
		this.options = options;
		this.databaseName = database;
	}

	_getConnectionString(){
		return `mongodb://${this.ip}:${this.port}/${this.databaseName}`;
	}

	_connect(dbStr){
		return new Promise((resolve, reject) => {
			const mongoClient = MongoClient.connect(dbStr, (err, db) => {
				if(err) reject(err);
				else resolve(db);
			});
		});
	}

	async connectByParams(){
		const url = this._getConnectionString();
		return await this._connect(url);
	}

	async connectByUri(url){
		return await this._connect(url);
	}
}