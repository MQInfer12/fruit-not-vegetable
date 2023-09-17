import { create } from "zustand";

export const usePublicidad = create((set) => ({
  publicidadGeneral: null,
  publicidadEspecifica: null,
  setPublicidadGeneral: (publicidadGeneral) => set(old => ({...old, publicidadGeneral })),
  setPublicidadEspecifica: (publicidadEspecifica) => set(old => ({...old, publicidadEspecifica }))
}))