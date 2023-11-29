import { create } from "zustand";

export const useUser = create(set => {
  const localUser = localStorage.getItem("tomattouser");
  return {
    user: localUser ? JSON.parse(localUser) : null,
    actualCity: null,
    actualCoords: null,
    setUser: (user) => {
      localStorage.setItem("tomattouser", JSON.stringify(user));
      set(old => ({...old, user}));
    },
    setActualCity: (actualCity) => {
      set(old => ({...old, actualCity}));
    },
    setActualCoords: (actualCoords) => {
      set(old => ({...old, actualCoords}));
    }
  }
})