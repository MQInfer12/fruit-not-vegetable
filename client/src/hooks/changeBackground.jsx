import { useEffect } from 'react'
import { useBackground } from '../context/background';

export const useChangeBackground = (newColor) => {
  const { changeColor } = useBackground();

  useEffect(() => {
    changeColor(newColor);
  }, []);
}
