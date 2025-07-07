import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  Stack,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const fullName = [form.firstName, form.middleName, form.lastName].filter(Boolean).join(' ');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert('Passwords do not match');
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        ...form,
        fullName,
      });
      alert(res.data.message);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

      }}
    >
      <Card sx={{ width: '100%', boxShadow: 4, borderRadius: 1 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom textAlign="center" fontWeight="bold" color="primary">
            Register Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Middle Name"
                name="middleName"
                value={form.middleName}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                inputProps={{ maxLength: 10 }}
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <Button type="submit" variant="contained" size="large" fullWidth>
                Register
              </Button>
              <Typography align="center" variant="body2" sx={{ mt: 1 }}>
                Already have an account?{' '}
                <Button variant="text" size="small" onClick={() => navigate('/login')}>
                  Login
                </Button>
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterPage;
