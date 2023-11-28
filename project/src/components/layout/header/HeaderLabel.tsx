import { useContext, useEffect, useState } from "react"
import useHeader from "../../../service/components/useHeader"
import LoadingContext from "../../../context/LoadingContext"

const HeaderLabel = () => {
  //const [ showModal, setShowModal ] = useState(false)

  //const [ selectedGuarded, setSelectedGuarded ] = useState(guardeds[0])

  /*
   * const handleOnSelect = (guarded: string) => {
   *   setSelectedGuarded(guarded)
   *   setShowModal(false)
   * }
   */
  const [ name, setName ] = useState("Teste")

  const headerService = useHeader()

  const { setLoading } = useContext(LoadingContext)

  useEffect(() => {
    setLoading(true)
    headerService.getName().then((name) => {
      setName(name)
      setLoading(false)
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full flex justify-between items-center">
      <label htmlFor="headerlabelbtn" className={`font-semibold text-lg ml-3 mt-3 flex flex-grow
                      md:justify-end md:items-center md:text-left md:mr-3
                      xl:text-2xl`}>
        {/*${RoleType.GUARDED === "GUARDIAN" && "cursor-pointer"}*/} 

        { name }
      </label>
      {/* {RoleType.GUARDED === "GUARDIAN" && (
        <button id="headerlabelbtn" type="button" className="outline-none h-full flex items-center justify-center mt-3" onClick={() => setShowModal((prev) => !prev)}>
          <IoIosArrowDown className={`text-2xl transition-all duration-300 ${showModal && "rotate-180"}`} />
        </button>
      )}
      {showModal && <GuardedModal guardeds={guardeds} handleOnClose={setShowModal} handleOnSelect={handleOnSelect} />} */}
    </div>
  )
}

export default HeaderLabel
