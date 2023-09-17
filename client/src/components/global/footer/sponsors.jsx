import React, { useState } from 'react'
import Sponsor1 from '../../../assets/sponsor1.png'
import { styled } from 'styled-components'
import colors from '../../../styles/colors'
import SponsorPaper from './sponsorPaper'
import { getRandomInt } from '../../../utilities/getRandomInt'
import { usePublicidad } from '../../../context/publicidad'

const Sponsors = ({ size, padding, tipo = "G" }) => {
  const { publicidadGeneral, publicidadEspecifica } = usePublicidad();
  const sponsorData = tipo === "G" ? publicidadGeneral : publicidadEspecifica;

  const getInitialSponsorData = () => {
    const diff = sponsorData.length % 5;
    if(diff > 0) {
      for(let i = 0; i < 5 - (diff); i++) {
        sponsorData.push(null);
      }
    }
    return sponsorData.map((sponsor, i) => ({
      ...sponsor,
      inclinacion: getRandomInt(-6, 7),
      color: colors[`pastel${(i % 5) + 1}`],
      img: Sponsor1
    }));
  }

  const [data] = useState(getInitialSponsorData());
  const [active, setActive] = useState(null);
  const changeActive = (number) => {
    setActive(active === number ? null : number);
  }

  return (
    <Container active={active !== null} width={data.length * 360} speed={data.length * 6}>
      <div id='sponsors-animation'>
        {data.map((value, i) => (
          <SponsorPaper 
            key={i}
            onClick={() => Object.keys(value).length !== 3 && changeActive(i)}
            active={active === i}
            value={value}
            size={size}
            padding={padding}
          />
        ))}
      </div>
      <div>
        {data.map((value, i) => (
          <SponsorPaper 
            key={data.length + i}
            onClick={() => Object.keys(value).length !== 3 && changeActive(i)}
            active={active === (data.length + i)}
            value={value}
            size={size}
            padding={padding}
          />
        ))}
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

  & > div {
    display: flex;
    align-items: center;
    white-space: nowrap;
    align-items: center;
    animation: move ${props => props.speed}s linear infinite;
    animation-play-state: ${props => props.active ? "paused" : ""};
    
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