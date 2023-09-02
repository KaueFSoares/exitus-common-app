import { useEffect, useState } from "react"
import AuthContext from "./context/AuthContext"
import AppRoutes from "./routes/AppRoutes"
import { AuthData, onLogin, onPageLoad } from "./service/auth.service"


const App = () => {

  const [auth, setAuth] = useState<AuthData>({authenticated: true})

  useEffect(() => {
    onPageLoad()
      .then((data) => {
        setAuth(data)
      })
  }, [])

  const handleOnLogin = (email: string, password: string) => {
    onLogin(email, password)
      .then((data) => {
        setAuth(data)
      })
  }

  return (
    <AuthContext.Provider value={{auth, handleOnLogin}}>
      <AppRoutes authenticated={auth.authenticated} />
    </AuthContext.Provider>
  )

}

export default App