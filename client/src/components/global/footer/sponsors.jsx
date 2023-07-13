import React, { useRef, useState } from 'react'
import Sponsor1 from '../../../assets/sponsor1.png'
import Sponsor2 from '../../../assets/sponsor2.png'
import Sponsor3 from '../../../assets/sponsor3.png'
import Sponsor4 from '../../../assets/sponsor4.png'
import Sponsor5 from '../../../assets/sponsor5.png'
import { styled } from 'styled-components'
import colors from '../../../styles/colors'
import PaperSquare from './paperSquare'
import PaperOpen from './paperOpen'

const Sponsors = () => {
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  const [data, setData] = useState([{
    img: Sponsor1,
    inclinacion: getRandomInt(-6, 7),
    color: colors.pastel1
  },{
    img: Sponsor2,
    inclinacion: getRandomInt(-6, 7),
    color: colors.pastel2
  },{
    img: Sponsor3,
    inclinacion: getRandomInt(-6, 7),
    color: colors.pastel3
  },{
    img: Sponsor4,
    inclinacion: getRandomInt(-6, 7),
    color: colors.pastel4
  },{
    img: Sponsor5,
    inclinacion: getRandomInt(-6, 7),
    color: colors.pastel5
  }]);
  const [active, setActive] = useState(null);
  const changeActive = (number) => {
    setActive(active === number ? null : number);
  }

  return (
    <Container active={active} width={data.length * 360}>
      <div id='sponsors-animation'>
        {data.map((value, i) => (
          <PaperSquare 
            key={i} 
            onClick={() => changeActive(i)}
            active={active === i}
            color={value.color} 
            inclinacion={value.inclinacion}
          >
            {active === i ?
              <PaperOpen img={value.img}></PaperOpen> :
              <Img src={value.img} />
            }
          </PaperSquare>
        ))}
      </div>
      <div>
        {data.map((value, i) => (
          <PaperSquare 
            key={data.length + i} 
            onClick={() => changeActive(data.length + i)}
            active={active === (data.length + i)}
            color={value.color} 
            inclinacion={value.inclinacion}
          >
            {active === (data.length + i) ?
              <PaperOpen img={value.img}></PaperOpen> :
              <Img src={value.img} />
            }
          </PaperSquare>
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
    animation: move 30s linear infinite;
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

const Img = styled.img`
  max-width: 80%;
  max-height: 80%;
  object-fit: cover;
`;