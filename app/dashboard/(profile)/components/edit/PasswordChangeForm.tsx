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
import { updateMemberBasicById } from "../../actions";

const FormSchema = z.object({
  PreviousPassword: z.string(),
  NewPassword: z.string(),
  ConfirmPassword: z.string()
});

export default function PasswordChange() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      try {
        const response = await updateMemberBasicById(MemberProfile.MembershipID, data);
        const parsedResponse = JSON.parse(response);

        if (parsedResponse.error) {
          toast({
            title: "Failed to update",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{parsedResponse.error.message}</code>
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
        if (error instanceof Error) {
          toast({
            title: "Error",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{error.message}</code>
              </pre>
            ),
          });
        } else {
          toast({
            title: "Error",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">An unknown error occurred</code>
              </pre>
            ),
          });
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="PreviousPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Membership Number"
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
          name="MemberType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membership Type</FormLabel>
              <FormControl>
                <Input
                  placeholder="Membership Type"
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