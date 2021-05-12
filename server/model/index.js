const mongoose = require('../db/index.js');

const userSchema = mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('user', userSchema);

module.exports.checkIfUserExists = username => User.exists({ username });
module.exports.createUser = (username, password) => User.create({ username, password });
module.exports.getUserData = username => User.find({ username });
