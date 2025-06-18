// app/api/cart/add/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/opiton";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { productId, quantity } = body;

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Optional: If you have a composite unique constraint on (userId, productId)
    // try to find an existing cart item.
    const existingCartItem = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId: session.user.id, productId } },
    });

    let cartItem;
    if (existingCartItem) {
      // Update quantity if the item already exists
      cartItem = await prisma.cartItem.update({
        where: { userId_productId: { userId: session.user.id, productId } },
        data: { quantity: existingCartItem.quantity + (quantity || 1) },
      });
    } else {
      // Create a new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: session.user.id,
          productId,
          quantity: quantity || 1,
        },
      });
    }

    return NextResponse.json(
      { message: "Product added to cart", cartItem },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
