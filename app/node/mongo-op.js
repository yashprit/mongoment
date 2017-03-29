export default class MongoDBOp{
	constructor(db){
		this.db = db;
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

	documents(collectionName){
		return new Promise((resolve, reject) => {
			const collection = this.db.collection(collectionName);

			collection.find({}).toArray((err, data) =>{
				if(err) reject(err);
				else {
					this.db.close();
					resolve(data);
				}
			});
		});	
	}

	run(collectionName, methodName, args){
		return new Promise((resolve, reject) => {
			const collection = this.db.collection(collectionName);

			collection[methodName].apply(this. args).toArray((err, data) =>{
				if(err) reject(err);
				else {
					this.db.close();
					resolve(data);
				}
			});
		});	
	}
}