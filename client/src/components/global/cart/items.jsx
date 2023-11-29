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
            <div className='img-container'>
              <ZoomImage 
                src={item.img} 
                border={2}
              />
            </div>
            <div className='data-container'>
              <div className='data'>
                <b>{item.name}</b>
                <small>{item.description}</small>
                <p>Precio: {item.precio} US$</p>
              </div>
              <Button 
                disabled={itemSelected === item.id}
                onClick={() => addItem(item.id)}
                size="little"
                type="secondary"
              >
                {itemSelected === item.id ? "Seleccionado" : "Seleccionar"}
              </Button>
            </div>
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
  width: 100%;
  gap: 16px;
  border: 2px solid ${colors.primary500};
  padding: 16px;
  background-color: ${colors.primary200};
  border-radius: 8px;
  height: max-content;

  & > .img-container {
    min-height: 172px;
    min-width: 120px;
    height: 172px;
    width: 120px;
  }

  & > .data-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    & > .img {
      min-width: 80px;
      max-width: 80px;
      height: 80px; 
    }
    & > button {
      align-self: flex-end;
    }
    & > .data {
      display: flex;
      flex-direction: column;
      gap: 4px;

      & > small {
        opacity: 0.8;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        line-clamp: 4; 
        -webkit-box-orient: vertical;
      }
      & > b {
        font-size: .9rem;
        color: ${colors.primary500};
        font-weight: 600;
        font-family: 'Chillax';
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1; 
        -webkit-box-orient: vertical;
      }
      & > p {
        font-size: .8rem;
        font-weight: 600;
        opacity: 0.8;
        align-self: flex-end;
      }
    }
  }
`;
