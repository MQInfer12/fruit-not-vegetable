import React from 'react'
import { useUser } from '../../context/user'
import { Navigate, useNavigate } from 'react-router-dom';
import ErrorPermiso from '../../pages/errorPermiso';

const ProtectedRoute = ({ children, rol = "" }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  if(!user) {
    return <ErrorPermiso 
      text="Iniciar sesión para usar esta funcionalidad"
      buttonText="Iniciar sesión"
      onClick={() => navigate("/login")}
    />
  } 

  if(!user.rol.includes(rol)) {
    return <Navigate to="/cart" />
  }

  return children;
}

export default ProtectedRoute