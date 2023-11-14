import HeaderLabel from "./HeaderLabel"

const Header = () => {
  return (
    <div className="w-full px-5 pt-5 pb-2 bg-light-green text-white flex flex-col
                    md:flex-row md:pb-5 md:justify-between
                    xl:px-8">
      <img src="/images/IfsulLogo.png" alt="" className="md:max-w-[40%] lg:max-w-[35%] xl:max-w-[30%] 2xl:max-w-[20%]" />
      <HeaderLabel />
    </div>
  )
}

export default Header 
