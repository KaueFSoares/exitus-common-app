import { ClosedAPI } from "./api"

/**
 * The `onLoad` function makes an API request to retrieve a code fingerprint and returns it as a
 * string.
 * @param {string} token - The `token` parameter is a string that represents the authentication token
 * required to access the API.
 * @returns {Promise<string>} a Promise that resolves to a string.
 */
export const onLoad = async (token: string): Promise<string> => {
  const response = await ClosedAPI(token).get("/code.json")

  if (response.status !== 200) {
    throw new Error("Load failed")
  }

  const data = response.data.fingerprint as string

  return data
}

/**
 * The function `onUpdate` makes an asynchronous request to update code using a token and returns the
 * fingerprint data.
 * @param {string} token - The `token` parameter is a string that represents the authentication token
 * required to access the ClosedAPI. It is used to authenticate the user and authorize the update
 * request.
 * @returns {Promise<string>} a Promise that resolves to a string.
 */
export const onUpdate = async (token: string): Promise<string> => {
  const response = await ClosedAPI(token).get("/updateCode.json")

  if (response.status !== 200) {
    throw new Error("Update failed")
  }

  const data = response.data.fingerprint as string

  return data
}