import React from 'react';
import Navbar from '../components/Navbar';
import { Container, Typography } from '@mui/material';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          This is a sample Admission Management System developed for the SETTribe internship project.
          It allows registration, login, admission form submission, and report management.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Technologies used: React.js, Node.js, Express.js, MongoDB, and Material UI.
        </Typography>
      </Container>
    </>
  );
};

export default AboutPage;
