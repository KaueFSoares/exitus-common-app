import axios, { AxiosInstance } from "axios"
import { URL } from "./url"

/**
 * Returns an AxiosInstance configured for the opened API.
 * @returns {AxiosInstance} The configured AxiosInstance.
 */
export const OPENED_API = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: URL.BASE,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })

  return instance
}