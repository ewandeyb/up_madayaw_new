"use client";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { elevateMember } from "../../../members/actions";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { MemberSchema } from "./schema";
import { MemberFields } from "./types";
import { useTransition } from "react";
import { z } from "zod";
const elevateSchema = z
  .object({
    MembershipID: z.string().max(50),
    Email: z.string().email(),
    Role: z.enum(["user", "admin"]),
    Status: z.enum(["active", "resigned"]),
    password: z.string().min(6, { message: "Password should be 6 characters" }),
    confirm: z.string().min(6, { message: "Password should be 6 characters" }),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Password doesn't match",
    path: ["confirm"],
  });
export default function MemberForm() {
  const [isPending, startTransition] = useTransition();
  const Roles = ["admin", "user"];
  const Status = ["active", "resigned"];

  const form = useForm<z.infer<typeof elevateSchema>>({
    resolver: zodResolver(elevateSchema),
    defaultValues: {
      MembershipID: "",
      Role: "user",
      Status: "active",
      Email: "",
    },
  });

  function onSubmit(data: z.infer<typeof elevateSchema>) {
    console.log("hellooo!");
    startTransition(async () => {
      const result = await elevateMember(data);
      const { error } = JSON.parse(result || "{}");
      if (error) {
        toast({
          title: "Failed to create member",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{error}</code>
            </pre>
          ),
        });
      } else {
        document.getElementById("elevate-trigger")?.click();
        toast({
          title: "Successfully elevated application to official member",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form className="w-full space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="MembershipID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>MembershipID</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type="text" // Use type="text" for MembershipID
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
          name="Email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  type="text" // Use type="text" for Email
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
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
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="******"
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
          control={form.control}
          name="Role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Roles.map((role, index) => (
                    <SelectItem value={role} key={index}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Status.map((status, index) => (
                    <SelectItem value={status} key={index}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit" // Use type="submit" for the button
          className="w-full flex gap-2 items-center"
          variant="outline"
          onClick={() => {
            console.log("hello!");
            console.log(form);
          }}
        >
          Submit
          <AiOutlineLoading3Quarters
            className={cn("animate-spin", { hidden: !isPending })}
          />
        </Button>
      </form>
    </Form>
  );
}
