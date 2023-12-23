import React from 'react'
import styled from 'styled-components';
import CartData from '../../../utilities/cartData'
import colors from '../../../styles/colors';
import ZoomImage from '../../analizar/zoomImage';
import Button from '../button';
import IconCarrito1 from '../../../assets/cart/iconCarrito1.png';
import IconCarrito2 from '../../../assets/cart/iconCarrito2.png';

const Items = ({ itemsSelected, addItem, showItems, disableds }) => {
  return (
    <TopContainer>
      <ItemsContainer>
        {
          CartData.filter(item => showItems.includes(item.id)).map(item => (
          <ItemCard key={item.id}>
            <div className='img-container'>
              <ZoomImage 
                src={item.img} 
                border={2}
              />
            </div>
            <div className='data-container'>
              <div className='data'>
                <b title={item.name}>{item.name}</b>
                <small title={item.description}>{item.description}</small>
                <p>Precio: $us {item.precio.toFixed(2)}</p>
              </div>
              {
                !itemsSelected.includes(item.id) ?
                <Button 
                  onClick={() => addItem(item.id)}
                  size="little"
                  type="secondary"
                  disabled={disableds.includes(item.id)}
                >
                  {itemsSelected.includes(item.id) ? "Seleccionado" : "Seleccionar"}
                </Button> :
                <IconsContainer>
                  <IconButton>
                    <img src={IconCarrito1} />
                  </IconButton>
                  <IconButton className='button' onClick={() => addItem(item.id)}>
                    <img src={IconCarrito2} />
                  </IconButton>
                </IconsContainer>
              }
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

  @media screen and (max-width: 490px) {
    flex-direction: column;
  }

  & > .img-container {
    min-height: 172px;
    min-width: 120px;
    height: 172px;
    width: 120px;
    @media screen and (max-width: 490px) {
      height: 100px;
      min-height: 100px;
      width: 100%;
    }
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

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  align-self: flex-end;
  & > i {
    color: ${colors.primary500};
  }
  & > button {
    width: 40px;
  }
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 6px;
  background-color: transparent;
  border: 2.5px solid ${colors.tertiary400};
  border-radius: 4px;
  &.button {
    cursor: pointer;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.7;
    }
  }
  & > img {
    width: 100%;
    height: 100%;
  }
`;