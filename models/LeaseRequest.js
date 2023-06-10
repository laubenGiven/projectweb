const mongoose = require('mongoose');

const leaseRequestSchema = new mongoose.Schema({
  // Define the schema fields and their types
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tenant',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  // Add more fields as needed
});

const LeaseRequest = mongoose.model('LeaseRequest', leaseRequestSchema);

module.exports = LeaseRequest;
