import React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { columnHeaders } from "../Constants";

const StudentDataTable = ({ studentData, onSelectionChange }) => {
  const handleSelectionChange = (selectedRow) => {
    const selectedRows = studentData.filter((row) => selectedRow?.includes(row?.id));
    onSelectionChange(selectedRows);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={studentData}
        columns={columnHeaders.map((col) => ({ ...col, sortable: false }))}
        disableColumnMenu
        hideFooter
        checkboxSelection
        getRowId={(row) => row.id}
        onRowSelectionModelChange={(row) => handleSelectionChange(row)}
      />
    </Box>
  );
};

export default StudentDataTable;
