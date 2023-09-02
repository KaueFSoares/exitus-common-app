import { useTranslation } from 'react-i18next'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LeavePage, LoginPage, ForgotPassword, HomePage, CodePage, RegisterPage, NotFoundPage } from "../components/pages"
import PrivateRoutes from './PrivateRoutes'

interface Props {
    authenticated: boolean
}

const AppRoutes = ({authenticated}: Props) => {

    const { t } = useTranslation()

    const router = createBrowserRouter([
        {
            path: t('url.login'),
            element: <LoginPage />,
        },
        {
            path: t('url.rescuepassword'),
            element: <ForgotPassword />,
        },
        {
            path: '*',
            element: <NotFoundPage />,
        },
        {
            element: <PrivateRoutes isAuthenticated={authenticated} />,
            children: [
                {
                    path: t('url.home'),
                    element: (
                        <HomePage />
                    )
                },
                {
                    path: t('url.code'),
                    element: (
                        <CodePage />
                    )
                },
                {
                    path: t('url.register'),
                    element: (

                        <RegisterPage />
                    )
                },
                {
                    path: t('url.leave'),
                    element: (
                        <LeavePage />
                    )
                },
            ]
        }
    ])


    return (
        <RouterProvider router={router} />
    )
}

export default AppRoutes