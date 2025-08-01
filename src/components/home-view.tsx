"use client";

import React from "react";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <p> Logged in as: {session.user.name}</p>
      <Button
        onClick={() =>
          signOut({
            fetchOptions: { onSuccess: () => router.push("/auth/sign-in") },
          })
        }
      >
        Sign out
      </Button>
    </div>
  );
};
