import { Dispatch, SetStateAction, createContext } from "react"

const LoadingContext = createContext<{
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
      }>({
        loading: false,
        setLoading: () => { },
      })

export default LoadingContext
