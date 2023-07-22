import React from 'react'
import { 
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend 
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { styled } from 'styled-components';
import chartColors from '../../styles/chartColors';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = ({ pines }) => {
  const options = {
    maintainAspectRatio: false
  };
  const data = {
    labels: ['Enfermedad'],
    datasets: pines.reduce((array, value, index) => {
      const enfermedadExiste = array.find(enfermedad => enfermedad.label === value.enfermedad);
      if(!enfermedadExiste) {
        array.push({
          label: value.enfermedad,
          data: [1],
          borderWidth: 1,
          ...chartColors[array.length]
        });
      } else {
        enfermedadExiste.data[0] += 1;
      }
      return array;
    }, [])
  };

  return (
    <Container>
      <Bar
        data={data}
        options={options}
      ></Bar>
    </Container>
  )
}

export default BarChart

const Container = styled.div`
  margin-top: 20px;
  min-height: 300px;
  height: 300px;
  width: 100%;
`;