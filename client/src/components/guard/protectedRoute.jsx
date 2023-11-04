import React from 'react'
import { useUser } from '../../context/user'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, rol = "" }) => {
  const { user } = useUser();

  if(!user) {
    return <Navigate to="/login" />
  } 

  if(!user.rol.includes(rol)) {
    return <Navigate to="/" />
  }

  return children;
}

export default ProtectedRoute