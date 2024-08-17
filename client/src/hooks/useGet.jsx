import { useEffect, useState } from "react";
import { deleteAuthCookie, getAuthCookie } from "../utilities/authCookie";
import { useUser } from "../context/user";
import Swal from "sweetalert2";

export const useGet = (
  route,
  initialState = [],
  send = true,
  absolutePath = false
) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const getData = async () => {
    setLoading(true);
    try {
      const token = getAuthCookie();
      const res = await fetch(
        absolutePath ? route : `${import.meta.env.VITE_BACKEND}${route}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            Accept: "application/json",
          },
        }
      );
      if (res.status === 401) {
        setUser(null);
        deleteAuthCookie();
        Swal.fire({
          icon: "error",
          title: "Ups...",
          text: "La sesión ha expirado, se cerrará automáticamente.",
        });
      }
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (error) {
      console.error("Error durante la petición:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (send) {
      getData();
    }
  }, []);

  return { data, loading, getData };
};
