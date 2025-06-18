import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { signIn} from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FiLogIn } from 'react-icons/fi';

const LoginBtn = () => {
  return (
        <Dialog>
                <DialogTrigger asChild>
               <button className="p-[6px] hover:bg-gray-100 transition ease-in-out rounded-2xl">
               <FiLogIn size={20} />
               </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="text-center">Sign in</DialogTitle>
                    <DialogDescription className="text-center">
                     You can directly sign in using your google account.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="flex items-center">
                    <button onClick={()=>signIn("google")} className="flex flex-col items-center border-gray-400 border-[1px] rounded-lg p-2 w-full">
                        <FcGoogle size={35}/>
                        <p>Sign in with Google</p>
                        </button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
  )
}

export default LoginBtn