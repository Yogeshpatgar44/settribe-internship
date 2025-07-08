// models/Admission.js
const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
  admissionId: String,
  fullName: String,
  age: Number,
  title: String,
  firstName: String,
  middleName: String,
  lastName: String,
  motherName: String,
  gender: String,
  address: String,
  taluka: String,
  district: String,
  pinCode: String,
  state: String,
  mobile: String,
  email: String,
  aadhaar: String,
  dob: String,
  religion: String,
  casteCategory: String,
  caste: String,
  physicallyHandicapped: String,
  photo: String,
  signature: String,
  casteCertificate: String,
  marksheet: String,
}, { timestamps: true });

module.exports = mongoose.model('Admission', admissionSchema);
