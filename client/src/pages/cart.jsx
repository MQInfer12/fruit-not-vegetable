import React from 'react'
import styled from 'styled-components';
import Cart from '../components/global/cart';
import { useUser } from '../context/user';
import CartData from '../utilities/cartData';
import colors from '../styles/colors';
import { useChangeBackground } from '../hooks/changeBackground';

const CartPage = () => {
  const { user } = useUser();
  useChangeBackground(colors.primary500);

  const itemsNotAdquired = CartData
    .filter(item => !item.id.includes(user.rol) && !user.rol.includes(item.id))
    .map(item => item.id);
  
  return (
    <Container>
      <Cart showItems={itemsNotAdquired} />
    </Container>
  )
}

export default CartPage

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 100px 40px 65px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;