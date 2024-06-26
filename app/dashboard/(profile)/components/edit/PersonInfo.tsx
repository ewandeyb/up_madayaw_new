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
import { IMemberData } from "@/lib/types";
import { useTransition } from "react";
import { updateMemberBasicByEmail } from "../../actions";

const FormSchema = z.object({
  FirstName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  LastName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  CivilStatus: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  BirthDate: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export default function MemDetails({
  MemberProfile,
}: {
  MemberProfile: IMemberData;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      FirstName: MemberProfile?.FirstName ?? "",
      LastName: MemberProfile?.LastName ?? "",
      CivilStatus: MemberProfile?.CivilStatus ?? "",
      BirthDate: MemberProfile?.BirthDate ?? "",
    },
  });

  // Ensure MemberProfile is defined
  if (!MemberProfile) {
    return <div>Loading...</div>; // or handle the error appropriately
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      try {
        const response = await updateMemberBasicByEmail(
          MemberProfile.Email,
          data
        );
        const parsedResponse = JSON.parse(response);

        if (parsedResponse.error) {
          toast({
            title: "Failed to update",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {parsedResponse.error.message}
                </code>
              </pre>
            ),
          });
        } else {
          toast({
            title: "Successfully updated",
          });
          // Reload the page to reflect the changes
          window.location.reload();
        }
      } catch (error) {
        toast({
          title: "Error",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{(error as Error).message}</code>
            </pre>
          ),
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="FirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="First Name"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="LastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Last Name"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="CivilStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Civil Status</FormLabel>
              <FormControl>
                <Input
                  placeholder="Civil Status"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="BirthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Date</FormLabel>
              <FormControl>
                <Input
                  placeholder="Birth Date"
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
        >
          Update{" "}
          <AiOutlineLoading3Quarters
            className={cn("animate-spin", isPending ? "block" : "hidden")}
          />
        </Button>
      </form>
    </Form>
  );
}
