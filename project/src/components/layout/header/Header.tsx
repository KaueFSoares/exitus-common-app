
const Header = () => {
  return (
    <div className="w-full px-5 pt-5 pb-2 bg-light-green text-white flex flex-col
                    md:flex-row md:pb-5 md:justify-between
                    xl:px-8">
      <img src="/images/IfsulLogo.png" alt="" className="md:max-w-[40%] lg:max-w-[35%] xl:max-w-[30%] 2xl:max-w-[20%]" />
      <h2 className="font-semibold text-lg ml-3 mt-3 flex flex-grow
                      md:justify-end md:items-center md:text-left md:mr-3
                      xl:text-2xl">
        Kauê Felipe Muller Soares
      </h2>
    </div>
  )
}

export default Header
