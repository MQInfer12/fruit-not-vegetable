import React from 'react'
import ZoomImage from '../../../components/analizar/zoomImage'
import styled from 'styled-components'

const Image = ({ src, text, height = 400, width = 60, video = false }) => {
  return (
    <Container height={height} width={width}>
      <div>
        {
          video ?
          <video src={src} controls /> :
          <ZoomImage 
            alt="blog-picture" 
            src={src} 
            border={4}
          />
        }
      </div>
      {text && <small>{text}</small>}
    </Container>
  )
}

export default Image

const Container = styled.div`
  width: ${props => props.width}%;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  & > div {
    width: 100%;
    height: ${props => props.height}px;
  }
  & video {
    height: 100%;
    width: 100%;
  }
  & > small {
    font-size: .8rem;
    opacity: 0.8;
  }
`;