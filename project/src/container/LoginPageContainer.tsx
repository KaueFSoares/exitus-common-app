import { FormEvent, useState } from "react"
import { LoginPage } from "../pages"
import { Role } from "../types/Role"

const LoginPageContainer = () => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ role, setRole ] = useState<Role>("guarded")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <LoginPage 
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      role={role}
      setRole={setRole}
      handleSubmit={handleSubmit}
    />
  )
}

export default LoginPageContainer
