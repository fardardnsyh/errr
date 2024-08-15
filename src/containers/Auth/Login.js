import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../../context/ChatContext';
import './Auth.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useChat();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('username', username);

      dispatch({ type: 'SET_USER', payload: user });

      navigate('/chat');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <div className="circle-container">
          <h1>ChatMinds</h1>
        </div>
      </div>
      <div className="auth-container">
        <h2><i className="fas fa-sign-in-alt"></i> Login</h2>
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
          <Button variant="primary" onClick={handleLogin}>Login</Button>
        </Form>
        <p className="mt-3">Don't have an account? <Button type='button' style={{color:"white",  background: "linear-gradient(135deg, #1f1c38, #241e4a)"}} onClick={() => navigate('/signup')}>Sign up here</Button></p>
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

export default Login;
