import React, { useState, useEffect } from "react";
import "./FormDataTable.css";

const FormDataTable = () => {
  const [formDataList, setFormDataList] = useState([]);

  const fetchProduct = async () => {
    const resp = await fetch("http://localhost:5001/get-form-data", {
      method: "GET",
    });
    const data = await resp.json();
    setFormDataList(data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/delete-form`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Pass the ID in the request body
      });

      if (response.ok) {
        console.log("Form deleted successfully");
        setFormDataList(formDataList.filter((formData) => formData._id !== id));
      } else {
        console.error("Failed to delete form");
      }
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  return (
    <div className="container">
      <h1>Form Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Education</th>
            <th>Skills</th>
            <th>Work Place</th>
            <th>Hobbies</th>
            <th>Delete action</th>
          </tr>
        </thead>
        <tbody>
          {formDataList.map((formData, _id) => (
            <tr key={_id}>
              <td>{formData.firstName}</td>
              <td>{formData.lastName}</td>
              <td>{formData.education}</td>
              <td>{formData.skills}</td>
              <td>{formData.workPlace}</td>
              <td>{formData.hobbies}</td>
              <td>
                <button
                  onClick={() => {
                    handleDelete(formData._id);
                  }}
                  style={{ background: "red", color: "white " }}
                >
                  Delete Me
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormDataTable;
