import React, { useState } from 'react'
import styled from 'styled-components'
import colors from '../../styles/colors'
import Method from './cart/method'
import Items from './cart/items'
import { useBackground } from '../../context/background'
import Pay from './cart/pay'
import NewMethod from './cart/newMethod'
import CartData from '../../utilities/cartData'
import HandIcon from './cart/handIcon'

const Cart = ({ goBack, showItems, registerForm }) => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const { color } = useBackground();

  const addItem = (id) => {
    if(!items.includes(id)) {
      setItems([...items, id]);
      setPage(2);
    } else {
      setItems(items.filter(i => i!== id));
    }
  }

  const total = items.reduce((suma, item) => {
    const realItem = CartData.find(i => i.id === item);
    return suma + realItem?.precio;
  }, 0);
  const realItemsDisables = items.map(item => CartData.find(i => i.id === item).disables).flat();
  const disableds = [...new Set(realItemsDisables)];
  return (
    <Container bg={color} page={page}>
      {
        showItems.length === 0 ?
        <IconContainer>
          <HandIcon 
            text="¡Muchas gracias por adquirir los productos de Doctor Tomatto!"
            icon="fa-regular fa-face-laugh-beam"
          />
        </IconContainer>
        :
        <>
        <div className='items'>
          <div className='title'>
            {goBack && <BackButton onClick={goBack}><i className="fa-solid fa-chevron-left"></i></BackButton>}
            <h2>Carrito</h2>
            <BackButton className='next' onClick={() => setPage(2)}><i className="fa-solid fa-chevron-right"></i></BackButton>
          </div>
          <Items 
            itemsSelected={items}
            addItem={addItem}
            showItems={showItems}
            disableds={disableds}
          />
        </div>
        <NewMethod 
          items={items}
          setItems={setItems}
          total={total}
          setPage={setPage}
          page={page}
        />
        <Pay 
          key={total}
          registerForm={registerForm}
          items={items}
          total={total}
          setPage={setPage}
          page={page}
        />
        </>
      }
      {/* <Method 
        itemId={item}
        setItem={setItem}
        setPage={setPage}
      /> */}
    </Container>
  )
}

export default Cart

const Container = styled.div`
  width: 920px;
  height: 480px;
  background-color: ${colors.primary300};
  border: 4px solid ${props => props.bg === colors.primary500 ? colors.primary400 : colors.primary500};
  transition: transform 0.3s;
  display: flex;
  padding: 24px 0 24px;
  overflow: hidden;
  gap: 12px;

  @media screen and (max-width: 1006px) {
    flex-direction: column;
    gap: 0;
  }

  & > .items {
    min-width: 450px;
    height: 100%;

    @media screen and (max-width: 1006px) {
      min-height: 436px;
      min-width: 0;
    }

    & > .title {
      padding-left: 24px;
      display: flex;
      align-items: center;
      gap: 8px;
      @media screen and (max-width: 1006px) {
        padding-right: 24px;
        width: 100%;
        justify-content: space-between;
      }
      & > h2 {
        color: ${colors.primary500};
        font-size: 1.4rem;
        font-weight: 600;
        font-family: 'Chillax';
      }
      & > .next {
        display: none;
        @media screen and (max-width: 1006px) {
          display: block;
        }
      }
    }
  }
  
  & > div {
    transition: transform 0.3s;
    transform: ${props => props.page === 1 ? "translateX(-462px)" : "translateX(0)"};
    @media screen and (max-width: 1006px) {
      transform: ${props => props.page === 2 ? "translateY(-460px)" : props.page === 1 ? "translateY(-932px)" : "translateY(0)"};
    }
  }
`;

const BackButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${colors.primary500};
  font-size: 1.2rem;
  cursor: pointer;
  transition: scale 0.3s;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    scale: 1.2;
  }
`;

const IconContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;