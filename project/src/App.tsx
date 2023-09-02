import { useEffect, useState } from "react"
import AuthContext from "./context/AuthContext"
import AppRoutes from "./routes/AppRoutes"
import { AuthData, onLogin, onPageLoad } from "./service/auth.service"
import { NavbarContext, NavbarType } from "./context/NavbarContext"


const App = () => {

  const [auth, setAuth] = useState<AuthData>({ authenticated: true })

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

  const [selected, setSelected] = useState<NavbarType>("home")

  return (
    <AuthContext.Provider value={{ auth, handleOnLogin }}>
      <NavbarContext.Provider value={{ selected, setSelected }}>
        <AppRoutes authenticated={auth.authenticated} />
      </NavbarContext.Provider>
    </AuthContext.Provider>
  )

}

export default App