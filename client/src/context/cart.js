import { create } from "zustand";

export const useCart = create(set => ({
  open: false,
  setOpen: (open) => set(old => ({...old, open }))
}))