import React, { useState, useEffect } from 'react';
import {
  Container, TextField, Button, Typography, Card, CardContent, Box, IconButton
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const generateCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let captcha = '';
  for (let i = 0; i < 6; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', captchaInput: '' });
  const [captcha, setCaptcha] = useState('');

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setForm({ ...form, captchaInput: '' });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (form.captchaInput.trim().toLowerCase() !== captcha.toLowerCase()) {
      alert('❌ Incorrect captcha');
      refreshCaptcha();
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email: form.email,
        password: form.password,
      });

      alert(res.data.message);
      localStorage.setItem('token', res.data.token);

      // ✅ Navigate to Admission Form after successful login
      navigate('/form');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
      refreshCaptcha(); // Refresh captcha on error
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

            {/* Captcha Display */}
            <Box mt={2} display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  bgcolor: 'grey.300',
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}
              >
                <span style={{ marginRight: '8px' }}>Captcha:</span>
                {captcha}
              </Box>
              <IconButton onClick={refreshCaptcha} title="Refresh Captcha">
                <RefreshIcon />
              </IconButton>
            </Box>

            <TextField
              fullWidth
              margin="normal"
              label="Enter Captcha"
              name="captchaInput"
              value={form.captchaInput}
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
