const mongoose = require('mongoose');
const bcrypt =require('bcrypt');


const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        // Regular expression to validate email format
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
      },
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
  },
  // Add more fields as needed
});
// Encrypt the password before saving the user
adminSchema.pre('save', async function (next) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
  
      return next();
    } catch (error) {
      return next(error);
    }
  });
  
  // Compare the entered password with the stored hashed password
  adminSchema.methods.comparePassword = async function (enteredPassword) {
    try {
      return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
      throw new Error(error);
    }
  };
  
  //const User = mongoose.model('Admin', userSchema);
  
  // Create a default user
  const createDefaultUser = async () => {
    try {
      const existingUser = await Admin.findOne({ email: 'alien@gmail.com' });
  
      if (!existingUser) {
        const defaultUser = new Admin({
          username: 'alien',
          email: 'alien@gmail.com',
          password: 'alien123.com', // You should change this to a secure password
        });
  
        await defaultUser.save();
        console.log('Default user created.');
      } else {
        console.log('Default user already exists.');
      }
    } catch (error) {
      console.error('Error creating default user:', error);
    }
  };

const Admin = mongoose.model('Admin', adminSchema);

module.exports = {Admin,createDefaultUser};
