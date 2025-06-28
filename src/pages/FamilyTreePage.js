import React, { useEffect, useState } from "react";
import axios from "axios";
import FamilyMemberCard from "../components/FamilyMemberCard";

function FamilyTreePage() {
  const [family, setFamily] = useState(null);
  const userFamily = localStorage.getItem("family"); // From login

  useEffect(() => {
    const fetchFamily = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/family/${userFamily}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFamily(res.data);
      } catch (err) {
        console.error("Error fetching family:", err);
        alert("Could not load family tree");
      }
    };

    fetchFamily();
  }, [userFamily]);

  if (!family) return <p>Loading family tree...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{family.familyName} Family Tree 🌳</h2>
      <div>
        {family.members.map((member, idx) => (
          <FamilyMemberCard
            key={idx}
            member={member}
            familyName={family.familyName}
            depth={0}
          />
        ))}
      </div>
    </div>
  );
}

export default FamilyTreePage;
