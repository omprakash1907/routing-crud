// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token'); // Check if token exists

  if (!token) {
    // Redirect to login page if no token is found
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child component
  return children;
};

export default ProtectedRoute;
