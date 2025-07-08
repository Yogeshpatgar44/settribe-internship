import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, Typography, Grid, Paper, Box
} from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const initialFormState = {
  title: '',
  firstName: '',
  middleName: '',
  lastName: '',
  motherName: '',
  gender: '',
  dob: '',
  address: '',
  taluka: '',
  district: '',
  pinCode: '',
  state: '',
  mobile: '',
  email: '',
  aadhaar: '',
  religion: '',
  casteCategory: '',
  caste: '',
  physicallyHandicapped: '',
};

const EditAdmission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(true);

  // Fetch admission data by ID
  useEffect(() => {
    axios.get(`http://localhost:5000/api/admission/${id}`)
      .then(res => {
        setForm(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching admission:', err);
        alert('Error loading form data');
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/admission/${id}`, form);
      alert('✅ Admission updated successfully!');
      navigate('/report');
    } catch (err) {
      console.error('Update error:', err);
      alert('❌ Failed to update admission');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
          ✏️ Edit Admission - {form.fullName}
        </Typography>

        <Box component="form" onSubmit={handleUpdate} mt={3}>
          <Grid container spacing={3}>
            {['firstName', 'middleName', 'lastName'].map((field) => (
              <Grid item xs={12} sm={4} key={field}>
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
              <TextField fullWidth label="Mother Name" name="motherName" value={form.motherName} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Gender" name="gender" value={form.gender} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Date of Birth" name="dob" type="date" InputLabelProps={{ shrink: true }} value={form.dob} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" name="address" value={form.address} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="District" name="district" value={form.district} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="State" name="state" value={form.state} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Religion" name="religion" value={form.religion} onChange={handleChange} required />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditAdmission;
