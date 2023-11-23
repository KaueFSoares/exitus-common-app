import { useTranslation } from "react-i18next"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import { useContext } from "react"
import { LeavePageContainer, LoginPageContainer, ForgotPasswordContainer, HomePageContainer, CodePageContainer, RegisterPageContainer, NotFoundPageContainer, FirstAcessPageContainer } from "../container"
import LoadingContext from "../context/LoadingContext"
import Loading from "../components/util/Loading"
import PrivateRoutes from "./PrivateRoutes"

interface Props {
    authenticated: boolean
}

const AppRoutes = ({ authenticated }: Props) => {
  const { t } = useTranslation()
  const { loading } = useContext(LoadingContext)

  const router = createBrowserRouter([
    { element: (
      <main className="relative">
        <Outlet />
        { loading && <Loading />}
      </main>
    ),
    children: [
      {
        path: t("url.login"),
        element: <LoginPageContainer />,
      },
      {
        path: t("url.rescuepassword"),
        element: <ForgotPasswordContainer />,
      },
      {
        path: t("url.firstaccess"),
        element: <FirstAcessPageContainer />,
      },
      {
        path: "*",
        element: <NotFoundPageContainer />,
      },
      {
        element: <PrivateRoutes isAuthenticated={authenticated} />,
        children: [
          {
            path: t("url.home"),
            element: (
              <HomePageContainer />
            ),
          },
          {
            path: t("url.code"),
            element: (
              <CodePageContainer />
            ),
          },
          {
            path: t("url.register"),
            element: (
  
              <RegisterPageContainer />
            ),
          },
          {
            path: t("url.leave"),
            element: (
              <LeavePageContainer />
            ),
          },
        ],
      },
    ] },
  ])


  return (
    <RouterProvider router={router} />
  )
}

export default AppRoutes
