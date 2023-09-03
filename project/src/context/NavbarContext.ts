import React, { createContext } from "react"

export type NavbarType = "home" | "code" | "register" | "leave";

export const NavbarContext = createContext<{
    selected: NavbarType;
    setSelected: React.Dispatch<React.SetStateAction<NavbarType>>;
}>({
  selected: "home",
  setSelected: () => {},
})
