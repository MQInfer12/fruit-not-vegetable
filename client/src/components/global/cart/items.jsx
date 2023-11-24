import React from 'react'
import styled from 'styled-components';
import CartData from '../../../utilities/cartData'
import colors from '../../../styles/colors';
import ZoomImage from '../../analizar/zoomImage';
import Button from '../button';

const Items = ({ itemSelected, addItem, showItems }) => {
  return (
    <TopContainer>
      <ItemsContainer>
        {CartData.filter(item => showItems.includes(item.id)).map(item => (
          <ItemCard key={item.id}>
            <div>
              <div className='img'>
                <ZoomImage 
                  src={item.img} 
                  border={2}
                />
              </div>
              <div className='data'>
                <b>{item.name}</b>
                <p>Precio: {item.precio} US$</p>
              </div>
            </div>
            <Button 
              disabled={itemSelected === item.id}
              onClick={() => addItem(item.id)}
              size="little"
              type="secondary"
            >
              {itemSelected === item.id ? "Seleccionado" : "Seleccionar"}
            </Button>
          </ItemCard>
        ))}
      </ItemsContainer>
    </TopContainer>
  )
}

export default Items

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 32px);
  position: relative;
  transition: padding 0.3s;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  gap: 16px;
  height: 100%;
  overflow: auto;
  padding: 24px 24px;
`;

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 2px solid ${colors.primary500};
  padding: 16px;
  background-color: ${colors.primary200};

  & > div {
    display: flex;
    gap: 16px;
    
    & > .img {
      min-width: 80px;
      max-width: 80px;
      height: 80px; 
    }
    & > .data {
      display: flex;
      flex-direction: column;
      gap: 4px;

      & > b {
        font-size: .9rem;
        color: ${colors.primary500};
        font-weight: 600;
        font-family: 'Chillax';
      }
      & > p {
        font-size: .8rem;
        font-weight: 600;
        opacity: 0.8;
      }
    }
  }
`;
