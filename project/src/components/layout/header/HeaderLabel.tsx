import { IoIosArrowDown } from "react-icons/io"
import { useContext, useState } from "react"
import AuthContext from "../../../context/AuthContext"
import GuardedModal from "./GuardedModal"

const guardeds = [ "João Pedro", "Matheus da Silva", "Maria Joaquina", "Julia Moraes Julia Moraes Julia Moraes" ]

const HeaderLabel = () => {
  const { auth } = useContext(AuthContext)

  const [ showModal, setShowModal ] = useState(false)

  const [ selectedGuarded, setSelectedGuarded ] = useState(guardeds[0])

  const handleOnSelect = (guarded: string) => {
    setSelectedGuarded(guarded)
    setShowModal(false)
  }

  return (
    <div className="w-full flex justify-between items-center">
      <label htmlFor="headerlabelbtn" className={`font-semibold text-lg ml-3 mt-3 flex flex-grow
                      md:justify-end md:items-center md:text-left md:mr-3
                      xl:text-2xl
                      ${auth.role === "GUARDIAN" && "cursor-pointer"}`}>
        {/* this will come from API */}
        {selectedGuarded} 
      </label>
      {auth.role === "GUARDIAN" && (
        <button id="headerlabelbtn" type="button" className="outline-none h-full flex items-center justify-center mt-3" onClick={() => setShowModal((prev) => !prev)}>
          <IoIosArrowDown className={`text-2xl transition-all duration-300 ${showModal && "rotate-180"}`} />
        </button>
      )}
      {showModal && <GuardedModal guardeds={guardeds} handleOnClose={setShowModal} handleOnSelect={handleOnSelect} />}
    </div>
  )
}

export default HeaderLabel
