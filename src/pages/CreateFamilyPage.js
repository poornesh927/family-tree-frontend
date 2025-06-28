import React, { useState } from "react";
import axios from "axios";

function CreateFamilyPage() {
  const [familyName, setFamilyName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/family`,
        { familyName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Family created successfully!");
      setFamilyName("");
    } catch (err) {
      alert(err.response?.data?.msg || "Error creating family");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Create New Family</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          placeholder="Enter Family Name"
          required
        />
        <button type="submit">Create Family</button>
      </form>
    </div>
  );
}

export default CreateFamilyPage;
