import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, isAdmin }) => {
  const { user } = useContext(AuthContext);

  if (!user || (isAdmin && user.role !== 'admin')) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;