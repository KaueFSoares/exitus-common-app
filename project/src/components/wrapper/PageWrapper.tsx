import React from "react"
import Header from "../layout/header/Header"
import Navbar from "../layout/navbar/Navbar"

interface PageWrapperProps {
    children: React.ReactNode
    full: boolean
}

/**
 * 
 * @param full {boolean} - if the height is 100vh 
 */
const PageWrapper = ({ children, full }: PageWrapperProps) => {
  return (
    <main className={`relative w-full ${full ? "h-screen" : "min-h-screen"} flex flex-col items-center justify-start`}>
      <Header />
      {children}
      <Navbar />
    </main>
  )
}

export default PageWrapper
