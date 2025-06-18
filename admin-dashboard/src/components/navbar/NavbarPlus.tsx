'use client'
import React from 'react'
import Nav from "@/components/navbar/Nav";
import { usePathname } from "next/navigation";

const NavbarPlus = () => {

const pathname = usePathname();
  const hideNav = pathname.startsWith("/admin");

  return (
    <>
    {!hideNav && <Nav />}
    </>
  )
}

export default NavbarPlus