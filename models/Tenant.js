const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
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

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
