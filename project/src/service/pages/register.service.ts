import { IRegister, IRegisterResponse } from "../../interfaces/IRegister"
import { RegisterType } from "../../types/Register"
import useApi from "../api/api"
import { URL } from "../api/url"

interface Props {
  limit: number
}

interface getRegistersProps {
  page: number
  sort?: string
  type?: RegisterType
  dateStart?: string
  dateEnd?: string
}

const useRegister = ({
  limit,
}: Props) => {
  const api = useApi()

  const getRegisters = async ({
    page,
    sort,
    type,
    dateStart,
    dateEnd,
  }: getRegistersProps) => {
    const sortParam = sort ? `sort=${sort}` : "desc"
    const typeParam = type ? `&type=${type.toUpperCase()}` : ""
    const dateStartParam = dateStart ? `&start=${new Date(dateStart).toISOString()}` : ""
    const dateEndParam = dateEnd ? `&end=${new Date(dateEnd).toISOString()}` : ""

    const customParams = `?${sortParam}${typeParam}${dateStartParam}${dateEndParam}`
    
    const response = await api.get(`${URL.MY_REGISTERS}${customParams}`, {
      params: {
        page: page,
        limit: limit,
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
