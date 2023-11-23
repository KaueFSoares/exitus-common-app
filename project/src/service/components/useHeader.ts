import useApi from "../api/api"
import { URL } from "../api/url"

const useHeader = () => {
  const api = useApi()

  const getName = async () => {
    const response = await api.get(URL.USER)
    
    const data = await response.data.name as string

    return data
  }

  return {
    getName,
  }
}

export default useHeader
