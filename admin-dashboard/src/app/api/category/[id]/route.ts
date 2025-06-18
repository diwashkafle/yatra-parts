import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: { products: true }, // include products if desired
    });
    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
