export default class MongoDBOp{
	constructor(db){
		this.db = db;
	}

	collection(){
		
	}

	collections(){
		return new Promise((resolve, reject) => {
			this.db.collections((err, data) => {
				if(err) reject(err);
				else {
					this.db.close();
					resolve(data);
				}
			});
		});
	}

	async count(){
		const collection = await this.collections();
		return collection.length;
	}

}