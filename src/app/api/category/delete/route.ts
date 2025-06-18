import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/opiton";

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  // if (!session || session.user.role !== "ADMIN") {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ message: "Category ID is required" }, { status: 400 });
    }
    const deletedCategory = await prisma.category.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Category deleted", category: deletedCategory }, { status: 200 });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
