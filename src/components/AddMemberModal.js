import React, { useState } from "react";
import axios from "axios";

function AddMemberModal({ familyName, parentId, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    relation: "",
    image: null,
    aadhar: null,
    pan: null,
    voter: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const form = new FormData();

    form.append("name", formData.name);
    form.append("dob", formData.dob);
    form.append("relation", formData.relation);
    if (formData.image) form.append("image", formData.image);
    if (formData.aadhar) form.append("aadhar", formData.aadhar);
    if (formData.pan) form.append("pan", formData.pan);
    if (formData.voter) form.append("voter", formData.voter);

    try {
      await axios.post(
        `http://localhost:5000/api/family/upload/${familyName}/${parentId}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Member added successfully");
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Error adding member");
    }
  };

  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      border: "2px solid #ddd",
      borderRadius: "10px",
      width: "400px"
    }}>
      <h3>Add Family Member</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required /><br /><br />
        <input type="date" name="dob" onChange={handleChange} required /><br /><br />
        <input type="text" name="relation" placeholder="Relation" onChange={handleChange} required /><br /><br />
        <label>Profile Image: <input type="file" name="image" onChange={handleChange} /></label><br /><br />
        <label>Aadhar Card: <input type="file" name="aadhar" onChange={handleChange} /></label><br /><br />
        <label>PAN Card: <input type="file" name="pan" onChange={handleChange} /></label><br /><br />
        <label>Voter Card: <input type="file" name="voter" onChange={handleChange} /></label><br /><br />
        <button type="submit">Add Member</button>{" "}
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default AddMemberModal;
