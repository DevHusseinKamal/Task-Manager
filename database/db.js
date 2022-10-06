const mongodb = require("mongodb");
require("dotenv").config();

const mongoDbUrl = process.env.MONGO_URI;

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(mongoDbUrl)
    .then((client) => {
      _db = client.db();
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw new Error("Database not initialzed");
  }
  return _db;
};

module.exports = {
  mongoConnect,
  getDb,
};
