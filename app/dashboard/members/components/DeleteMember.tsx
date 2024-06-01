"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { deleteMemberById } from "../../members/actions";
import React, { useTransition, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { UUID } from "crypto";

export default function DeleteMember({ user_id }: { user_id: UUID }) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      const result = JSON.parse(await deleteMemberById(user_id as UUID));
      if (result?.error?.message) {
        toast({
          title: "Fail to delete member",
        });
      } else {
        toast({
          title: "Successfully delete member",
        });
      }
    });
  };

  return (
    <Button
      variant="dropdown"
      className="font-normal max-h-5 justify-start"
      onClick={onSubmit}
      disabled={isPending}
    >
      <TrashIcon />
      Delete
    </Button>
  );
}
