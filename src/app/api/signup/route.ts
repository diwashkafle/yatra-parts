import  { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    
    try {
        const body = await req.json();
        const {email, password, name} = body;

        if(!email || !password){
            return NextResponse.json(
                {message:"Email and Password are required" },
                {status:400},
            );
        }
        const existingUser = await prisma.user.findUnique({
            where: { email },
          });
      
          if (existingUser) {
            return NextResponse.json(
              { message: "User already exists" },
              { status: 400 }
            );
          }
      
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 12);
      
          // Create the user
          const user = await prisma.user.create({
            data: {
              email,
              password: hashedPassword,
              name: name || email,
              role: "ADMIN",
            },
          });
      
          return NextResponse.json(
            {
              message: "User created successfully",
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
              },
            },
            { status: 201 }
          );


    } catch (error) {
        console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
    }
}