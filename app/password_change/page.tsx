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
import { updateUserPassword } from "./actions";
import { getUser } from "@/utils/supabase/auth";
import { useParams } from "next/navigation";

const FormSchema1 = z.object({
  PreviousPassword: z.string().optional(),
  NewPassword: z.string().min(6),
  ConfirmPassword: z.string().min(6)
});

export default function PasswordChange() {
  const site = new URL((window.location.href).toString());
  const params = new URLSearchParams(site.search);

  const [isPending, startTransition] = useTransition();

  const form1 = useForm<z.infer<typeof FormSchema1>>({
    resolver: zodResolver(FormSchema1)
  });

  async function onSubmit(data: z.infer<typeof FormSchema1>) {
    startTransition(async () => {
      try {
        const response = await updateUserPassword(params.get("code")!, data);
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
    <div className="p-2 m-5">
      <Form {...form1}>
        <form className="w-full space-y-6" onSubmit={form1.handleSubmit(onSubmit)}>
          <div className="hidden">
            <FormField
              control={form1.control}
              name="PreviousPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your current Password"
                      type="password"
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form1.control}
            name="NewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your new password"
                    type="password"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form1.control}
            name="ConfirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm your new password"
                    type="password"
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
            Change Password (this will sign you out){" "}
            <AiOutlineLoading3Quarters
              className={cn("animate-spin", isPending ? "block" : "hidden")}
            />
          </Button>
        </form>
      </Form>
    </div>
  );
}