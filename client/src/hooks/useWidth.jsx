import React, { useEffect } from 'react'
import { useState } from 'react'

const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    })
  }, []);

  console.log(width);
  return width
}

export default useWidth