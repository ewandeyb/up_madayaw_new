"use client";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { deleteMemberById } from "../../members/actions";
import React, { useTransition, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { UUID } from "crypto";
interface Props {
  user_id: string;
}
export default function DeleteMember({ user_id }: Props) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = useCallback(() => {
    console.log("Button clicked, starting transition");

    startTransition(async () => {
      try {
        const result = await deleteMemberById(user_id);
        console.log(result);
        const { error } = JSON.parse(result || "{}");
        console.log("did the hook!");
        if (error?.message) {
          toast({
            title: "Failed to delete member.",
            description: error.message,
          });
        } else {
          toast({
            title: "Successfully deleted member.",
          });
        }
      } catch (error) {
        toast({
          title: "Failed to delete member.",
        });
      }
    });
  }, [user_id]);

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
