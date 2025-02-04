import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const StudentFormModal = ({ open, handleClose, onSave, student }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    age: "",
    studentClass: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (student?.id) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async() => {
    if (
      !formData.name ||
      !formData.age ||
      !formData.studentClass ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.address
    ) {
      alert("All fields are required.");
      return;
    }
    await onSave(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{formData.id ? "Edit Student" : "Add Student"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />
        <TextField
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />
        <TextField
          label="Class"
          name="studentClass"
          value={formData.studentClass}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentFormModal;
