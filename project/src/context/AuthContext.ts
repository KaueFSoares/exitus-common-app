import { createContext } from "react"
import { NavigateFunction } from "react-router"
import { AuthData } from "../service/auth.service"

const AuthContext = createContext<{
    auth: AuthData,
    handleOnLogin: (email: string, password: string, navigator: NavigateFunction) => void,
      }>({
        auth: {} as AuthData,
        handleOnLogin: () => { },
      })

export default AuthContext
