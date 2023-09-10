import { Dispatch, ReactNode, SetStateAction } from "react"
import { IoCloseSharp } from "react-icons/io5"

interface OverlayProps {
  children: ReactNode
  handleOnClose: Dispatch<SetStateAction<boolean>>
  title: string
  RightButton?: ReactNode
}
const Modal = ({ children , handleOnClose, title, RightButton }: OverlayProps) => {
  return (
    <div
      className="fixed w-full h-screen flex items-center justify-center bg-black/70 top-0 left-0 z-50"
    >

      <div className="bg-light-green p-5 rounded-3xl shadow-lg w-[90%] sm:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%] text-white">
        <header className="flex flex-row items-center justify-start mb-8">
          <button id="guardedmodalbtn" type="button" className="mr-2 text-3xl" onClick={() => handleOnClose(false)}>
            <IoCloseSharp className="" />
          </button>
          <label htmlFor="guardedmodalbtn" className="flex-grow font-semibold text-xl cursor-pointer">{title}</label>
          {RightButton && RightButton}
        </header>
        {children}
      </div>

    </div>
  )
}

export default Modal
