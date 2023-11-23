import axios, { AxiosInstance } from "axios"
import { useContext } from "react"
import { jwtDecode } from "jwt-decode"
import AuthContext from "../../context/AuthContext"
import { AuthData, onLogout, onRefresh } from "../auth.service"
import { URL } from "./url"

const useApi = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: URL.BASE,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })

  const { setAuthenticated } = useContext(AuthContext)

  const authData = JSON.parse(localStorage.getItem("authData") as string) as AuthData

  if (!authData) {
    onLogout()
    
    return instance
  }

  const decodedJWT = jwtDecode(authData.access_token)

  instance.interceptors.request.use(async (req) => {
    const isExpired = new Date(decodedJWT.exp! * 1000) < new Date()
    if (!isExpired){
      req.headers.Authorization = `BEARER ${authData.access_token}`
      
      return req
    } 
    
    await onRefresh(authData.refresh_token.id)
      .then((res) => {
        req.headers.Authorization = `BEARER ${res}`
      })
      .catch((err) => {
      // eslint-disable-next-line no-console
        console.log(err)
        onLogout()
        setAuthenticated(false)
      })

    return req
  })
  
  return instance
}

export default useApi
