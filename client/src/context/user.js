import { create } from "zustand";

export const useUser = create(set => {
  const localUser = localStorage.getItem("tomattouser");
  return {
    user: localUser ? JSON.parse(localUser) : null,
    setUser: (user) => {
      localStorage.setItem("tomattouser", JSON.stringify(user));
      set(old => ({...old, user}));
    }
  }
})