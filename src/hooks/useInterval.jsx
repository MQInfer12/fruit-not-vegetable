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
  }, []);

  return active
}