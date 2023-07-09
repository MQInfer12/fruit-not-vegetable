import { useEffect, useState } from 'react'

export const useInterval = (milliseconds, max) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(old => (old + 1) % max)
    }, milliseconds);
    return () => {
      clearInterval(interval);
    }
  }, [active]);

  const changeActive = (i) => {
    if(i >= max || i < 0) {
      throw new Error("active index out of bounds");
    }
    setActive(i);
  }

  return {
    active,
    changeActive
  }
}