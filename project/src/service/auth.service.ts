import { Role } from "../types/Role"
import { OPENED_API } from "./api/opened_api"
import { URL } from "./api/url"

export interface AuthData {
  access_token: string;
  refresh_token: Refreshtoken;
}

interface Refreshtoken {
  id: string;
  created_at: string;
  expires_at: string;
  choosed_role: string;
  user_id: string;
}

const saveToLocalStorage = (authData: AuthData) => {
  localStorage.setItem("authData", JSON.stringify(authData))
}

const removeFromLocalStorage = () => {
  localStorage.removeItem("authData")
}

const getFromLocalStorage = (): AuthData | null => {
  const authData = localStorage.getItem("authData")
  if (authData) {
    return JSON.parse(authData) as AuthData
  } else {
    return null
  }
}

const refresh = async (refreshToken: string): Promise<string> => {
  const response = await OPENED_API().post(URL.REFRESH_ACCESS_TOKEN, { 
    // eslint-disable-next-line camelcase
    refresh_token: refreshToken, 
  })
    .catch((error) => {
      throw error
    })

  return response.data.access_token as string
}

const login = async (email: string, password: string, role?: string): Promise<AuthData> => {
  const response = await OPENED_API().post(URL.LOGIN, {
    email: email, 
    password: password, 
    role: role,
  })
    .catch((error) => {
      throw error
    })

  return response.data as AuthData
}

export const onLogin = async (email: string, password: string, role?: Role) => {
  const data = await login(email, password, role?.toUpperCase())
  
  saveToLocalStorage(data)

  return data
}

export const onRefresh = async (refreshToken: string) => {
  const data = await refresh(refreshToken)
  const authData = getFromLocalStorage()

  // eslint-disable-next-line camelcase
  authData!.access_token = data

  saveToLocalStorage(authData!)

  return data
}

export const onLoad = () => {
  const data = getFromLocalStorage()

  return data
}

export const onLogout = () => {
  removeFromLocalStorage()
}
