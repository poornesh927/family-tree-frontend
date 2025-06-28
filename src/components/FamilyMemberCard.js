import React, { useState } from "react";
import AddMemberModal from "./AddMemberModal";
import "bootstrap/dist/css/bootstrap.min.css";

function FamilyMemberCard({ member, familyName, depth }) {
  const [showChildren, setShowChildren] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const toggleChildren = () => setShowChildren(!showChildren);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div
      className="card mb-3"
      style={{ marginLeft: depth * 30, backgroundColor: "#f8f9fa" }}
    >
      <div className="card-body">
        <h5 className="card-title">
          {member.name} <small className="text-muted">({member.relation})</small>
        </h5>
        <p className="card-text">
          <strong>DOB:</strong> {member.dob}
        </p>

        {member.image && (
          <img
            src={member.image}
            alt={member.name}
            className="img-thumbnail mb-3"
            style={{ width: "120px" }}
          />
        )}

        {/* View Documents */}
        <div className="mb-3">
          {member.docs?.aadhar && (
            <a
              href={member.docs.aadhar}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-outline-primary me-2"
              download
            >
              Aadhar 📄
            </a>
          )}
          {member.docs?.pan && (
            <a
              href={member.docs.pan}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-outline-success me-2"
              download
            >
              PAN 📄
            </a>
          )}
          {member.docs?.voter && (
            <a
              href={member.docs.voter}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-outline-danger"
              download
            >
              Voter 📄
            </a>
          )}
        </div>

        {/* Actions */}
        <div>
          <button
            onClick={toggleChildren}
            className="btn btn-sm btn-warning me-2"
          >
            {showChildren ? "🔽 Collapse" : "▶️ Expand"}
          </button>
          <button
            onClick={openModal}
            className="btn btn-sm btn-primary"
          >
            ➕ Add Child
          </button>
        </div>
      </div>

      {/* Add Modal */}
      {showModal && (
        <AddMemberModal
          parentId={member._id}
          familyName={familyName}
          onClose={closeModal}
          onSuccess={() => window.location.reload()}
        />
      )}

      {/* Recursive Children */}
      {showChildren && member.children?.length > 0 && (
        <div className="ms-4 mt-3">
          {member.children.map((child, idx) => (
            <FamilyMemberCard
              key={idx}
              member={child}
              familyName={familyName}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FamilyMemberCard;
