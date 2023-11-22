import { useTranslation } from "react-i18next"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { LeavePageContainer, LoginPageContainer, ForgotPasswordContainer, HomePageContainer, CodePageContainer, RegisterPageContainer, NotFoundPageContainer, FirstAcessPageContainer } from "../container"
import PrivateRoutes from "./PrivateRoutes"

interface Props {
    authenticated: boolean
}

const AppRoutes = ({ authenticated }: Props) => {
  const { t } = useTranslation()

  const router = createBrowserRouter([
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
  ])


  return (
    <RouterProvider router={router} />
  )
}

export default AppRoutes
