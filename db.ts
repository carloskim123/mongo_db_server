import { Db, MongoClient } from "mongodb";

let dbConnection: Db

module.exports = {
  connectToDb: (cb: (err) => void) => {
    console.log("------------Called-----------------");
    MongoClient.connect("mongodb://127.0.0.1:27017/bookstore?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.5")
      .then((client: MongoClient) => {
        console.log("------------Success-----------------");
        dbConnection = client.db();
        return cb(null);
      })
      .catch((err: Error) => {
        console.log("-------------Error-----------------");
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection
};
