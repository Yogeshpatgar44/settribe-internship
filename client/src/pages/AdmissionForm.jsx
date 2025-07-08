import React, { useState } from 'react';
import {
  Container, Grid, TextField, Button, Typography, Card, CardContent,
  FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup,
  FormControlLabel, Radio, Divider, Box
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import dayjs from 'dayjs';
import axios from 'axios';

// 🔁 Dropdown list
const religions = ['Hindu', 'Muslim', 'Christian', 'Jain', 'Buddhist', 'Other'];

// 🔁 Initial States
const initialFormState = {
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  motherName: '',
  gender: '',
  address: '',
  taluka: '',
  district: '',
  pinCode: '',
  state: '',
  mobile: '',
  email: '',
  aadhaar: '',
  dob: '',
  religion: '',
  casteCategory: '',
  caste: '',
  physicallyHandicapped: '',
};

const initialFileState = {
  photo: null,
  signature: null,
  casteCertificate: null,
  marksheet: null,
};

const AdmissionForm = () => {
  const [form, setForm] = useState(initialFormState);
  const [files, setFiles] = useState(initialFileState);

  const fullName = [form.firstName, form.middleName, form.lastName].filter(Boolean).join(' ');
  const age = form.dob ? dayjs().diff(dayjs(form.dob), 'year') : '';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles.length > 0 && selectedFiles[0].size <= 1024 * 1024) {
      setFiles({ ...files, [name]: selectedFiles[0] });
    } else {
      alert('File must be under 1MB (JPG, JPEG, PNG)');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ✅ Check manually if required files are selected
    if (!files.photo || !files.signature || !files.marksheet) {
      alert('Please upload all required files (Photo, Signature, Marksheet)');
      return;
    }
  
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    formData.append('fullName', fullName);
    formData.append('age', age);
  
    Object.entries(files).forEach(([key, file]) => {
      if (file) {
        formData.append(key, file);
      }
    });
  
    try {
      const res = await axios.post('http://localhost:5000/api/admission', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      alert('✅ Admission form submitted successfully!');
      console.log(res.data);
  
      setForm(initialFormState);
      setFiles(initialFileState);
    } catch (err) {
      console.error('❌ Submission error:', err);
      alert('Something went wrong while submitting.');
    }
  };
  

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card sx={{ p: 4, boxShadow: 6, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
            Admission Form
          </Typography>

          <Box component="form" onSubmit={handleSubmit} mt={4}>
            {/* 👤 Personal Details */}
            <Typography variant="h6" gutterBottom>👤 Personal Details</Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <InputLabel>Title</InputLabel>
                  <Select name="title" value={form.title} onChange={handleChange} required>
                    <MenuItem value="Mr.">Mr.</MenuItem>
                    <MenuItem value="Mrs.">Mrs.</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {['firstName', 'middleName', 'lastName'].map((field) => (
                <Grid item xs={12} sm={3} key={field}>
                  <TextField
                    fullWidth
                    label={field.replace(/([A-Z])/g, ' $1')}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    required={field !== 'middleName'}
                  />
                </Grid>
              ))}
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Full Name" value={fullName} disabled />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Mother Name" name="motherName" value={form.motherName} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Gender" name="gender" value={form.gender} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Date of Birth" name="dob" type="date" InputLabelProps={{ shrink: true }} value={form.dob} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth label="Age" value={age} disabled />
              </Grid>
            </Grid>

            {/* 📍 Address Details */}
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>📍 Address Details</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Address" name="address" value={form.address} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Taluka" name="taluka" value={form.taluka} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="District" name="district" value={form.district} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="State" name="state" value={form.state} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Pin Code" name="pinCode" value={form.pinCode} onChange={handleChange} required />
                </Grid>
              </Grid>
            </Box>

            {/* 📞 Contact */}
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>📞 Contact Details</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Mobile Number" name="mobile" value={form.mobile} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Email ID" name="email" type="email" value={form.email} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Aadhaar Number" name="aadhaar" value={form.aadhaar} onChange={handleChange} required />
                </Grid>
              </Grid>
            </Box>

            {/* 🧘 Religion/Caste */}
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>🧘 Religion & Caste</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <InputLabel>Religion</InputLabel>
                    <Select name="religion" value={form.religion} onChange={handleChange} required>
                      {religions.map((r) => (
                        <MenuItem key={r} value={r}>{r}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Caste Category" name="casteCategory" value={form.casteCategory} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Caste" name="caste" value={form.caste} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel>Physically Handicapped</FormLabel>
                    <RadioGroup row name="physicallyHandicapped" value={form.physicallyHandicapped} onChange={handleChange}>
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* 📁 Uploads */}
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>📁 Upload Documents</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={3}>
                {[
                    { name: 'photo', label: 'Photo (JPEG, PNG, < 1MB)' },
                    { name: 'signature', label: 'Signature (JPEG, PNG, < 1MB)' },
                    { name: 'casteCertificate', label: 'Caste Certificate (Optional)' },
                    { name: 'marksheet', label: 'Marksheet (JPEG, PNG, < 1MB)' },
                ].map(({ name, label }) => (
                    <Grid item xs={12} sm={6} key={name}>
                    <Typography gutterBottom>{label}</Typography>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<UploadFileIcon />}
                        fullWidth
                    >
                        Upload {name.charAt(0).toUpperCase() + name.slice(1)}
                        <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        hidden
                        name={name}
                        onChange={handleFileChange}
                        />
                    </Button>

                    {files[name] && (
                        <Typography variant="caption" color="text.secondary">
                        Selected: {files[name].name}
                        </Typography>
                    )}
                    </Grid>
                ))}
                </Grid>

            </Box>

            {/* 🔘 Submit */}
            <Box mt={5}>
              <Button type="submit" fullWidth size="large" variant="contained">
                Submit Admission Form
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdmissionForm;
