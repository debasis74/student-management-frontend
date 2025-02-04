import React, { useState, useCallback } from "react";
import { Box, TextField, Button } from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { debounce } from "lodash"; 
import styles from "./StudentHeader.module.css";
import StudentFormModal from "../StudentFormModal/StudentFormModal";

const StudentHeader = ({ onAdd, onEdit, selectedStudent, onDelete, onSearch }) => {
  const [open, setOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenDialog = (mode) => {
    setDialogMode(mode);
    setOpen(true);
  };

  const debouncedSearch = useCallback(
    debounce((term) => {
      onSearch(term);
    }, 800),
    [onSearch]
  );

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <>
      <Box className={styles.headerContainer}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          onChange={handleSearch}
          value={searchTerm}
        />
        <Box className={styles.spacing}>
          <Button
            variant="contained"
            color="primary"
            className={styles.buttonSpacing}
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog("add")}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={styles.buttonSpacing}
            startIcon={<EditIcon />}
            onClick={() => handleOpenDialog("edit")}
            disabled={!selectedStudent || selectedStudent.length !== 1}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            disabled={!selectedStudent || selectedStudent.length === 0}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <StudentFormModal
        open={open}
        handleClose={() => setOpen(false)}
        onSave={dialogMode === "add" ? onAdd : onEdit}
        student={dialogMode === "edit" ? selectedStudent[0] : null}
      />
    </>
  );
};

export default React.memo(StudentHeader);