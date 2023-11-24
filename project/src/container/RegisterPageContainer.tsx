import { useContext, useEffect, useState } from "react"
import { RegisterPage } from "../pages"
import { IRegister } from "../interfaces/IRegister"
import useRegister from "../service/pages/register.service"
import LoadingContext from "../context/LoadingContext"
import { RegisterType } from "../types/Register"

const RegisterPageContainer = () => {
  const pageSize = 8
  const defaultSort = "desc"

  const [ page, setPage ] = useState<number>(0)
  const [ registers, setRegisters ] = useState<{
    registers: IRegister[]
    totalItems: number
  }>({
    registers: [],
    totalItems: 0,
  })

  const [ type, setType ] = useState<RegisterType | null>(null)
  const [ dateStart, setDateStart ] = useState("")
  const [ dateEnd, setDateEnd ] = useState("")

  const handleDateStartChange = (date: string) => {
    setDateStart(date)
  }

  const handleDateEndChange = (date: string) => {
    setDateEnd(date)
  }

  const handleSubmit = () => {
    setLoading(true)

    registerService.getRegisters({
      page: page,
      sort: defaultSort,
      type: type ? type : undefined,
      dateStart: dateStart,
      dateEnd: dateEnd,
    }).then((res) => {
      console.log("res: ", res.registers)
      setRegisters({
        registers: res.registers,
        totalItems: res.count,
      })
      setLoading(false)
    })
  }

  console.log(registers)

  const registerService = useRegister({ limit: pageSize })

  const { setLoading } = useContext(LoadingContext)

  const totalPages = Math.ceil(registers.totalItems / pageSize)

  useEffect(() => {
    setLoading(true)

    registerService.getRegisters({
      page: page,
      sort: defaultSort,
    }).then((res) => {
      setRegisters({
        registers: res.registers,
        totalItems: res.count,
      })
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ])

  useEffect(() => {
    setLoading(true)

    registerService.getRegisters({
      page: page,
      sort: defaultSort,
    }).then((res) => {
      setRegisters({
        registers: res.registers,
        totalItems: res.count,
      })
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ page ])

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    setPage(page - 1)
  }
  
  return (
    <RegisterPage 
      registers={registers.registers}
      nextPage={nextPage}
      previousPage={previousPage}
      page={page}
      totalPages={totalPages}
      type={type}
      setType={setType}
      handleDateStartChange={handleDateStartChange}
      handleDateEndChange={handleDateEndChange}
      dateEnd={dateEnd}
      dateStart={dateStart}   
      handleSubmit={handleSubmit}
    />
  )
}

export default RegisterPageContainer
