import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN";
      name?: string;
      email?: string;
      };
  }

  interface User {
    id: string;
    role: "USER" | "ADMIN";
    name?: string;
    email?: string;
  }
}
