"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiAccountPinCircleFill, RiMenuFold2Fill } from "react-icons/ri";
import { signIn, signOut, useSession } from "next-auth/react";
import LoginBtn from "./LoginBtn";
import Link from "next/link";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";


const Sidebar = () => {
  const { data: session, status } = useSession();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button>
          <RiMenuFold2Fill size={25} />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {" "}
            {session ? (
              <div>
                <section className="flex space-x-3">
                {session.user.image ? (
                  <Image
                    className="rounded-full"
                    src={session.user.image}
                    alt="main logo"
                    height={30}
                    width={30}
                  />
                ) : (
                  <RiAccountPinCircleFill size={25} />
                )}
                <h1>{session.user.name}</h1>
                </section>
              </div>
            ) : (
              <div className="flex items-center">
                <span>Login</span>
                <LoginBtn />
              </div>
            )}
          </SheetTitle>
        </SheetHeader>
        <section className="space-y-5 my-10 flex flex-col">
        <SheetClose asChild><Link href={'/profile'}>Profile</Link></SheetClose>
        <SheetClose asChild><Link href={"/"}>Home</Link></SheetClose>
        <SheetClose asChild><Link href={"/products"}>Products</Link></SheetClose>
        <SheetClose asChild><Link href={"/aboutus"}>About us</Link></SheetClose>
        </section>
        <SheetFooter>
          <SheetClose asChild>
            {
                session ? <button onClick={()=>signOut()} className="w-full flex justify-center items-center space-x-2 border-gray-200 rounded-lg border-[1px]">
                <span>Logout</span>
                <FiLogOut size={15}/>
            </button> : null
            }
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
