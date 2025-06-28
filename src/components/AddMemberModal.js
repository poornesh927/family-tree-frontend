import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function AddMemberModal({ parentId, familyName, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    relation: "",
    image: "",
    docs: { aadhar: "", pan: "", voter: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["aadhar", "pan", "voter"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        docs: { ...prev.docs, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/family/${familyName}/member/${parentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Member added!");
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.msg || "Error adding member");
    }
  };

  return (
    <div className="modal show fade d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content border-primary">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Add New Family Member</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Relation</label>
                  <input
                    type="text"
                    className="form-control"
                    name="relation"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <hr className="mt-4" />
              <h6>Document Links</h6>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Aadhar</label>
                  <input
                    type="text"
                    className="form-control"
                    name="aadhar"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">PAN</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pan"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Voter</label>
                  <input
                    type="text"
                    className="form-control"
                    name="voter"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Add Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMemberModal;
