import { RoleType } from "../enum/RoleType"
import { OpenedAPI } from "./api"

export interface AuthData {
    authenticated: boolean
    accessToken?: string
    tokenType?: string
    expiresIn?: number
    refreshToken?: string
    role?: RoleType
}

/**
 * Loads authentication data from local storage and checks if the user is authenticated.
 *
 * @returns {Promise<AuthData>} A Promise that resolves to the authentication data or an empty object if not authenticated.
 * @throws {Error} If there's an error during the refresh process.
 */
export const onPageLoad = async (): Promise<AuthData> => {
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

/**
 * Logs in a user with the provided email and password.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<AuthData>} A Promise that resolves to the authentication data.
 * @throws {Error} If the login fails or there's an error during the login process.
 */
export const onLogin = async (email: string, password: string): Promise<AuthData> => {
  const response = await OpenedAPI().post("/login.json", {
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

/**
 * Refreshes the authentication token using a refresh token.
 *
 * @param {string} refreshToken - The refresh token to use for refreshing the authentication.
 * @returns {Promise<AuthData>} A Promise that resolves to the updated authentication data.
 * @throws {Error} If there's an error during the refresh process.
 */
const refresh = async (refreshToken: string): Promise<AuthData> => {
  const response = await OpenedAPI().post("/refresh.json", {
    refreshToken: refreshToken,
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


/**
 * The function saves authentication data to the local storage.
 * @param {AuthData} data - The `data` parameter is an object of type `AuthData`.
 * @returns {void} The function does not return anything.
 */
const saveToLocalStorage = (data: AuthData): void => {
  localStorage.setItem("access_token", data.accessToken!)
  localStorage.setItem("token_type", data.tokenType!)
  localStorage.setItem("expires_in", (data.expiresIn! + Date.now()).toString())
  localStorage.setItem("refresh_token", data.refreshToken!)
  localStorage.setItem("role", data.role!)
}
