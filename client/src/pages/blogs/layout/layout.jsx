import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../../styles/colors'
import ZoomImage from '../../../components/analizar/zoomImage'
import Subtitle from './subtitle'
import Paragraph from './paragraph'
import { useChangeBackground } from '../../../hooks/changeBackground'
import Image from './image'
import Button from '../../../components/global/button'

const BlogLayout = ({ title, fecha, autor, descripcion, categorias, img, children, references }) => {
  useChangeBackground(colors.primary200);
  const navigate = useNavigate();

  const back = () => {
    window.scrollTo(0, 0);
    navigate("/blog");
  }

  return (
    <BlogLayoutContainer>
      <small>Publicado el <span>{fecha}</span> por <span>{autor}</span></small>
      <h2>{title}</h2>
      {descripcion && <p className='description'>{descripcion}</p>}
      {categorias && 
        <div className='categories'>
          {categorias.map(category => <p>{category}</p>)}
        </div>
      }
      <div className='img-container'>
        <ZoomImage 
          src={img} 
          alt="blog-portrait" 
          border={4}
        />
      </div>
      <div className='content'>
        <div className='content-children'>
          { children }
        </div>
        {
          references &&
          <div className='buttons'>
            {references.map(button => (
              <a href={button.url} target='_blank'>{button.icon}</a>
            ))}
          </div>
        }
      </div>
      <div className='last-button'>
        <Button onClick={back} type="secondary">Leer más blogs</Button>
      </div>
    </BlogLayoutContainer>
  )
}

BlogLayout.Subtitulo = Subtitle;
BlogLayout.Parrafo = Paragraph;
BlogLayout.Imagen = Image;

export default BlogLayout

const BlogLayoutContainer = styled.div`
  min-height: calc(100dvh - 32px);
  padding: 100px 40px 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  & > small {
    text-align: center;
    & > span {
      color: ${colors.primary500};
      font-weight: 600;
    }
  }
  & > h2 {
    font-size: 2rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
    max-width: 800px;
    text-align: center;
  }
  & > .description {
    opacity: 0.6;
    max-width: 600px;
    text-align: center;
  }
  & > .categories {
    display: flex;
    gap: 12px;
    max-width: 600px;
    flex-wrap: wrap;
    justify-content: center;
    & > p {
      background-color: ${colors.primary400};
      color: ${colors.white};
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
    }
  }
  & > .img-container {
    width: 900px;
    max-width: 100%;
    height: 450px;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  & > .last-button {
    width: 900px;
    max-width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
  }
  & > .content {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    width: 900px;
    max-width: 100%;
    @media screen and (max-width: 650px) {
      flex-direction: column;
      gap: 24px;
    }
    & > .buttons {
      display: flex;
      flex-direction: column;
      gap: 16px;
      @media screen and (max-width: 650px) {
        flex-direction: row;
      }
    }
    & a {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 1px solid ${colors.primary500};
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: ${colors.primary500};
      font-size: 24px;
      transition: all 0.3s;
      &:hover {
        opacity: 0.8;
        transform: translateY(-4px);
      }
    }
    & > .content-children {
      width: 85%;
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding-left: 56px;
      @media screen and (max-width: 650px) {
        width: 100%;
        padding-left: 0;
      }
    }
  }
`;