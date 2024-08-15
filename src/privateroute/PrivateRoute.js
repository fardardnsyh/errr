import React from 'react';
import { Navigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';

const PrivateRoute = ({ element }) => {
  const { state } = useChat();
  
  return state.user ? element : <Navigate to="/" />;
};

export default PrivateRoute;
