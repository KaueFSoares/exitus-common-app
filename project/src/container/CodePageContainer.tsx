import { useEffect, useState } from "react"
import { CodePage } from "../pages"
import useCode from "../service/pages/code.service"

const CodePageContainer = () => {
  const [ code, setCode ] = useState<string>("")

  const codeService = useCode()

  useEffect(() => {
    codeService.getCode().then((res) => {
      setCode(res)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnUpdate = () => {
    codeService.updateCode().then((res) => {
      setCode(res)
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
