import { useState } from "react"
import { CodePage } from "../pages"

const CodePageContainer = () => {
  const [ code, setCode ] = useState<string>("")

  const handleOnUpdate = () => {
    setCode("new code")
  }

  return (
    <CodePage 
      code={code}
      handleOnUpdate={handleOnUpdate}
    />
  )
}

export default CodePageContainer
