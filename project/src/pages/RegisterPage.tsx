import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2"
import PageWrapper from "../components/wrapper/PageWrapper"
import { IRegister } from "../interfaces/IRegister"
import { RegisterType } from "../enum/RegisterType"

interface Props {
  registers: IRegister[]
  nextPage: () => void
  previousPage: () => void
  page: number
  totalPages: number
}

const RegisterPage = ({
  registers,
  nextPage,
  previousPage,
  page,
  totalPages,
}: Props) => {
  return (
    <PageWrapper full={false}>
      <section className="w-full h-full flex flex-col items-center gap-2 xsm:gap-4 p-3 xsm:p-5 sm:w-3/5 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <header className="bg-light-green w-full px-5 py-2 xsm:py-3 rounded-2xl text-light-green flex justify-between gap-4">
          <button type="button" className="bg-white h-full p-2 flex-grow rounded-xl font-bold uppercase text-lg">
            Consultar
          </button>
          <button type="button" className="bg-white p-2 rounded-xl text-3xl">
            <HiOutlineAdjustmentsHorizontal />
          </button>
        </header>

        <ul className="flex-grow w-full bg-gray mb-28 rounded-2xl flex flex-col p-4 gap-2">
          {registers.map((register) => (
            <li 
              key={register.id} 
              className={`${register.type === RegisterType.IN ? "bg-light-green text-white" : "bg-white text-light-green"} grid grid-cols-3 py-2 px-4 text-base rounded-xl shadow-full font-semibold `}>
              <p className="flex justify-start">{register.type === RegisterType.IN ? "Entrada" : "Saída"}</p>
              <p className="flex justify-center">{`${String(register.time.getHours()).padStart(2, "0")}:${String(register.time.getMinutes()).padStart(2, "0")}`}</p>
              <p className="flex justify-end">{`${register.time.getDate()}/${register.time.getMonth() + 1}/${register.time.getFullYear()}`}</p>
            </li>
          ))}

          <div className="flex justify-center gap-4 items-center mt-4">
            <button 
              type="button" 
              className="bg-light-green p-2 rounded-xl text-3xl flex items-center justify-center disabled:opacity-50"
              onClick={previousPage}
              disabled={page === 0}
            >
              <img src="/icon/right_arrow.png" alt="" className="h-5 w-5 invert rotate-180" />
            </button>
            <p className="text-light-green font-bold">{`${page + 1} de ${totalPages} páginas`}</p>
            <button 
              type="button" 
              className="bg-light-green p-2 rounded-xl text-3xl flex items-center justify-center disabled:opacity-50"
              onClick={nextPage}
              disabled={page === totalPages - 1}
            >
              <img src="/icon/right_arrow.png" alt="" className="h-5 w-5 invert" />
            </button>
          </div>
        </ul>
      </section>
    </PageWrapper>
  )
}

export default RegisterPage
