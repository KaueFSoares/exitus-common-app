import React from "react"
import Header from "../layout/header/Header"
import Navbar from "../layout/navbar/Navbar"

interface PageWrapperProps {
    children: React.ReactNode
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <main className="relative w-full h-screen flex flex-col items-center justify-start">
      <Header />
      {children}
      <Navbar />
    </main>
  )
}

export default PageWrapper
