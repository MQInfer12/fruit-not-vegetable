import React from 'react'
import Sponsor1 from '../../assets/sponsor1.png'
import Sponsor2 from '../../assets/sponsor2.png'
import Sponsor3 from '../../assets/sponsor3.png'
import Sponsor4 from '../../assets/sponsor4.png'
import Sponsor5 from '../../assets/sponsor5.png'
import { styled } from 'styled-components'
import colors from '../../styles/colors'

const FifthSection = () => {
  return (
    <Container>
      <img src={Sponsor1} />
      <img src={Sponsor2} />
      <img src={Sponsor3} />
      <img src={Sponsor4} />
      <img src={Sponsor5} />
    </Container>
  )
}

export default FifthSection

const Container = styled.div`
  background-color: ${colors.primary300};
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  & > img {
    max-width: 189px;
    object-fit: cover;
  }
`;