import { useContext, useEffect, useState } from "react"
import { CodePage } from "../pages"
import useCode from "../service/pages/code.service"
import LoadingContext from "../context/LoadingContext"

const CodePageContainer = () => {
  const [ code, setCode ] = useState<string>("")

  const codeService = useCode()

  const { setLoading } = useContext(LoadingContext)

  useEffect(() => {
    setLoading(true)

    codeService.getCode().then((res) => {
      setCode(res)
      setLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnUpdate = () => {
    setLoading(true)

    codeService.updateCode().then((res) => {
      setCode(res)
      setLoading(false)
    })
  }

  return (
    <CodePage 
      code={code}
      handleOnUpdate={handleOnUpdate}
    />
  )
}

export default CodePageContainer
