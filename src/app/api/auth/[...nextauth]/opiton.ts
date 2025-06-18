import  { AuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Extend the built-in session types
declare module "next-auth" {
  interface User {
    role: "USER" | "ADMIN";
  }
  
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: "USER" | "ADMIN";
    } & DefaultSession["user"]
  }
}

// Extend JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "USER" | "ADMIN";
  }
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { 
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile(profile) {
        return {
          id: profile.sub, 
          name: profile.name ?? "Unnamed User",
          email: profile.email,
          image: profile.picture,
          role: "USER",
        };
      },
    }),

    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || user.role !== "ADMIN") {
          throw new Error("User not found or not an admin");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password!);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          name: user.name ?? "Admin",
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        role: token.role,
        name: session.user?.name ?? "",
        email: session.user?.email ?? "",
        image:session.user?.image ?? "",
      };
      return session;
    },
  },
  pages:{
    signIn: '/auth/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};