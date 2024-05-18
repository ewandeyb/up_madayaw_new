"use client"
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

//Need for forms
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationFormSchema } from "./schema";
import { ApplicationFormFields } from "./types";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { createApplication } from "../actions"

export default function ApplicationForm() {
  const [isPending, startTransition] = useTransition();
  const CivilStatus = ["Single", "Married", "Divorced", "Widowed", "Annulled", "Legally Seperated"];
  const Sex = ["Male", "Female"]
  const NatureOfEmployment = ["Casual", "NGS", "Permanent"]
  const form = useForm<ApplicationFormFields>({
    resolver: zodResolver(ApplicationFormSchema),
    defaultValues: {
      FirstName: "A",
      MiddleName: "A",
      LastName: "A",
      Suffix: "A",
      CivilStatus: "Single",
      PositionTitle: "A",
      Email: "A",
      Sex: "Male",
      NatureOfEmployment: "Casual",
      OfficeTitle: "A"
    },
  });

  function onSubmit(data: ApplicationFormFields) {
    startTransition(async () => {
      const result = await createApplication(data);
      const { error } = JSON.parse(result || '{}');
      if (error?.message) {
        toast({
          title: "Failed to create application",
          description: (
            <pre className="w-full mt-2 rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {error.message}
              </code>
            </pre>
          ),
        });
      } else {
        document.getElementById("create-trigger")?.click();
        toast({
          title: "Sucessfully created and submitted application!",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid md:grid-cols-3 gap-2 p-2"
      >
        <FormField
          control={form.control}
          name="FirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Aaron Dave"
                  type="text"
                  {...field}
                  onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                This is your first name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="MiddleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Sia"
                  type="text"
                  {...field}
                  onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                This is your middle name.
              </FormDescription>
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
                  placeholder="Acuna"
                  type="text"
                  {...field}
                  onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                This is your middle name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          className="grid md:grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="Suffix"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Suffix</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jr./Sr./II/III"
                    type="text"
                    {...field}
                    onChange={field.onChange} />
                </FormControl>
                <FormDescription>
                  Optional.
                </FormDescription>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Civil Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CivilStatus.map((CivilStatus, index) => {
                      return (
                        <SelectItem
                          value={CivilStatus}
                          key={index}
                        >
                          {CivilStatus}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sex</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sex" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Sex.map((Sex, index) => {
                      return (
                        <SelectItem
                          value={Sex}
                          key={index}
                        >
                          {Sex}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div></div><div></div>
        <FormField
          control={form.control}
          name="PositionTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                What office title do you hold?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="NatureOfEmployment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nature of Employment</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select nature of employment" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {NatureOfEmployment.map((NatureOfEmployment, index) => {
                    return (
                      <SelectItem
                        value={NatureOfEmployment}
                        key={index}
                      >
                        {NatureOfEmployment}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="OfficeTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Office Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                What office do you work under?.
              </FormDescription>
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
                  placeholder="username@example.com"
                  type="email"
                  {...field}
                  onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center col-span-3">
          <Button variant="up" type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )

}