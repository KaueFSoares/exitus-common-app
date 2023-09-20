import { RoleType } from "../enum/RoleType"
import { OpenedAPI } from "./api"
import { URL } from "./url"

export interface AuthData {
    authenticated: boolean
    accessToken?: string
    tokenType?: string
    accessTokenExpiresIn?: number
    refreshToken?: string
    refreshTokenExpiresIn?: number
    roles?: RoleType[]
}

/**
 * Loads authentication data from local storage and checks if the user is authenticated.
 *
 * @returns {Promise<AuthData>} A Promise that resolves to the authentication data or an empty object if not authenticated.
 * @throws {Error} If there's an error during the refresh process.
 */
export const onPageLoad = async (): Promise<AuthData> => {
  const accessToken = localStorage.getItem("accessToken")
  const tokenType = localStorage.getItem("tokenType")
  const accessTokenExpiresIn = parseInt(localStorage.getItem("accessTokenExpiresIn") || "0")
  const refreshToken = localStorage.getItem("refreshToken")
  const refreshTokenExpiresIn = parseInt(localStorage.getItem("refreshTokenExpiresIn") || "0")
  const roles: RoleType[] = JSON.parse(localStorage.getItem("roles") || "[]").map((role: string) => getRoleType(role))

  const isAccessTokenValid = accessTokenExpiresIn > Date.now()
  const isRefreshTokenValid = refreshTokenExpiresIn > Date.now()

  if (accessToken && isAccessTokenValid) {
    console.log("Access token is valid")
    return {
      authenticated: true,
      accessToken: accessToken,
      tokenType: tokenType,
      accessTokenExpiresIn: accessTokenExpiresIn,
      refreshToken: refreshToken,
      refreshTokenExpiresIn: refreshTokenExpiresIn,
      roles: roles,
    } as AuthData
  }

  if (accessToken && !isAccessTokenValid && refreshToken && isRefreshTokenValid) {
    const authUser = await refresh(refreshToken)
      .then((data) => {
        saveToLocalStorage(data)
        return data
      })

    authUser.authenticated = true

    return authUser
  }

  console.log("No access token found")

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
  const response = await OpenedAPI().post(URL.LOGIN, {
    email: email,
    password: password,
  })


  if (response.status !== 200) {
    throw new Error("Login failed")
  }

  const data = {
    accessToken: response.data.access_token,
    tokenType: response.data.token_type,
    accessTokenExpiresIn: parseInt(response.data.access_token_expires_at),
    refreshToken: response.data.refresh_token,
    refreshTokenExpiresIn: parseInt(response.data.refresh_token_expires_at),
    roles: response.data.roles,
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
  const response = await OpenedAPI().post(URL.REFRESH_ACCESS_TOKEN, {
    refresh_token: refreshToken,
  })


  if (response.status !== 200) {
    throw new Error("Login failed")
  }

  const data = {
    accessToken: response.data.access_token,
    tokenType: response.data.token_type,
    accessTokenExpiresIn: parseInt(response.data.access_token_expires_at),
    refreshToken: response.data.refresh_token,
    refreshTokenExpiresIn: parseInt(response.data.refresh_token_expires_at),
    roles: response.data.roles,
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
  localStorage.setItem("accessToken", data.accessToken!)
  localStorage.setItem("tokenType", data.tokenType!)
  localStorage.setItem("accessTokenExpiresIn", (data.accessTokenExpiresIn! + Date.now()).toString())
  localStorage.setItem("refreshToken", data.refreshToken!)
  localStorage.setItem("refreshTokenExpiresIn", (data.refreshTokenExpiresIn! + Date.now()).toString())
  localStorage.setItem("roles", JSON.stringify(data.roles))
}

/**
 * The function `getRoleType` takes a role string as input and returns the corresponding RoleType enum
 * value.
 * @param {string} role - The role parameter is a string that represents the role type.
 * @returns {RoleType} The function `getRoleType` returns a value of type `RoleType`.
 */
const getRoleType = (role: string): RoleType => {
  switch (role) {
    case "ADMIN":
      return RoleType.ADMIN
    case "GUARDED":
      return RoleType.GUARDED
    case "GUARDIAN":
      return RoleType.GUARDIAN
      case "EMPLOYEE":
      return RoleType.EMPLOYEE
    default:
      return RoleType.ADMIN
  }
}