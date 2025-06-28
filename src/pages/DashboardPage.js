import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");
    const family = localStorage.getItem("family");

    if (!token) {
      alert("Please login first");
      navigate("/");
    } else {
      setUser({ name, role, family });
    }
  }, [navigate]);

  if (!user) return null;

  return (
  <div style={{ padding: "2rem" }}>
    <h2>Welcome, {user.name} 👋</h2>
    <p><strong>Role:</strong> {user.role}</p>
    <p><strong>Family:</strong> {user.family}</p>

    {/* ✅ Show Admin Panel link only if user is admin */}
    {user.role === "admin" && (
      <p><a href="/admin">Go to Admin Panel</a></p>
    )}
  </div>
);

}

export default DashboardPage;
