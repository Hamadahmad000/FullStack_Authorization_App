const mongoose = require("mongoose");

// as a development i'm using Local MongoDB Connection With the help of Mongo Compass
const DATABASE_CONNECTION = async (URL) => {
  const URI = "mongodb://0.0.0.0:27017/user";
  try {
    await mongoose.connect(URI, { useNewUrlParser: true });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error in Databse Connection", error.message);
  }
};

module.exports = DATABASE_CONNECTION;
