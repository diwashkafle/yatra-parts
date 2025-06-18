// app/api/cart/remove/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/opiton";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Delete the cart item based on composite key (userId, productId)
    const deletedCartItem = await prisma.cartItem.delete({
      where: { userId_productId: { userId: session.user.id, productId } },
    });

    return NextResponse.json(
      { message: "Product removed from cart", deletedCartItem },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
