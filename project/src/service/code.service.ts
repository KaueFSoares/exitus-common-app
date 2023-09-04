import { ClosedAPI } from "./api"
import { URL } from "./url"

/**
 * Makes an API request to retrieve a code fingerprint and returns it as a string.
 * @param {string} token - A string that represents the authentication token required to access the API.
 * @returns {Promise<string>} a Promise that resolves to a string  to be showed as a QR Code.
 */
export const onLoad = async (token: string): Promise<string> => {
  const response = await ClosedAPI(token).get(URL.CODE)

  if (response.status !== 200) {
    throw new Error("Load failed")
  }

  const data = response.data.fingerprint as string

  return data
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

  return data
}