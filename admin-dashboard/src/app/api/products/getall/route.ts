import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure correct Prisma import

export async function GET() {
  try {
    const categories = await prisma.category.findMany(); // Fetch categories
    console.log("Fetched categories:", categories);

    // ✅ Handle case where no categories exist
    if (!categories || categories.length === 0) {
      return NextResponse.json({ message: "No categories found" }, { status: 404 });
    }

    return NextResponse.json(categories, { status: 200 });

  } catch (error) {
    console.error("Error fetching categories:", error);

    return NextResponse.json(
      { message: "Internal server error", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
