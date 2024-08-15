import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.username === username)) {
      setError('Username already exists');
      return;
    }
    const newUser = {
      id: Date.now(),
      username,
      password,
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedIn', true);
    localStorage.setItem('userId', newUser.id);
    navigate('/login');
  };


  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <div className="circle-container">
          <h1>ChatMinds</h1>
        </div>
      </div>
      <div className="auth-container">
        <h2><i className="fas fa-user-plus"></i> Signup</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label><i className="fas fa-user"></i> Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label><i className="fas fa-lock"></i> Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSignup}>Sign Up</Button>
        </Form>
        <p className="mt-3">Already have an account? <Button type='button' style={{color:"white",  background: "linear-gradient(135deg, #1f1c38, #241e4a)"}} onClick={() => navigate('/login')}>Login here</Button></p>
      </div>
      <Button 
        className="back-button" 
        onClick={() => navigate('/')}
      >
        <i className="fas fa-home"></i>
      </Button>
    </div>
  );
}

export default Signup;
