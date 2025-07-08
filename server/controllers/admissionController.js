// controllers/admissionController.js
const Admission = require('../models/Admission');

let admissionCounter = 1;

const handleAdmission = async (req, res) => {
  try {
    const {
      fullName, age, title, firstName, middleName, lastName,
      motherName, gender, address, taluka, district, pinCode,
      state, mobile, email, aadhaar, dob, religion,
      casteCategory, caste, physicallyHandicapped,
    } = req.body;

    const files = req.files;

    const admissionId = `SET2025${admissionCounter.toString().padStart(3, '0')}`;
    admissionCounter++;

    const newAdmission = new Admission({
      admissionId,
      fullName,
      age,
      title,
      firstName,
      middleName,
      lastName,
      motherName,
      gender,
      address,
      taluka,
      district,
      pinCode,
      state,
      mobile,
      email,
      aadhaar,
      dob,
      religion,
      casteCategory,
      caste,
      physicallyHandicapped,
      photo: files.photo?.[0]?.filename || '',
      signature: files.signature?.[0]?.filename || '',
      casteCertificate: files.casteCertificate?.[0]?.filename || '',
      marksheet: files.marksheet?.[0]?.filename || '',
    });

    await newAdmission.save();
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (err) {
    console.error('Error saving form:', err);
    res.status(500).json({ error: 'Failed to submit form' });
  }
};

module.exports = { handleAdmission };
