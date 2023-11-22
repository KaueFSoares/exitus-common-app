import QRCode from "react-qr-code"
import { useTranslation } from "react-i18next"
import PageWrapper from "../components/wrapper/PageWrapper"

interface Props {
  code: string
  handleOnUpdate: () => void
}

const CodePage = ({
  code,
  handleOnUpdate,
}: Props) => {
  const { t } = useTranslation()

  return (
    <PageWrapper full>
      <section className="w-full h-full flex flex-col items-center p-5 xsm:p-10">
        <div className="w-full flex flex-col justify-center mb-4 xsm:mb-8">
          <p className="text-light-green text-center text-lg xsm:text-xl">
            {t("codepage.thisisyour")}
          </p>
          <h1 className="text-2xl font-extrabold text-center text-light-green xsm:text-3xl">
            {t("codepage.code")}
          </h1>
        </div>
        <div className="p-5 bg-gray rounded-2xl mb-8 h-[45%] xsm:h-[50%]">
          <QRCode
            level="H"
            bgColor="#d9d9d9"
            value={code}
            className="h-full w-full"
          />
        </div>
        <button onClick={handleOnUpdate} className="bg-light-green text-white py-3 px-6 font-bold text-xl rounded-xl xsm:text-2xl">
          {t("codepage.update")}
        </button>
      </section>
    </PageWrapper>
  )
}

export default CodePage
