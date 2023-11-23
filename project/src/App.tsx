import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify"
import { Theme } from "@radix-ui/themes"
import AuthContext from "./context/AuthContext"
import AppRoutes from "./routes/AppRoutes"
import { onLoad, onLogout } from "./service/auth.service"
import { NavbarContext, NavbarType } from "./context/NavbarContext"
import LoadingContext from "./context/LoadingContext"

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

  const [ loading, setLoading ] = useState(false)

  const [ authenticated, setAuthenticated ] = useState(true)
  
  const [ selected, setSelected ] = useState<NavbarType>(getFromURL(`/${window.location.pathname.split("/")[1]}`))
  useEffect(() => {
    const data = onLoad()

    if (data) {
      const isRefreshTokenExpired = new Date(data.refresh_token.expires_at).getTime() < new Date().getTime()

      if (isRefreshTokenExpired) {
        onLogout()
      }

      setAuthenticated(!isRefreshTokenExpired)
    } else {
      setAuthenticated(false)
    }
  }, [])

  return (
    <Theme>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
          <NavbarContext.Provider value={{ selected, setSelected }}>
            <AppRoutes authenticated={authenticated} />
            <ToastContainer />
          </NavbarContext.Provider>
        </AuthContext.Provider>
      </LoadingContext.Provider>
    </Theme>
  )
}

export default App
