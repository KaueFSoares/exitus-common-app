import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { jwtDecode } from "jwt-decode"
import AuthContext from "./context/AuthContext"
import AppRoutes from "./routes/AppRoutes"
import { onLoad } from "./service/auth.service"
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


  const [ authenticated, setAuthenticated ] = useState(true)
  
  const [ selected, setSelected ] = useState<NavbarType>(getFromURL(`/${window.location.pathname.split("/")[1]}`))

  useEffect(() => {
    const data = onLoad()

    if (data) {
      const decodedJWT = jwtDecode(data.access_token)
      const isRefreshTokenExpired = new Date(decodedJWT.exp!).getTime() < new Date().getTime()

      setAuthenticated(!isRefreshTokenExpired)
    } else {
      setAuthenticated(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      <NavbarContext.Provider value={{ selected, setSelected }}>
        <AppRoutes authenticated={authenticated} />
        <ToastContainer />
      </NavbarContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
