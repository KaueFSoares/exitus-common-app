import { useEffect, useState } from "react"
import { RegisterPage } from "../pages"
import { IRegister } from "../interfaces/IRegister"

const RegisterPageContainer = () => {
  const [ registers, setRegisters ] = useState<IRegister[]>([])

  useEffect(() => {
    setRegisters([])
  }, [ ])
  
  return (
    <RegisterPage 
      registers={registers}
    />
  )
}

export default RegisterPageContainer
