import { OPENED_API } from "./api/opened_api";
import { URL } from "./api/url";

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

/**
 * Saves the authentication data to the local storage.
 * @param {AuthData} authData The authentication data to be saved.
 * @returns {void} The function `saveToLocalStorage` is returning a value of type `void`.
 */
const saveToLocalStorage = (authData: AuthData) => {
  localStorage.setItem("authData", JSON.stringify(authData))
}

/**
 * Removes the "authData" item from the local storage.
 * @returns {void} The function `removeFromLocalStorage` is returning a value of type `void`.
 */
const removeFromLocalStorage = () => {
  localStorage.removeItem("authData")
}

/**
 * Retrieves the authentication data from the local storage.
 * @returns {AuthData | null} The authentication data if it exists, otherwise null.
 */
const getFromLocalStorage = (): AuthData | null => {
  const authData = localStorage.getItem("authData")
  if (authData) {
    return JSON.parse(authData) as AuthData
  } else {
    return null
  }
}

/**
 * Refreshes the authentication token using the provided refresh token.
 * @param {string} refreshToken The refresh token used to obtain a new authentication token.
 * @returns {Promise<AuthData>} A promise that resolves to an object containing the refreshed authentication data.
 */
const refresh = async (refreshToken: string): Promise<AuthData> => {
  const response = await OPENED_API().post(URL.REFRESH_ACCESS_TOKEN, { 
    // eslint-disable-next-line camelcase
    refresh_token: refreshToken, 
  })
    .catch((error) => {
      throw error
    })

  return response.data as AuthData
}

/**
 * Performs a refresh token operation.
 * @param {string} refreshToken - The refresh token.
 * @returns {Promise<AuthData>} A promise that resolves to the refreshed data.
 */
export const onRefresh = async (refreshToken: string) => {
  const data = await refresh(refreshToken)
  saveToLocalStorage(data)

  return data
}

/**
 * Retrieves data from local storage.
 * 
 * @returns {AuthData | null} The data retrieved from local storage.
 */
export const onLoad = () => {
  const data = getFromLocalStorage()

  return data
}

/**
 * Logs the user out by removing data from local storage.
 * @returns {void} The function `onLogout` is returning a value of type `void`.
 */
export const onLogout = () => {
  removeFromLocalStorage()
}