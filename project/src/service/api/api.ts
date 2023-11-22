import axios, { AxiosInstance } from "axios"
import { URL } from "./url"

/**
 * Creates a new Axios instance with the provided token.
 *
 * @param {string} token - The token to be used in the Authorization header.
 * @returns {AxiosInstance} A Axios instance with the provided token.
 * @throws {Error} If there's an error during process.
 */
export const ClosedAPI = (token: string): AxiosInstance => {
  return axios.create({
    baseURL: URL.BASE,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}
