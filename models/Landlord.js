const mongoose = require('mongoose');

const landlordSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});

const Landlord = mongoose.model('Landlord', landlordSchema);

module.exports = Landlord;
