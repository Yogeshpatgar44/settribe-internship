// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdmissionForm from './pages/AdmissionForm';
import Report from './pages/Report';
import EditAdmission from './pages/EditAdmission';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#e9eff5',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: `'Poppins', sans-serif`,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes with Navbar */}
        <Route
          path="/form"
          element={
            <PrivateRoute>
              <Navbar />
              <AdmissionForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/report"
          element={
            <PrivateRoute>
              <Navbar />
              <Report />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <Navbar />
              <EditAdmission />
            </PrivateRoute>
          }
        />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

      </Routes>
    </ThemeProvider>
  );
};

export default App;
