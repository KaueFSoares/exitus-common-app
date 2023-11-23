import { useContext, useEffect, useState } from "react"
import { RegisterPage } from "../pages"
import { IRegister } from "../interfaces/IRegister"
import useRegister from "../service/pages/register.service"
import LoadingContext from "../context/LoadingContext"

const RegisterPageContainer = () => {
  const [ page, setPage ] = useState<number>(0)
  const [ registers, setRegisters ] = useState<{
    registers: IRegister[]
    totalItems: number
  }>({
    registers: [],
    totalItems: 0,
  })

  const registerService = useRegister()

  const { setLoading } = useContext(LoadingContext)

  const totalPages = Math.ceil(registers.totalItems / 10)

  useEffect(() => {
    setLoading(true)

    registerService.getRegisters(0).then((res) => {
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

    registerService.getRegisters(page).then((res) => {
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
    />
  )
}

export default RegisterPageContainer
