import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/opiton";

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  // if (!session || session.user.role !== "ADMIN") {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }
  try {
    const body = await request.json();
    const { id, name} = body;
    if (!id || !name) {
      return NextResponse.json({ message: "ID and name are required" }, { status: 400 });
    }
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name},
    });
    return NextResponse.json({ message: "Category updated", category: updatedCategory }, { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
