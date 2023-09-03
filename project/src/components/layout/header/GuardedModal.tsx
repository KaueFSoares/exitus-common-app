import { useTranslation } from "react-i18next"
import { IoCloseSharp } from "react-icons/io5"
import React from "react"

interface GuardedModalProps {
  guardeds: string[]
  handleOnSelect: (guarded: string) => void
  handleOnClose: React.Dispatch<React.SetStateAction<boolean>>
}

const GuardedModal = ({ guardeds, handleOnClose, handleOnSelect }: GuardedModalProps) => {
  const { t } = useTranslation()
  
  return (
    <div className="z-50 absolute w-full h-full bg-black/[.5] top-0 left-0 flex items-center justify-center" onClick={() => handleOnClose(false)}>
      <div className="bg-light-green p-5 rounded-3xl shadow-lg w-[90%] sm:w-[50%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%]">
        <header className="flex flex-row items-center justify-start mb-8">
          <button id="guardedmodalbtn" type="button" className="mr-2" onClick={() => handleOnClose(false)}>
            <IoCloseSharp className="text-3xl" />
          </button>
          <label htmlFor="guardedmodalbtn" className="font-semibold text-xl cursor-pointer">{t("header.guardeds")}</label>
        </header>

        <h2 className="font-semibold text-xl px-2 mb-4">{t("header.students")}</h2>

        <ul className="flex flex-col gap-2">
          {guardeds.map((guarded) => (
            <li 
              role="button" 
              key={guarded} 
              className="text-lg font-semibold py-2 px-4 bg-white text-light-green rounded-lg cursor-pointer hover:text-white hover:bg-light-green border-2 border-white border-solid"
              onClick={() => handleOnSelect(guarded)}
            >
              {guarded}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default GuardedModal
