import DataStore from 'nedb';

const userCollection = new DataStore({filename: './user.json', autoload: true});
const connectionCollection = new DataStore({filename: './connection.json', autoload: true});

const mongomentDB = {
  user: userCollection,
  connection: connectionCollection
}

const USER = 'user';

const CONNECTION = 'cnnection';

export default class DataSource {

  _findOne(collection,obj){
    return new Promise((resolve, reject) => {
      mongomentDB[collection].findOne(obj, (err, result) => {
        if(err) reject(err);
        else resolve(result);
      });
    });
  }

  _find(collection){
    return new Promise((resolve, reject) => {
      mongomentDB[collection].find((err, result) => {
        if(err) reject(err);
        else resolve(result);
      });
    });
  }

  _insert(obj){
    return new Promise((resolve, reject) => {
      mongomentDB[collection].insert(obj, (err, status) => {
        if(err) reject(err);
        else resolve(status);
      });
    })
  }

  async findAllConnections(){
    return await this._find(CONNECTION);
  }

  async findByName(username){
    return await this._findOne(USER, {
      name: username
    });
  }

  async checkUserPresent(username, assword){
    return await this._findOne(USER, {
      name: username,
      password: password
    })
  }

  async insertUser(username, email, password){
    const doc = await this._findOne(USER, {name: username});
    if(doc){
      throw new Error("username already present");
    } else {
      return await this._insert({
        name: username,
        email: email,
        password: password
      })
    }
  }

  async insertConnection(name, ip, port, db, options){
    const doc = await this._findOne(CONNECTION, {name: name});
    if(doc){
      throw new Error("name is already present");
    } else {
      return await this._insert(CONNECTION, {
        name: name,
        ip: ip,
        port: port,
        db: db,
        options: options
      });
    }
  }
}

