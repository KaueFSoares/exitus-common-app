import { IRegister, IRegisterResponse } from "../../interfaces/IRegister"
import useApi from "../api/api"
import { URL } from "../api/url"

const useRegister = () => {
  const api = useApi()

  const getRegisters = async (page: number) => {
    const response = await api.get(`${URL.MY_REGISTERS}?sort=desc`, {
      params: {
        page: page,
        limit: 8,
      },
    })
    
    const data = response.data as IRegisterResponse

    return {
      count: data.count,
      registers: data.registers.map((register) => {
        return {
          id: register.id,
          // eslint-disable-next-line camelcase
          user_id: register.user_id,
          time: new Date(register.time),
          type: register.register_type,
        } as IRegister
      }),
    }
  }
  
  return {
    getRegisters,
  }
}

export default useRegister
