// app/api/products/add/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from '../../auth/[...nextauth]/opiton';
import { describe } from "node:test";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name,category, description, crossedPrice, sellingPrice, costPrice,regularSizes,extraSizes,numOfProduct, image } = body;
    if (!name || !crossedPrice || !category || !describe) {
      return NextResponse.json(
        { message: "All the feild are required to fill!å" },
        { status: 400 }
      );
    }
    const product = await prisma.product.create({
      data: { name,category, description, crossedPrice,sellingPrice, costPrice,regularSizes,extraSizes,numOfProduct, image },
    });
    return NextResponse.json(
      { message: "Product added successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
