import { FormEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginPage } from "../pages"
import { Role } from "../types/Role"
import { onLogin } from "../service/auth.service"
import AuthContext from "../context/AuthContext"
import LoadingContext from "../context/LoadingContext"

const LoginPageContainer = () => {
  const navigate = useNavigate()

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ role, setRole ] = useState<Role>("guarded")

  const { setLoading } = useContext(LoadingContext)
  const { authenticated, setAuthenticated } = useContext(AuthContext)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    await onLogin(email, password, role)
      .then(() => {
        setLoading(false)
        setAuthenticated(true)
        navigate("/")
      })
  }

  useEffect(() => {
    if (authenticated) {
      navigate("/")
    }
  }, [ authenticated, navigate ])

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
