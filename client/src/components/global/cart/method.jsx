import React from 'react'
import styled from 'styled-components'
import colors from '../../../styles/colors'
import Button from '../button'
import CartData from '../../../utilities/cartData'
import HandIcon from './handIcon'
import ZoomImage from '../../analizar/zoomImage'

const Method = ({ itemId, setItem, setPage }) => {
  const item = CartData.find(i => i.id === itemId);
  return (
    <Container>
      {
        itemId ?
        <>
        <DetailsContainer>
          <div className='img-container'>
            <ZoomImage 
              src={item.img} 
              border={4}
            />
          </div>
          <b>{item.name}</b>
          <p className='description'>{item.description}</p>
          <p className='total'>Total a pagar: <b>{item?.precio} US$</b></p>
        </DetailsContainer>
        <Buttons>
          <Button type="secondary" size="little" onClick={() => setItem(null)}>Cancelar</Button>
          <Button type="secondary" size="little" onClick={() => setPage(1)}>Continuar a pago</Button>
        </Buttons>
        </> :
        <HandIcon />
      }
    </Container>
  )
}

export default Method

const Container = styled.div`
  width: 450px;
  padding: 24px 48px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow: auto;
  & > h2 {
    font-size: 1.4rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  & > .img-container {
    width: 150px;
    height: 80px;
  }
  & > b {
    color: ${colors.primary500};
    text-align: center;
  }
  & > .description {
    font-size: 0.9rem;
    opacity: 0.8;
    text-align: justify;
  }
  & > .total {
    color: ${colors.primary500};
  }
`;

const Buttons = styled.div`
  display: flex;
  align-self: center;
  gap: 20px;
`