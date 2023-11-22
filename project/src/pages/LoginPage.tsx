import { Select } from "@radix-ui/themes"
import React, { Dispatch, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next"
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from "react-router-dom"
import { Role } from "../types/Role"

interface Props {
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  password: string
  setPassword: Dispatch<SetStateAction<string>>
  role: Role
  setRole: Dispatch<SetStateAction<Role>>
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const LoginPage = ({
  email,
  setEmail,
  password,
  setPassword,
  setRole,
  handleSubmit,
}: Props) => {
  const { t } = useTranslation()

  const [ isShown, setIsShown ] = useState(false)

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

          <div className="w-full flex bg-white/[.2] py-2 px-4 rounded-3xl mb-8 justify-between
          xsm:py-4 xsm:px-6
        ">
            <div>
              <AiOutlineLock className="text-3xl mr-4" />
            </div>

            <input
              className="flex-grow bg-transparent placeholder:text-white/[.8] outline-none text-sm pr-2 w-[80%]
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

          <div className="flex flex-col justify-start items-center gap-4 px-4 mb-4 sm:flex-row sm:justify-center sm:gap-8">
            <p className="font-semibold text-xl">
            Fazer login como: 
            </p>

            <Select.Root defaultValue="guarded" size={"3"} onValueChange={ (value) => setRole(value as Role) }>
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Item value="guarded" className="text-xl">Estudante</Select.Item>
                  <Select.Item value="employee">Funcionário</Select.Item>
                </Select.Group>
                <Select.Separator />
                <Select.Group>
                  <Select.Item value="guardian" disabled>
                    Responsável
                  </Select.Item>
                  <Select.Item value="admin" disabled>
                    Administrador
                  </Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>

          <div /* to={t("url.rescuepassword")} */ className="w-full text-center text-lg font-semibold hover:underline
          xsm:text-xl
        ">
            {t("loginpage.forgotPassword")}
          </div>

          <button
            type="submit"
            className="w-full bg-dark-green text-3xl font-extrabold py-4 rounded-full mt-8 border-2 border-white transition"
          >
            {t("loginpage.login")}
          </button>


        </form>

        <div className="w-full flex flex-col items-center justify-center">
          <p className="text-lg mb-1">
            {t("loginpage.firstTime")}
          </p>
          <Link to={t("url.firstaccess")} className="w-full text-center text-xl font-semibold mb-8 hover:underline">
            {t("loginpage.clickHere")}
          </Link>
        </div>
      </div>

    </main>
  )
}

export default LoginPage
