"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { deleteMemberApplicationByID } from "../members/actions";
import React, { useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { UUID } from "crypto";

export default function DeleteApplication({ user_id }: { user_id: UUID }) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      try {
        const result = await deleteMemberApplicationByID(user_id as UUID);
        const parsedResult = JSON.parse(result);

        if (parsedResult?.error) {
          toast({
            title: "Failed to delete member application",
            description: parsedResult.error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Successfully deleted member application",
          });
        }
      } catch (error) {
        toast({
          title: "Failed to delete member application",
          variant: "destructive",
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
