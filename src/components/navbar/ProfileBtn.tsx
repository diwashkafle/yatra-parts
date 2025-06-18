import Image from 'next/image'
import React from 'react'
import {signOut} from "next-auth/react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { RiAccountPinCircleFill } from "react-icons/ri";
import Link from 'next/link';

const ProfileBtn = ({session}:{session:any}) => {
  return (
         <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='flex items-center'>
        {
            session.user.image?<Image className='rounded-full'
            src={session.user.image} alt="main logo" height={30} width={30} /> : <RiAccountPinCircleFill size={25} />
        }
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={'/profile'}>
              <button>
                Profile
              </button>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={()=>signOut()}>Log out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileBtn