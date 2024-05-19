"use client"
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import React, { useState } from 'react';
//Changed Date to string
/* import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; */

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { CalendarIcon } from "@radix-ui/react-icons"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
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
  const [date, setDate] = React.useState<Date>()
  const form = useForm<ApplicationFormFields>({
    resolver: zodResolver(ApplicationFormSchema),
    defaultValues: {
      FirstName: "John",
      MiddleName: "Paul",
      LastName: "Doe",
      Suffix: "Jr.",
      CivilStatus: "Single",
      PositionTitle: "Project Officer I",
      Email: "johndoe@upmadayaw@up.edu.ph",
      Sex: "Male",
      NatureOfEmployment: "Casual",
      OfficeTitle: "CEO"
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
        className="p-2"
      >
        <h1>Personal Data</h1>

        <div className="grid md:grid-cols-4 gap-2 p-2">

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
                  This is your last name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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

        <FormField
          control={form.control}
          name="BirthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className=" w-auto p-0">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={date}
                    onSelect={setDate}
                    fromYear={1960}
                    toYear={2030}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />  

        </div>

        <hr></hr>
        <div className="p-2">
          <h1>Spouse Data</h1>
          <div className="grid md:grid-cols-4 gap-2 p-2">
            <FormField
              control={form.control}
              name="SpouseFirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      {...field}
                      onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="SpouseMiddleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      {...field}
                      onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="SpouseLastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      {...field}
                      onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="SpouseSuffix"
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

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="SpouseOccupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <hr></hr>
        <div className="p-2">
          <h1>Postal Address</h1>
          <div className="">
            <FormField
              control={form.control}
              name="MemLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      {...field}
                      onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    Line 1 of your postal address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-4 gap-2">
            <FormField
              control={form.control}
              name="MemBarangay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barangay</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      {...field}
                      onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="MemMunicipalityCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Municipality / City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      {...field}
                      onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="MemProvince"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      {...field}
                      onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="MemZipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="number"
                      {...field}
                      onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="p-2">
          <h1>Nearest Relative Data</h1>
          <div className="grid md:grid-cols-3 gap-2">
          <FormField
            control={form.control}
            name="NearestRelativeFirstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="text"
                    {...field}
                    onChange={field.onChange} />
                </FormControl>
                <FormDescription>
                  
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="NearestRelativeLastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="text"
                    {...field}
                    onChange={field.onChange} />
                </FormControl>
                <FormDescription>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
              control={form.control}
              name="RelativeLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      {...field}
                      onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    Line 1 of your postal address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-4 gap-2">
            <FormField
              control={form.control}
              name="RelativeBarangay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barangay</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      {...field}
                      onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="RelativeMunicipalityCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Municipality / City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      {...field}
                      onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="RelativeProvince"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      {...field}
                      onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="RelativeZipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="number"
                      {...field}
                      onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>

                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <hr></hr>
        <h1>Occupation</h1>
        <div className="grid md:grid-cols-4 gap-2 p-2">
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
        </div>


        <div className="flex justify-center col-span-3">
          <Button variant="up" type="submit">Submit</Button>
        </div>
      </form>
    </Form >
  )

}