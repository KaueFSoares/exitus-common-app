import { useContext } from "react"
import PageWrapper from "../components/wrapper/PageWrapper"
import AuthContext from "../context/AuthContext"
import { RoleType } from "../enum/RoleType"
import { NotFoundPage } from "."

const LeavePage = () => {
  const { auth } = useContext(AuthContext)

  return (auth.role === RoleType.GUARDIAN) ? (
    <PageWrapper>
      <div>LeavePage</div>
    </PageWrapper>
  ) : <NotFoundPage />
}

export default LeavePage
