import Swal from "sweetalert2";
import { useUser } from "../context/user";
import { deleteAuthCookie, getAuthCookie } from "../utilities/authCookie";

export const useRequest = () => {
  const { setUser } = useUser();

  const sendRequest = async (
    route,
    body,
    method = "POST",
    returnRaw = false
  ) => {
    try {
      const token = getAuthCookie();

      const headers = {
        Authorization: token ? `Bearer ${token}` : undefined,
      };
      if (!(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
        headers["Accept"] = "application/json";
      }

      const res = await fetch(`${import.meta.env.VITE_BACKEND}${route}`, {
        method: method,
        headers,
        body: body instanceof FormData ? body : JSON.stringify(body),
      });
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
        if (returnRaw) {
          return res;
        }
        const resJson = await res.json();
        return resJson;
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Ups...",
        text: "Algo salió mal... intentelo de nuevo.",
      });
    }
  };

  return sendRequest;
};
