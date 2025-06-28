import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  const approveUser = async (id) => {
    await axios.put(`http://localhost:5000/api/users/approve/${id}`);
    fetchUsers(); // refresh list
  };
  const toggleRole = async (user) => {
  const newRole = user.role === "admin" ? "user" : "admin";
  await axios.put(`http://localhost:5000/api/users/role/${user._id}`, { role: newRole });
  fetchUsers(); // refresh list
};


  useEffect(() => {
    fetchUsers();
  }, []);

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
