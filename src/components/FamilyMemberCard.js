import React, { useState } from "react";
import AddMemberModal from "./AddMemberModal";

function FamilyMemberCard({ member, familyName, depth }) {
  const [showChildren, setShowChildren] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const toggleChildren = () => setShowChildren(!showChildren);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div style={{ marginLeft: depth * 30, border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "8px" }}>
      <h4>{member.name} ({member.relation})</h4>
      <p><strong>DOB:</strong> {member.dob}</p>
      {member.image && (
        <img src={member.image} alt={member.name} style={{ width: "100px", borderRadius: "4px" }} />
      )}

      {/* View Docs */}
      <div style={{ marginTop: "10px" }}>
        {member.docs?.aadhar && (
          <a href={member.docs.aadhar} target="_blank" rel="noreferrer">Aadhar 📄</a>
        )}{" "}
        {member.docs?.pan && (
          <a href={member.docs.pan} target="_blank" rel="noreferrer">PAN 📄</a>
        )}{" "}
        {member.docs?.voter && (
          <a href={member.docs.voter} target="_blank" rel="noreferrer">Voter 📄</a>
        )}
      </div>

      {/* Actions */}
      <div style={{ marginTop: "10px" }}>
        <button onClick={toggleChildren}>
          {showChildren ? "🔽 Collapse" : "▶️ Expand"}
        </button>{" "}
        <button onClick={openModal}>➕ Add Child</button>
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

      {/* Recursively render children */}
      {showChildren && member.children?.length > 0 && (
        <div>
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
