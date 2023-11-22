import { FormEvent, useState } from "react"
import { LoginPage } from "../pages"

const LoginPageContainer = () => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <LoginPage 
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  )
}

export default LoginPageContainer