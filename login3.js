import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage3 = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.userId === userId && storedUser.password === password) {
      navigate('/dashboard'); 
    } else {
      setError('Invalid credentials.');
    }
  };
  
  return (
    <div style={{ textAlign: 'center', padding: '30px' }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={inputStyle}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      /><br />
      <button onClick={handleLogin} style={buttonStyle}>Login</button>
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  );
};

const pageStyle = {
  fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  backgroundImage: `url('/foodtruck.jpg')`, 
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  margin: 0,
  padding: 0,
};

const inputStyle = {
  padding: '10px',
  margin: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '200px'
};

const buttonStyle = {
  padding: '10px 15px',
  cursor: 'pointer',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  marginTop: '10px'
};

export default LoginPage3;
