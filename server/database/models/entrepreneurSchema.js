const mongoose = require('mongoose');

const entrepreneurSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  gender: String,
  age: Number,
  phoneNumber: String,
  email: String,
  startupId: String,
});

const Entrepreneur = mongoose.model('Entrepreneur', entrepreneurSchema);

module.exports = Entrepreneur;
