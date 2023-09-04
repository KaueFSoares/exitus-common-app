import axios, { AxiosInstance } from "axios"

/**
 * Creates a new Axios instance without access token.
 *
 * @returns {AxiosInstance} A Axios instance.
 * @throws {Error} If there's an error during process.
 */
export const OpenedAPI = (): AxiosInstance => {
  return axios.create({
    baseURL: "/mocks",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
}
