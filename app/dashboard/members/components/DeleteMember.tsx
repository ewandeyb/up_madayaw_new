"use client"
import { Button } from '@/components/ui/button'
import { TrashIcon } from "@radix-ui/react-icons";
import { deleteMemberById } from '../actions';
import React, { useTransition } from "react";
import { toast } from '@/components/ui/use-toast';

export default function DeleteMember({ user_id }: {user_id: string}){

  const[isPending,startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      const result = JSON.parse(await deleteMemberById(user_id));
      console.log(result);
        if(result?.error?.message){
          toast({
            title: "Failed to delete member."
          })
        }else{
          toast ({
            title: "Successfully deleted member."
          })
        }
    });
  };

  return (
    <form action={onSubmit}>
      <Button variant="outline">
				<TrashIcon />
				Delete
			</Button>
    </form>
  )
}
