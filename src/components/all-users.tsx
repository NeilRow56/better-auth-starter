"use client";

import { Button } from "./ui/button";
import { addMember } from "@/server/members";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/db/schema";

interface AllUsersProps {
  users: User[];
  organizationId: string;
}

export default function AllUsers({ users, organizationId }: AllUsersProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddMember = async (userId: string) => {
    try {
      setIsLoading(true);
      await addMember(organizationId, userId, "member");
      setIsLoading(false);
      toast.success("Member added to organization");
      router.refresh();
    } catch (error) {
      toast.error("Failed to add member to organization");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        {users.map((user) => (
          <div key={user.id}>
            <Button
              onClick={() => handleAddMember(user.id)}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                `Add ${user.name} to organization`
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
