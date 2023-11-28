import { AiOutlineHome } from "react-icons/ai"
import { BsQrCode } from "react-icons/bs"
import { IoDocumentTextOutline } from "react-icons/io5"
import { useTranslation } from "react-i18next"
import { useContext } from "react"
import { NavbarContext } from "../../../context/NavbarContext"
import NavbarItem from "./NavbarItem"

const Navbar = () => {
  const { t } = useTranslation()

  const { selected, setSelected } = useContext(NavbarContext)

  return (
    <nav className="shadow-full flex py-4 px-8 gap-8 rounded-full fixed bottom-4 xsm:bottom-8 bg-white z-40">
      {        
        <NavbarItem
          url={t("url.code")}
          type = "code"
          icon={<BsQrCode />}
          selected={selected === "code"}
          handleOnClick={setSelected}
        />
      }

      <NavbarItem
        url={t("url.home")}
        type = "home"
        icon={<AiOutlineHome />}
        selected={selected === "home"}
        handleOnClick={setSelected}
      />

      <NavbarItem
        url={t("url.register")}
        type = "register"
        icon={<IoDocumentTextOutline />}
        selected={selected === "register"}
        handleOnClick={setSelected}
      />

    </nav >
  )
}

export default Navbar
