import { IRegister } from "../interfaces/IRegister";
import { ClosedAPI } from "./api";
import { URL } from "./url";

interface IRegisterResponse {
  id: string,
  user_id: string,
  date: string,
  time: string,
  type: string,
}

/**
 * The function `onLoad` is an asynchronous function that takes a token as input and makes an API call
 * to retrieve data, throwing an error if the response status is not 200.
 * @param {string} token - A string representing the authentication token required to access the API.
 * @param {string} user_id - A string representing the user id.
 * @returns {Promise<IRegister>} a Promise that resolves to an object of type IRegister.
 */
export const onLoad = async (token: string, user_id?: string): Promise<IRegister[]> => {
  const response = await ClosedAPI(token).get(`${URL.REGISTER}${user_id ? `/${user_id}` : ""}`)

  if (response.status !== 200) {
    throw new Error("Load failed")
  }

  const data = response.data.map((register: IRegisterResponse) => {
    return {
      id: register.id,
      user_id: register.user_id,
      date_time: new Date(`${register.date} ${register.time}`),
      type: register.type,
    } as IRegister
  })

  return data
  
}