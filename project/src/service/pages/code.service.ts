import useApi from "../api/api"
import { URL } from "../api/url"

const useCode = () => {
  const api = useApi()

  const getCode = async () => {
    const response = await api.get(URL.MY_CODE)
    
    const data = await response.data.fingerprint as string

    return data
  }

  const updateCode = async () => {
    const response = await api.patch(URL.REFRESH_MY_CODE)
  
    const data = await response.data.fingerprint as string

    return data
  }
  
  return {
    getCode,
    updateCode,
  }
}

export default useCode
