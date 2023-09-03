import React from "react"
import { Link } from "react-router-dom"
import { NavbarType } from "../../../context/NavbarContext"

interface Props {
    url: string
    type: NavbarType
    icon: React.ReactNode
    selected?: boolean
    handleOnClick: React.Dispatch<React.SetStateAction<NavbarType>>
}

const NavbarItem = ({ url, type, icon, selected = false, handleOnClick }: Props) => {
  return (
    <Link to={url} 
      className={`text-3xl p-3 rounded-full ${selected ? "text-light-green bg-light-green/[.2]" : "text-black/[.6]"}`}
      onClick={() => handleOnClick(type)}
    >
      {icon}
    </Link>
  )
}

export default NavbarItem
