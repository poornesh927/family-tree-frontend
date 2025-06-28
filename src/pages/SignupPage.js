import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function SignupPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", family: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
    alert(res.data.msg);
    navigate("/"); // Go to login
  } catch (err) {
    alert(err.response?.data?.msg || "Signup failed");
  }
};


  return (
    <div className="auth-container">
      <h2>Signup</h2>
     <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <select name="family" onChange={handleChange}>
          <option value="">Select Family</option>
          <option value="Mangapuram">Mangapuram</option>
          <option value="Kapuluru">Kapuluru</option>
          <option value="Poornesh">Poornesh</option>
        </select>
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}

export default SignupPage;
