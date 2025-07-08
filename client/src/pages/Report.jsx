import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Table, TableHead, TableBody, TableRow,
  TableCell, IconButton, Button, Dialog, DialogActions, DialogTitle,
  Paper
} from '@mui/material';
import { Delete, Edit, FileDownload } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Report = () => {
  const [admissions, setAdmissions] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  // Fetch admissions
  const fetchAdmissions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admission');
      setAdmissions(res.data);
    } catch (err) {
      console.error('Failed to fetch data', err);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  // Delete admission
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/admission/${deleteId}`);
      setDeleteId(null);
      fetchAdmissions(); // Refresh table
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  // Export to Excel
  const exportExcel = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admission/export/excel', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'admissions.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        🧾 Admission Report
      </Typography>

      <Paper sx={{ overflow: 'auto', my: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Full Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Mobile</b></TableCell>
              <TableCell><b>Gender</b></TableCell>
              <TableCell><b>Religion</b></TableCell>
              <TableCell><b>District</b></TableCell>
              <TableCell><b>State</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admissions.map((admission) => (
              <TableRow key={admission._id}>
                <TableCell>{admission.fullName}</TableCell>
                <TableCell>{admission.email}</TableCell>
                <TableCell>{admission.mobile}</TableCell>
                <TableCell>{admission.gender}</TableCell>
                <TableCell>{admission.religion}</TableCell>
                <TableCell>{admission.district}</TableCell>
                <TableCell>{admission.state}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => navigate(`/edit/${admission._id}`)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => setDeleteId(admission._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Button
        variant="contained"
        startIcon={<FileDownload />}
        onClick={exportExcel}
      >
        Export to Excel
      </Button>

      {/* Confirm Delete Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Are you sure you want to delete this record?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Report;
