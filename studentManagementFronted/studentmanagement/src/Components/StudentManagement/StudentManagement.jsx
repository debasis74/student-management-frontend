import React, { useState, useEffect } from "react";
import StudentHeader from "../StudentHeader/StudentHeader";
import StudentDataTable from "../StudentDataTable/StudentDataTable";
import styles from "./StudentManagement.module.css";

const API_BASE_URL = "http://localhost:8080/students"; 

const StudentManagement = () => {
  const [studentData, setStudentData] = useState([]);
  const [initialStudentData, setInitialStudentData] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/getAllStudents`);      
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();
        setStudentData(data);
        setInitialStudentData(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  
  const handleAddStudent = async (newStudent) => {
    try {
      const response = await fetch(`${API_BASE_URL}/createStudent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) throw new Error("Failed to add student");
      const savedStudent = await response.json();
      setStudentData((prevData) => [...prevData, savedStudent]);
    } catch (error) {
      alert('Error in creating Data');
      console.error("Error adding student:", error);
    }
  };


  const handleEditStudent = async (updatedStudent) => {
    try {
      const response = await fetch(`${API_BASE_URL}/updateStudent/${updatedStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStudent),
      });

      if (!response.ok) throw new Error("Failed to update student");

      const updatedData = await response.json();
      setStudentData((prevData) =>
        prevData.map((student) =>
          student.id === updatedData.id ? updatedData : student
        )
      );
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleSearchByName = async(studentName) => {
    try {
      if(studentName.length === 0){
        setStudentData(initialStudentData);
        return;
      }
      const response = await fetch(`${API_BASE_URL}/getAllStudentsByName/${studentName}`);      
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.error("Error fetching student by name:", error);
    }
  };

  const handleDelete = async() => {
    try {
      const deleteStudentList = selectedStudent.map(student => student.id);

      const response = await fetch(`${API_BASE_URL}/deleteStudents`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteStudentList),
      });

      if (!response.ok) throw new Error("Failed to Delete student");

      setStudentData((prevData) =>
        prevData?.filter((student) =>
          !deleteStudentList.includes(student.id)
        )
      );
    } catch (error) {
      console.error("Error Deleting students:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Student Management</h1>
      <StudentHeader
        onAdd={handleAddStudent}
        onEdit={handleEditStudent}
        onDelete = {handleDelete}
        onSearch = {handleSearchByName}
        selectedStudent={selectedStudent}
      />
      <StudentDataTable
        studentData={studentData}
        onSelectionChange={(selected) =>
          setSelectedStudent(selected)
        }
      />
    </div>
  );
};

export default StudentManagement;
