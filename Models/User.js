const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender : {
    type: String,
    required: true,
  },
  hasAdminAcess: {
    type: Boolean,
    required: false,
  },
  role: {
    type: String,
    enum: ['superadmin','storekeeper', 'salesperson'],
    default: 'salesperson',
  },
 
},
{timestamps: true,}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
