import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/opiton";

import prisma from "@/lib/prisma";

export async function GET(){

    const session = await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({message:"Unauthorized"}, {status:401})
    }

    const user = await prisma.user.findUnique({
        where:{id:session.user.id},
        select:{
            id:true,
            email:true,
            name:true,
            role:true,
        },
    })

    if(!user){
        return NextResponse.json({message:"User not found"}, {status:404})
    }

    return NextResponse.json(user,{status:200})

}