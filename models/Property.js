const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  maps: {
    type: String,
  },
  cost: {
    type: Number,
    required: true,
  },
  photos: [{
    type: String,
  }],
});

// Create the property model
const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
