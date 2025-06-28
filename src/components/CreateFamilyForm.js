import React, { useState } from "react";
import axios from "axios";

function CreateFamilyPage() {
  const [familyName, setFamilyName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/family`,
        { familyName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(`✅ ${res.data.msg}`);
      setFamilyName("");
    } catch (err) {
      setMessage(
        `❌ ${err.response?.data?.msg || "Error creating family"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-primary">Create New Family</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="familyName">Family Name</label>
            <input
              type="text"
              id="familyName"
              className="form-control"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              placeholder="Enter family name"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Family"}
          </button>
        </form>

        {message && (
          <div className="alert alert-info mt-3" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateFamilyPage;
