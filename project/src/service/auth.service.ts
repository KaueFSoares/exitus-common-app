import { RoleType } from "../enum/RoleType"
import { API } from "./api"

export interface AuthData {
    authenticated: boolean
    accessToken?: string
    tokenType?: string
    expiresIn?: number
    refreshToken?: string
    role?: RoleType
}

export const onPageLoad = async () => {
  const accessToken = localStorage.getItem("access_token")
  const tokenType = localStorage.getItem("token_type")
  const expiresIn = parseInt(localStorage.getItem("expires_in") || "0")
  const refreshToken = localStorage.getItem("refresh_token")
  const role = localStorage.getItem("role") as RoleType

  const isTokenValid = expiresIn > Date.now()

  if (accessToken && isTokenValid) {
    return {
      authenticated: true,
      accessToken: accessToken,
      tokenType: tokenType,
      expiresIn: expiresIn,
      refreshToken: refreshToken,
      role: role,
    } as AuthData
  }

  if (accessToken && !isTokenValid) {
    const authUser = await refresh(refreshToken!)
      .then((data) => {
        saveToLocalStorage(data)
        return data
      })

    authUser.authenticated = true

    return authUser
  }

  return {
    authenticated: false,
  } as AuthData
}

export const onLogin = async (email: string, password: string) => {
  const response = await API.post("/login.json", {
    email: email,
    password: password,
  })

  if (response.status !== 200) {
    throw new Error("Login failed")
  }

  const data = {
    accessToken: response.data.access_token,
    tokenType: response.data.token_type,
    expiresIn: parseInt(response.data.expires_in),
    refreshToken: response.data.refresh_token,
    role: response.data.role,
  } as AuthData

  saveToLocalStorage(data)

  data.authenticated = true

  return data
}

const refresh = async (refreshToken: string) => {
  const response = await API.post("/refresh.json", {
    refreshToken: refreshToken,
  })

  const data = {
    accessToken: response.data.access_token,
    tokenType: response.data.token_type,
    expiresIn: parseInt(response.data.expires_in),
    refreshToken: response.data.refresh_token,
    role: response.data.role,
  } as AuthData

  return data
}

/*
 * const clearLocalStorage = () => {
 *     localStorage.removeItem("access_token")
 *     localStorage.removeItem("token_type")
 *     localStorage.removeItem("expires_in")
 *     localStorage.removeItem("refresh_token")
 *     localStorage.removeItem("role")
 * }
 */

const saveToLocalStorage = (data: AuthData) => {
  localStorage.setItem("access_token", data.accessToken!)
  localStorage.setItem("token_type", data.tokenType!)
  localStorage.setItem("expires_in", (data.expiresIn! + Date.now()).toString())
  localStorage.setItem("refresh_token", data.refreshToken!)
  localStorage.setItem("role", data.role!)
  localStorage.setItem("now", Date.now().toString())
}
