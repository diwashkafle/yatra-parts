"use client";

import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <h2>Welcome, {session.user.name}</h2>
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role}</p>
    </div>
  );
}
