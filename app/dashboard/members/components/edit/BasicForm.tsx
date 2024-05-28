"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { IPermission } from "@/lib/types";
import { useTransition } from "react";
import { updateMemberBasicById } from "../../../members/actions";
import { MemberSchema } from "../create/schema";
import { MemberFields } from "../create/types";

const FormSchema = z.object({
  FirstName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export default function BasicForm({ permission }: { permission: IPermission }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      FirstName: permission.MemberData.FirstName,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("reached here");
    startTransition(async () => {
      const { error } = JSON.parse(
        await updateMemberBasicById(permission.PermissionsID, data)
      );
      console.log("hi");

      if (error?.message) {
        toast({
          title: "Fail to update",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">error?.message</code>
            </pre>
          ),
        });
      } else {
        toast({
          title: "Sucessfully updated",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-6">
        <FormField
          control={form.control}
          name="FirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex gap-2 items-center w-full"
          variant="outline"
          onClick={(event) => {
            form.handleSubmit(onSubmit)();
          }}
        >
          Update{" "}
          <AiOutlineLoading3Quarters
            className={cn(" animate-spin", "hidden")}
          />
        </Button>
      </form>
    </Form>
  );
}
