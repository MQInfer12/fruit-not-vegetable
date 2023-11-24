import React from 'react'
import { useUser } from '../../context/user'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import ErrorPermiso from '../../pages/errorPermiso';
import { useCart } from '../../context/cart';
import Cart from '../global/cart';

const ProtectedRoute = ({ children, rol = "" }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if(!user) {
    return <ErrorPermiso 
      text="Iniciar sesión para usar esta funcionalidad"
      buttonText="Iniciar sesión"
      onClick={() => navigate("/login")}
    />
  } 

  if(!user.rol.includes(rol)) {
    return <ErrorPermiso
      key={pathname}
      cart={
        <Cart 
          showItems={rol}
        />
      }
    />
  }

  return children;
}

export default ProtectedRoute