import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import AuthContext from "./context/AuthContext"
import AppRoutes from "./routes/AppRoutes"
import { AuthData, onLogin, onPageLoad } from "./service/auth.service"
import { NavbarContext, NavbarType } from "./context/NavbarContext"

const App = () => {
  const { t } = useTranslation()

  const getFromURL = (key: string) => {
    switch (key) {
    case t("url.code"):
      return "code"
    case t("url.leave"):
      return "leave"
    case t("url.register"):
      return "register"
    default:
      return "home"
    }
  }


  const [ auth, setAuth ] = useState<AuthData>({ authenticated: true })
  
  const [ selected, setSelected ] = useState<NavbarType>(getFromURL(`/${window.location.pathname.split("/")[1]}`))

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
    <AuthContext.Provider value={{ auth, handleOnLogin }}>
      <NavbarContext.Provider value={{ selected, setSelected }}>
        <AppRoutes authenticated={auth.authenticated} />
        <ToastContainer />
      </NavbarContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
