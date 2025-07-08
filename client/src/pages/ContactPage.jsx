import React from 'react';
import Navbar from '../components/Navbar';
import { Container, Typography } from '@mui/material';

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          📍 SETTribe, 
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          📞 Phone: +91-1234567890
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          📧 Email: support@settribe.in
        </Typography>
      </Container>
    </>
  );
};

export default ContactPage;
