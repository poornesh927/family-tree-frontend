import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/admin/users`, {

        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/users/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      alert("Approval failed");
    }
  };

  const toggleRole = async (user) => {
    try {
      const newRole = user.role === "admin" ? "user" : "admin";
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/users/role/${user._id}`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      alert("Failed to update role");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p style={{ padding: "2rem" }}>Loading users...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Panel - All Users</h2>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Family</th>
            <th>Role</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.family}</td>
              <td>{u.role}</td>
              <td>{u.approved ? "✅" : "❌"}</td>
              <td>
                {!u.approved && (
                  <button onClick={() => approveUser(u._id)}>Approve</button>
                )}
                <button onClick={() => toggleRole(u)}>
                  {u.role === "admin" ? "Remove Admin" : "Make Admin"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
