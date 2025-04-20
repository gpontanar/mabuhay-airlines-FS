const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  prefix: { type: String },
  gender: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // confirmPassword: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  bookingHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});

// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   console.log("Original password before hashing:", this.password); // Debugging
//   this.password = await bcrypt.hash(this.password, 10);
//   console.log("Hashed password after hashing:", this.password); // Debugging
//   this.confirmPassword = this.password;
//   next();
// });

module.exports = mongoose.model('User', userSchema);
