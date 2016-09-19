import DataStore from 'nedb';

const db = new DataStore({filename: './database.json', autoload: true});

export default class DataSource{

  _findOne(obj){
    return new Promise((resolve, reject) => {
      db.findOne(obj, (err, result) => {
        if(err) reject(err);
        else resolve(result);
      });
    });
  }

  _insert(obj){
    return new Promise((resolve, reject) => {
      db.insert(obj, (err, status) => {
        if(err) reject(err);
        else resolve(status);
      });
    })
  }

  async findByName(username){
    return await this._findOne({
      name: username
    });
  }

  async checkUserPresent(username, assword){
    return await this._findOne({
      name: username,
      password: password
    })
  }

  async insertUser(username, email, password){
    const doc = await this._findOne({name: username});
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
}

