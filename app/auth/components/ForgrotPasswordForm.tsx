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
import { sendPasswordResetRequest } from "../actions";

const FormSchema = z.object({
  Email: z.string().email()
});

export default function PasswordChange() {
  const [isPending, startTransition] = useTransition();

  const form1 = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      try {
        const response = await sendPasswordResetRequest(data);
        const parsedResponse = JSON.parse(FormSchema);

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
    <Form {...form1}>
      <form className="w-full space-y-6" onSubmit={form1.handleSubmit(onSubmit)}>
        <div className="">
          <FormField
            control={form1.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="The email you used to register."
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
  );
}