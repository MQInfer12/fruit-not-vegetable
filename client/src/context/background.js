import { create } from "zustand";
import colors from "../styles/colors";

export const useBackground = create(set => ({
  color: colors.primary500,
  changeColor: (newColor) => set(old => ({...old, color: newColor }))
}))