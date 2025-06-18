import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/opiton";

import prisma from "@/lib/prisma";

export async function GET(){
    const session = await getServerSession(authOptions);
    
    if(!session){
        return NextResponse.json({message:"Unauthorized"},{status:401});
    }

    const orders = await prisma.order.findMany({
        where:{userId:session.user.id},
        orderBy:{createdAt:"desc"},
        include:{item:true}
    });

    return NextResponse.json(orders,{status:200})
}