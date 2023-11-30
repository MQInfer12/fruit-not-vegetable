import React from 'react'
import styled from 'styled-components'
import colors from '../../styles/colors'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ titulo, autor, fecha, img, ruta }) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(ruta)}>
      <div className='img-container'>
      <img src={img} alt={`blog-portrait-${ruta}`} />
      </div>
      <div className='data-container'>
        <h3>{titulo}</h3>
        <div>
          <p>{autor}</p>
          <small>{fecha}</small>
        </div>
      </div>
    </Container>
  )
}

export default BlogCard

const Container = styled.div`
  width: 360px;
  height: 340px;
  border: 4px solid ${colors.primary500};
  background-color: ${colors.primary300};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
    transform: translateY(-8px);
  }

  & > .img-container {
    height: 50%;
    & > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  & > .data-container {
    height: 50%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & > h3 {
      font-size: 1.1rem;
      color: ${colors.primary500};
      font-weight: 600;
      font-family: 'Chillax';
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3; 
      -webkit-box-orient: vertical;
      text-align: justify;
    }
    & > div {
      display: flex;
      justify-content: space-between;
      & > p {
        font-size: .8rem;
      }
      & > small {
        font-size: .8rem;
      }
    }
  }
`;