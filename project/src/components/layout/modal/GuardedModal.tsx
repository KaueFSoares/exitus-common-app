import { useTranslation } from "react-i18next"
import React from "react"
import Modal from "./Modal"

interface GuardedModalProps {
  guardeds: string[]
  handleOnSelect: (guarded: string) => void
  handleOnClose: React.Dispatch<React.SetStateAction<boolean>>
}

const GuardedModal = ({ guardeds, handleOnClose, handleOnSelect }: GuardedModalProps) => {
  const { t } = useTranslation()
  
  return (
    <Modal handleOnClose={handleOnClose} title={t("header.guardeds")}>
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
    </Modal>
  )
}

export default GuardedModal
