import React from 'react'
import styled from 'styled-components';
import colors from '../styles/colors';
import { useChangeBackground } from '../hooks/changeBackground';
import BlogCard from '../components/blog/blogCard';
import Instrucciones from '../assets/blog/instrucciones.jpeg';
import Blog1 from '../assets/blog/blog1.jpeg';

const Blog = () => {
  useChangeBackground(colors.primary200);

  return (
    <Container>
      <h2>Blog</h2>
      <CardsContainer>
        <BlogCard 
          titulo="Instrucciones para el análisis de tus hojas de tomate con Doctor Tomatto"
          autor="Sergio Hernán"
          fecha="Nov 29, 2023"
          img={Instrucciones}
          ruta="instrucciones"
        />
        <BlogCard 
          titulo="¿Cómo se desarrolló Doctor Tomatto?"
          autor="Mauricio Molina"
          fecha="Nov 29, 2023"
          img={Blog1}
          ruta="1"
        />
      </CardsContainer>
    </Container>
  )
}

export default Blog

const Container = styled.section`
  min-height: calc(100dvh - 32px);
  padding: 100px 160px 65px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  
  @media screen and (max-width: 1500px) {
    padding: 100px 40px 65px;
  }

  & > h2 {
    font-size: 2rem;
    color: ${colors.primary500};
    font-weight: 600;
    font-family: 'Chillax';
    line-height: 72px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 24px;
  column-gap: 48px;
  width: 100%;
  justify-content: center;
`;