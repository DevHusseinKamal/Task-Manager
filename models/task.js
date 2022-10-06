const mongodb = require("mongodb");
const database = require("../database/db");

const ObjectId = mongodb.ObjectId;

class Task {
  constructor(name, completed, id) {
    this.name = name;
    this.completed = completed;
    this._id = id ? new ObjectId(id) : undefined;
  }

  save() {
    const db = database.getDb();
    let dbOpt;

    if (this._id) {
      dbOpt = db
        .collection("tasks")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOpt = db.collection("tasks").insertOne(this);
    }

    return dbOpt;
  }

  static findById(id) {
    const db = database.getDb();
    let task;

    try {
      task = db.collection("tasks").findOne({ _id: new ObjectId(id) });
    } catch (err) {
      task = null;
    }

    return task;
  }

  static deleteById(id) {
    const db = database.getDb();
    return db.collection("tasks").deleteOne({ _id: new ObjectId(id) });
  }

  static async getTasks() {
    const db = database.getDb();
    const tasks = [];
    await db
      .collection("tasks")
      .find()
      .forEach((task) => {
        tasks.push(task);
      });

    return tasks;
  }
}

module.exports = Task;
