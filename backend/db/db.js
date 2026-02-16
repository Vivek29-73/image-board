const mongoose = require("mongoose");

function dbconnect() {
    mongoose.connect("mongodb://127.0.0.1:27017/post-app")
      .then(() => console.log("db connected"))
      .catch((err) => console.error("DB connection error:", err));
}

module.exports = dbconnect;