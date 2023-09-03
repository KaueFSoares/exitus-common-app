import React, { useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const LoginPage = () => {
  const { t } = useTranslation()

  const { auth } = useContext(AuthContext)
  const { handleOnLogin } = useContext(AuthContext)

  useEffect(() => {
    if (auth.authenticated) {
      navigate(t("url.home"))
    }
  })

  const navigate = useNavigate()

  const [ isShown, setIsShown ] = useState(false)

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    handleOnLogin(email, password)

    navigate(t("url.home"))
  }

  return (
    <main className="w-full h-screen bg-light-green flex flex-col items-center">

      <div
        className="w-full h-screen bg-light-green flex flex-col items-center justify-between p-5 text-white
          md:w-3/5
          lg:w-[45%]
          xl:w-[35%]
          2xl:w-[30%]
        "
      >
        <img
          src="/images/IfsulLogo.png"
          alt={t("loginpage.altlogo")}
          className="w-full mb-6"
        />

        <h1
          className="font-extrabold text-5xl uppercase mb-6
          xsm:mb-0 xsm:text-5xl
          md:text-6xl
        "
        >
          {t("loginpage.title")}
        </h1>

        <p
          className="text-lg mb-4 w-3/4 text-center
          xsm:text-xl xsm:mb-0
        "
        >
          {t("loginpage.typeEmailAndPassword")}
        </p>

        <form
          action=""
          className="w-[95%] flex flex-col" onSubmit={(e) => handleSubmit(e)}>

          <div className="w-full flex bg-white/[.2] py-2 px-4 rounded-3xl mb-4
          xsm:py-4 xsm:px-6
        ">

            <AiOutlineMail className="text-3xl mr-4" />

            <input
              className="flex-grow bg-transparent placeholder:text-white/[.8] outline-none text-sm
              xsm:text-lg
            "
              type="email"
              name="email"
              id="email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("loginpage.emailPlaceholder")}
              autoComplete='on'
            />
          </div>

          <div className="w-full flex bg-white/[.2] py-2 px-4 rounded-3xl mb-8
          xsm:py-4 xsm:px-6
        ">
            <AiOutlineLock className="text-3xl mr-4" />

            <input
              className="flex-grow bg-transparent placeholder:text-white/[.8] outline-none text-sm pr-2
              xsm:text-lg
            "
              type={isShown ? "text" : "password"}
              name="password"
              id="password"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("loginpage.passwordPlaceholder")}
              autoComplete='on'
            />

            <button
              type='button'
              onClick={() => setIsShown(!isShown)}
            >
              {
                isShown ?
                  <AiOutlineEyeInvisible className="text-3xl outline-none" /> :
                  <AiOutlineEye className="text-3xl outline-none" />
              }
            </button>
          </div>

          <Link to={t("url.rescuepassword")} className="w-full text-center text-lg font-semibold hover:underline
          xsm:text-xl
        ">
            {t("loginpage.forgotPassword")}
          </Link>

          <button
            type="submit"
            className="w-full bg-dark-green text-3xl font-extrabold py-4 rounded-full mt-8 border-2 border-white hover:scale-105 transition"
          >
            {t("loginpage.login")}
          </button>


        </form>

        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-lg mb-1">
            {t("loginpage.firstTime")}
          </p>
          <Link to={t("url.rescuepassword")} className="w-full text-center text-xl font-semibold mb-8 hover:underline">
            {t("loginpage.clickHere")}
          </Link>
        </div>
      </div>

    </main>
  )
}

export default LoginPage
