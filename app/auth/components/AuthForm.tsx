"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import { loginWithEmailAndPassword } from "../actions";
import { AuthTokenResponse } from "@supabase/supabase-js";
import ForgotPassword from "./ForgotPassword";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password can not be empty" }),
});

export default function AuthForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const { error } = JSON.parse(
        await loginWithEmailAndPassword(data)
      ) as AuthTokenResponse;

      if (error) {
        toast({
          title: "Fail to login",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{error.message}</code>
            </pre>
          ),
        });
      } else {
        console.log(data.email);
        toast({
          title: "Successfully login 🎉",
        });
      }
    });
  }

  return (
    <div className="w-96 mt-24">
      {/* <Image 
			alt="UP Madayaw Logo"
			className="overflow-hidden rounded-xl object-cover object-center "
			height="250"
			src={coop}
			width="250"
			/> */}
      <h2 className="py-12 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
        Sign in to your account
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="member@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*******" {...field} type="password" />
                </FormControl>
                <FormDescription>
                  Please contact administrator in case you forgot your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <div className="float-right hover:underline pb-5">
            <ForgotPassword />
          </div> */}

          <Button
            type="submit"
            variant="up"
            className="w-full flex items-center gap-2 mt-10"
          >
            Login{" "}
            <AiOutlineLoading3Quarters
              className={cn("animate-spin", {
                hidden: true,
              })}
            />
          </Button>
        </form>
      </Form>
    </div>
  );
}
