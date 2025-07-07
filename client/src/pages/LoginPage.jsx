// client/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Card, CardContent
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      alert(res.data.message);
      localStorage.setItem('token', res.data.token);
      // navigate('/form');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
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
      <Card sx={{ width: '100%', p: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h4" textAlign="center" gutterBottom fontWeight="bold" color="primary">
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 2 }}>
              Login
            </Button>
            <Typography align="center" sx={{ mt: 2 }}>
              Don’t have an account?{' '}
              <Button variant="text" onClick={() => navigate('/')}>Register</Button>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginPage;
