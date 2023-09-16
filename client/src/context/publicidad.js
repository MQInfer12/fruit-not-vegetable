import { create } from "zustand";

export const usePublicidad = create((set) => ({
  publicidades: null,
  setPublicidades: (publicidades) => set(old => ({...old, publicidades }))
}))