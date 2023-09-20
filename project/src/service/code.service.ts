import { ClosedAPI } from "./api"
import { URL } from "./url"

/**
 * Makes an API request to retrieve a code fingerprint and returns it as a string.
 * @param {string} token - A string that represents the authentication token required to access the API.
 * @returns {Promise<string>} a Promise that resolves to a string  to be showed as a QR Code.
 */
export const onLoad = async (token: string): Promise<string> => {
  const data = getFromLocalStorage()
  if (data) {
    return data
  }
    
  const response = await getFromApi(token)

  saveInLocalStorage(response)

  return response
}

/**
 * Makes an API request to update the code fingerprint and returns it as a string.
 * @param {string} token - A string that represents the authentication token required to access the API.
 * @returns {Promise<string>} a Promise that resolves to a string  to be showed as a QR Code.
 */
export const onUpdate = async (token: string): Promise<string> => {
  const response = await ClosedAPI(token).get(URL.UPDATE_CODE)

  if (response.status !== 200) {
    throw new Error("Update failed")
  }

  const data = response.data.fingerprint as string

  saveInLocalStorage(data)

  return data
}

/**
 * Retrieves the value of the "token" key from the browser's local storage.
 * @returns {string | null} The function `getFromLocalStorage` is returning a value of type `string` or `null`.
 */
const getFromLocalStorage = (): string | null => {
  return localStorage.getItem("fingerprint")
}

/**
 * Stores the value of the "fingerPrint" key in the browser's local storage.
 * @param {string} fingerPrint - the value to be stored in the browser's local storage.
 * @returns {void} The function `setInLocalStorage` is returning a value of type `void`.
 */
const saveInLocalStorage = (fingerPrint: string): void => {
  localStorage.setItem("fingerprint", fingerPrint)
}

/**
 * The function `getFromApi` makes an API call to retrieve a fingerprint data using a token and returns
 * the data as a promise.
 * @param {string} token - The `token` parameter is a string that represents the authentication token
 * required to access the API.
 * @returns {Promise<string>} a Promise that resolves to a string.
 */
const getFromApi = async (token: string): Promise<string> => {
  const response = await ClosedAPI(token).get(URL.CODE).then((response) => {
    console.log(response)
    return response
  })

  if (response.status !== 200) {
    throw new Error("Load failed")
  }

  const data = response.data.fingerprint as string

  return data
}