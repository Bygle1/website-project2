const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

//connect between mongodb collection to mongoose schema
const Users = mongoose.model("Users", usersSchema);

const selectUserByEmail = (email) => {
  return Users.find({ email });
};

const insertUser = (email, password, name) => {
  const user = new Users({
    email,
    password,
    name,
  });
  return user.save();
};

module.exports = {
  selectUserByEmail,
  insertUser,
};
