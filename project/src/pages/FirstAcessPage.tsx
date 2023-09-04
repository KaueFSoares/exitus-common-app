import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineMail } from "react-icons/ai"
import { Link } from "react-router-dom"

const ForgotPassword = () => {
  const { t } = useTranslation()

  const [ email, setEmail ] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
          alt={t("firstacesspage.altlogo")}
          className="w-full mb-6"
        />

        <h1
          className="font-extrabold text-5xl uppercase mb-6
            xsm:mb-0 xsm:text-5xl
            md:text-6xl
          "
        >
          {t("firstacesspage.title")}
        </h1>

        <p
          className="text-lg mb-4 w-3/4 text-center
        xsm:text-xl xsm:mb-0
      "
        >
          {t("firstacesspage.typeEmail")}
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
              placeholder={t("firstacesspage.emailPlaceholder")}
              autoComplete='on'
            />
          </div>

          <button
            type="submit"
            className="w-full bg-dark-green text-3xl font-extrabold py-4 rounded-full mt-8 border-2 border-white hover:scale-105 transition"
          >
            {t("firstacesspage.send")}
          </button>


        </form>

        <div className="w-full flex flex-col items-center justify-center">
          <Link to={t("url.login")} className="w-full text-center text-xl font-semibold mb-8 hover:underline">
            {t("firstacesspage.back")}
          </Link>
        </div>
      </div>

    </main>
  )
}

export default ForgotPassword
