import { useEffect, useState } from "react"

export const useGet = (route, initialState = [], send = true, absolutePath = false) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const res = await fetch(absolutePath ? route : `${import.meta.env.VITE_BACKEND}${route}`);
    if(res.ok) {
      const json = await res.json();
      setData(json);
    }
    setLoading(false);
  }

  useEffect(() => {
    if(send) {
      getData();
    } 
  }, []);

  return { data, loading, getData };
}