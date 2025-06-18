import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/opiton";

import prisma from "@/lib/prisma";

export async function GET(){
    const session = await getServerSession(authOptions);
    
    if(!session){
        return NextResponse.json({message:"Unauthorized"},{status:401});
    }

    const favorites = await prisma.favorites.findMany({
        where:{userId:session.user.id},
        include:{product:true}
    });

    return NextResponse.json(favorites,{status:200})
}