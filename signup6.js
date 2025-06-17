import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage6 = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[0-9]+$/.test(userId)) {
      setError('User ID must contain numbers only.');
    } else if (!validatePassword(password)) {
      setError('Password must be 8+ chars, 1 lowercase, 1 uppercase, 1 special char.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      localStorage.setItem('user', JSON.stringify({ userId, password }));
      navigate('/login3');
    }
  };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Shreyash Food Truck</h1>
        <button onClick={() => navigate('/login3')} style={loginButtonStyle}>Login</button>
      </header>

      <form onSubmit={handleSubmit} style={formContainerStyle} autoComplete="on">
        <h2>Sign Up</h2>

        <input
          type="text"
          placeholder="User ID (numbers only)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          name="username"
          autoComplete="username"
          required
          style={inputStyle}
        /><br />

        <input
          type="password"
          placeholder="Password (8+ chars, 1 lowercase, 1 uppercase, 1 special char)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="new-password"
          autoComplete="new-password"
          required
          style={inputStyle}
        /><br />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={inputStyle}
        /><br />

        <button type="submit" style={signUpButtonStyle}>Sign Up</button>
        {error && <p style={errorStyle}>{error}</p>}
      </form>
    </div>
  );
};

// --- Styles ---
const pageStyle = {
  fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  backgroundImage: `url('/foodtruck.jpg')`, // Local image in public folder
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  margin: 0,
  padding: 0,
};


const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  padding: '15px 30px',
};

const titleStyle = {
  color: '#fff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: 0,
};

const loginButtonStyle = {
  backgroundColor: '#ffc107',
  color: '#000',
  border: 'none',
  padding: '10px 15px',
  fontSize: '14px',
  fontWeight: 'bold',
  borderRadius: '5px',
  cursor: 'pointer',
};

const formContainerStyle = {
  maxWidth: '400px',
  margin: '60px auto',
  padding: '30px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '12px',
  boxShadow: '0 0 10px rgba(0,0,0,0.2)',
  textAlign: 'center',
};

const inputStyle = {
  padding: '12px',
  margin: '10px 0',
  borderRadius: '6px',
  border: '1px solid #ced4da',
  width: '100%',
  fontSize: '16px',
};

const signUpButtonStyle = {
  padding: '12px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  marginTop: '15px',
  cursor: 'pointer',
  width: '100%',
};

const errorStyle = {
  color: 'red',
  marginTop: '10px',
};

export default SignUpPage6;
