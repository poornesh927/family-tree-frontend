import React, { useEffect, useState } from "react";
import axios from "axios";
import FamilyMemberCard from "../components/FamilyMemberCard";
import CreateFamilyForm from "../components/CreateFamilyForm";

function FamilyTreePage() {
  const [family, setFamily] = useState(null);
  const [loading, setLoading] = useState(true);
  const userFamily = localStorage.getItem("family");
  const token = localStorage.getItem("token");

  const fetchFamily = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/family/${userFamily}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFamily(res.data);
    } catch (err) {
      console.error("Family fetch failed:", err?.response?.data?.msg || err.message);
      setFamily(null); // allow creation
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userFamily && token) {
      fetchFamily();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">{userFamily} Family Tree 🌳</h2>

      {loading && <p>Loading family tree...</p>}

      {!loading && !family && (
        <div className="alert alert-warning">
          <p><strong>No family tree found for "{userFamily}".</strong></p>
          <CreateFamilyForm onSuccess={fetchFamily} />
        </div>
      )}

      {!loading && family?.members?.length > 0 && (
        <div>
          {family.members.map((member, idx) => (
            <FamilyMemberCard
              key={idx}
              member={member}
              familyName={userFamily}
              depth={0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FamilyTreePage;
