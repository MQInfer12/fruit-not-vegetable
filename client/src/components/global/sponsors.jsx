import React from 'react'
import Sponsor1 from '../../assets/sponsor1.png'
import Sponsor2 from '../../assets/sponsor2.png'
import Sponsor3 from '../../assets/sponsor3.png'
import Sponsor4 from '../../assets/sponsor4.png'
import Sponsor5 from '../../assets/sponsor5.png'
import { styled } from 'styled-components'

const Sponsors = () => {
  return (
    <Container>
      <div>
        <img src={Sponsor1} />
        <img src={Sponsor2} />
        <img src={Sponsor3} />
        <img src={Sponsor4} />
        <img src={Sponsor5} />
      </div>
      <div>
        <img src={Sponsor1} />
        <img src={Sponsor2} />
        <img src={Sponsor3} />
        <img src={Sponsor4} />
        <img src={Sponsor5} />
      </div>
    </Container>
  )
}

export default Sponsors

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 32px 0;
  display: flex;

  &:hover > div {
    opacity: 0.8;
  }

  & > div {
    display: flex;
    align-items: center;
    white-space: nowrap;
    align-items: center;
    animation: move 30s linear infinite;
    transition: all 0.3s;

    & img {
      max-width: 189px;
      object-fit: cover;
      margin: 0 80px;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        scale: 1.2;
      }
    }
    
    @keyframes move {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-100%);
      }
    }
  }
`;