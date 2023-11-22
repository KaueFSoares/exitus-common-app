import { FormEvent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginPage } from "../pages"
import { Role } from "../types/Role"
import { onLogin } from "../service/auth.service"
import AuthContext from "../context/AuthContext"

const LoginPageContainer = () => {
  const navigate = useNavigate()

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ role, setRole ] = useState<Role>("guarded")

  const { setAuthenticated } = useContext(AuthContext)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    return await onLogin(email, password, role)
      .then((res) => {
        setAuthenticated(true)
        navigate("/")

        return res
      })
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
