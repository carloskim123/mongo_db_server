const {MongoClient} = require("mongodb");

let dbConnection;

module.exports = {
  connectToDb: (cb => {
    console.log("------------Called-----------------");
    MongoClient.connect("mongodb://127.0.0.1:27017/bookstore?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.5")
      .then((client) => {
        console.log("------------Success-----------------");
        dbConnection = client.db();
        return cb(null);
      })
      .catch((err) => {
        console.log("-------------Error-----------------");
        console.log(err);
        return cb(err);
      });
  }),
  getDb: () => dbConnection
};


