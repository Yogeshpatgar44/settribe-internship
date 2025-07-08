// client/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import AdmissionForm from './pages/AdmissionForm';
import Report from "./pages/Report"
import EditAdmission from './pages/EditAdmission';


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // blue
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
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/form" element={<AdmissionForm />} />
        <Route path="/report" element={<Report />} />
        <Route path="/edit/:id" element={<EditAdmission />} />


      </Routes>
    </ThemeProvider>
  );
};

export default App;
