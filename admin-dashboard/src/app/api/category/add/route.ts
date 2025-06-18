import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/opiton";

export async function POST(request: Request) {
  // Check authentication and admin role.
  const session = await getServerSession(authOptions);
  // if (!session || session.user.role !== "ADMIN") {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }
  try {
    const body = await request.json();
    const {name} = body;
    console.log(name)
    if (!name) {
      return NextResponse.json({ message: "Name is required" }, { status: 400 });
    }
    const category = await prisma.category.create({
      data: {name}
    });
    return NextResponse.json({ message: "Category added", category }, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
