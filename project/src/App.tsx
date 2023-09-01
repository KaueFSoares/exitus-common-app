import { AuthProvider, RequireAuth } from 'react-auth-kit'
import { useTranslation } from 'react-i18next'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { LeavePage, LoginPage, ForgotPassword, HomePage, CodePage, RegisterPage, NotFoundPage } from "./components/pages"

const App = () => {

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
      path: t('url.home'),
      element: (
        <RequireAuth loginPath={t('url.login')}>
          <HomePage />
        </RequireAuth>
      )
    },
    {
      path: t('url.code'),
      element: (
        <RequireAuth loginPath={t('url.login')}>
          <CodePage />
        </RequireAuth>
      )
    },
    {
      path: t('url.register'),
      element: (
        <RequireAuth loginPath={t('url.login')}>
          <RegisterPage />
        </RequireAuth>
      )
    },
    {
      path: t('url.leave'),
      element: (
        <RequireAuth loginPath={t('url.login')}>
          <LeavePage />
        </RequireAuth>
      )
    },
    {
      path: '*',
      element: <NotFoundPage />,
    }
  ])

  return (
    <AuthProvider
      authType={'cookie'}
      authName={'__auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App