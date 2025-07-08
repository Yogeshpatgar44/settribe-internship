const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');
const upload = require('../middlewares/upload');
const ExcelJS = require('exceljs');

// GET all admissions
router.get('/', async (req, res) => {
  try {
    const admissions = await Admission.find();
    res.json(admissions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admissions' });
  }
});

// DELETE admission by ID
router.delete('/:id', async (req, res) => {
  try {
    await Admission.findByIdAndDelete(req.params.id);
    res.json({ message: 'Admission deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete admission' });
  }
});

// UPDATE admission by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Admission updated successfully', updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update admission' });
  }
});

// EXPORT to Excel
router.get('/export/excel', async (req, res) => {
  try {
    const admissions = await Admission.find();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Admissions');

    // Header
    worksheet.columns = [
      { header: 'Admission ID', key: 'admissionId', width: 15 },
      { header: 'Full Name', key: 'fullName', width: 25 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Mobile', key: 'mobile', width: 15 },
      { header: 'DOB', key: 'dob', width: 15 },
      { header: 'Gender', key: 'gender', width: 10 },
      { header: 'Religion', key: 'religion', width: 15 },
      { header: 'Caste', key: 'caste', width: 15 },
      { header: 'State', key: 'state', width: 15 },
      { header: 'District', key: 'district', width: 15 },
      // Add more fields as needed
    ];

    // Rows
    admissions.forEach((admission) => {
      worksheet.addRow(admission);
    });

    // Send file
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=admissions.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to export Excel' });
  }
});


// Get single admission by ID
router.get('/:id', async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);
    res.json(admission);
  } catch (err) {
    res.status(404).json({ error: 'Not found' });
  }
});

// Update admission
router.put('/:id', async (req, res) => {
  try {
    await Admission.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Admission updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

router.post(
  '/',
  upload.fields([
    { name: 'photo' },
    { name: 'signature' },
    { name: 'casteCertificate' },
    { name: 'marksheet' },
  ]),
  async (req, res) => {
    try {
      const {
        title, firstName, middleName, lastName, motherName, gender, dob,
        address, taluka, district, pinCode, state,
        mobile, email, aadhaar, religion, casteCategory, caste, physicallyHandicapped
      } = req.body;

      const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');
      const age = new Date().getFullYear() - new Date(dob).getFullYear();

      // 🔢 Generate admissionId like ADM2025001
      const latestAdmission = await Admission.findOne().sort({ _id: -1 });
      let newNumber = 1;
      if (latestAdmission && latestAdmission.admissionId) {
        const lastId = parseInt(latestAdmission.admissionId.slice(7)); // e.g. ADM2025001 => 1
        newNumber = lastId + 1;
      }
      const admissionId = `ADM${new Date().getFullYear()}${String(newNumber).padStart(3, '0')}`;

      const admission = new Admission({
        admissionId,
        title, firstName, middleName, lastName, fullName, motherName,
        gender, dob, age,
        address, taluka, district, pinCode, state,
        mobile, email, aadhaar,
        religion, casteCategory, caste, physicallyHandicapped,
        photo: req.files.photo?.[0]?.filename || '',
        signature: req.files.signature?.[0]?.filename || '',
        casteCertificate: req.files.casteCertificate?.[0]?.filename || '',
        marksheet: req.files.marksheet?.[0]?.filename || '',
      });

      await admission.save();
      res.status(201).json({ message: 'Admission form submitted successfully!', admissionId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to submit admission form' });
    }
  }
);


module.exports = router;
