// TypeScript, Node.js, MongoDB
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const dontenv = require("dotenv");
require("dotenv").config();

// import and use the schema and model
const { Schema, model } = mongoose;
const userSchema = new Schema({
  name: String,
  age: Number,
});
const User = model("User", userSchema);

// connect to monogdb with .env file
const uri = process.env.DB_CONN_STRING;
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// create a new user
const user = new User({
  name: "John",
  age: 30,
});

// save the user to the databases
user.save((err: any) => {
  if (err) {
    console.log(`save user error: ${err}`);
  } else {
    console.log("User saved successfully");
  }
});

// get all users from the database
User.find({}, (err: any, users: any) => {
  if (err) {
    console.log(`find user error: ${err}`);
  } else {
    console.log("Found user successfully");
  }
});

// update a user in the database
User.updateOne({ name: "John" }, { name: "John Doe" }, (err: any) => {
  if (err) {
    console.log(`update user error: ${err}`);
  } else {
    console.log("User updated successfully");
  }
});

// delete a user from the database
User.deleteOne({ name: "John Doe" }, (err: any) => {
  if (err) {
    console.log(`delete user error: ${err}`);
  } else {
    console.log("User deleted successfully");
  }
});

// close the connection to the database
// mongoose.connection.close();
