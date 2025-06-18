"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { FiLogIn } from "react-icons/fi";
import { IoSearchSharp } from "react-icons/io5";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import ProfileBtn from "./ProfileBtn";
import LoginBtn from "./LoginBtn";
import Sidebar from "./Sidebar";

const Nav = () => {
    const [loading, setLoading] = useState("false");


    const {data:session, status} = useSession();
    const router = useRouter();
  return (
    <div className="w-full border-b-[1px] border-gray-300">
      <main className="max-w-[1000px] mx-2 lg:mx-auto flex justify-between items-center">
        <section>
          <Link href={"/"}>
            <Image src="/image.png" alt="main logo" height={10} width={150} />
          </Link>
        </section>
        <section className="space-x-10 hidden md:flex">
          <Link href={"/"}>Home</Link>
          <Link href={"/products"}>Products</Link>
          <Link href={"/aboutus"}>About us</Link>
        </section>

        <section className="md:hidden flex w-full">
          <input
          type="text"
          placeholder="Search"
          className="p-1 px-2 rounded-lg outline-none border-gray-200 border-[1px] w-full mt-[2px] ml-5"
          />
        </section>

        <section className="flex space-x-5">
          <div className="p-[6px] hidden md:flex cursor-pointer hover:bg-gray-100 transition ease-in-out rounded-2xl">
            <IoSearchSharp size={20} />
          </div>
          <Link href={"/cart"}>
            <div className="p-[6px] hover:bg-gray-100 transition ease-in-out rounded-2xl">
              <FiShoppingCart size={20} />
            </div>
          </Link>
          <div className="hidden md:flex">
            {
                session ? 
                <div>
                     <ProfileBtn session={session}/>
                </div>
                :
                <div>
                    <LoginBtn/>
                </div>
            }
            </div>
            <div className="flex md:hidden">
            <Sidebar/>
            </div>
        </section>
      </main>
    </div>
  );
};

export default Nav;
