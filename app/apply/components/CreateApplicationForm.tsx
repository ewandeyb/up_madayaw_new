"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import React, { useState } from "react";
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
} from "@/components/ui/popover";

import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApplicationFormSchema } from "./schema";
import { ApplicationFormFields } from "./types";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { createApplication } from "../actions";
import { useFieldArray } from "react-hook-form";

export default function ApplicationForm() {
  const [isPending, startTransition] = useTransition();
  const CivilStatus = [
    "Single",
    "Married",
    "Divorced",
    "Widowed",
    "Annulled",
    "Legally Seperated",
  ];
  const Sex = ["Male", "Female"];
  const NatureOfEmployment = ["Casual", "NGS", "Permanent"];
  const [BirthDate, setDate] = React.useState<Date>();
  const [dates, setDates] = React.useState<Date[]>([]);

  const PrevMemberStatus = ["Yes", "No"];

  const form = useForm<ApplicationFormFields>({
    resolver: zodResolver(ApplicationFormSchema),
    defaultValues: {
      FirstName: "Jane",
      MiddleName: "MTest",
      LastName: "LTest",
      CivilStatus: "Single",
      Email: "example@email.com",
      Birthplace: "PlaceTest",
      ContactNumber: "55569420",
      PositionTitle: "PosTest",
      NatureOfEmployment: "NGS",
      OfficeTitle: "OfficeTest",
      YearsOfService: 42,

      MemLine1: "Line1",
      MemBarangay: "Barangay",
      MemMunicipalityCity: "Municipality",
      MemProvince: "Province",
      MemZipCode: 69,

      NearestRelativeFirstName: "RelativeFirst",
      NearestRelativeLastName: "RelativeLast",

      RelativeLine1: "RelLine1",
      RelativeBarangay: "RelBaran",
      RelativeMunicipalityCity: "RelCity",
      RelativeProvince: "RelProvicnce",
      RelativeZipCode: 420,

      dependents: [
        {
          id: 1,
          FirstName: "",
          MiddleName: "",
          LastName: "",
          Suffix: "",
          Relationship: "",
          Sex: "Male",
        },
      ],

      PrevMemberStatus: "Yes",
      LeaveReason: "form sucks",
      ReferralName: "RefName",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "dependents",
    control: form.control,
  });

  function onSubmit(data: ApplicationFormFields) {
    console.log("Form data:", data);
    startTransition(async () => {
      const result = await createApplication(data);
      console.log(result);
      const { error } = JSON.parse(result || "{}");
      if (error?.message) {
        //console.log({error})
        toast({
          title: "Failed to create application",
          description: (
            <pre className="w-full mt-2 rounded-md bg-slate-950 p-4">
              <code className="text-white">{error.message}</code>
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-2">
        <hr></hr>
        <div className="p-2">
          <h1 className="font-bold text-upcolor dark:text-red-600">
            Personal Data
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-2">
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                          <SelectItem value={CivilStatus} key={index}>
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
                          <SelectItem value={Sex} key={index}>
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
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"default"}
                        className={cn(
                          "w-full flex justify-start text-left font-normal",
                          !BirthDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {BirthDate ? (
                          format(BirthDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={BirthDate}
                        onSelect={(date) => {
                          setDate(date); // Update the state with the new date
                          field.onChange(date); // Update the form control with the new date
                          console.log("Date changed:", date); // Log or track the date change
                        }}
                        fromYear={1960}
                        toYear={2030}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Birthplace"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birthplace</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Region, City"
                      type="text"
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ContactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="text"
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <hr></hr>
        <div className="p-2">
          <h1 className="font-bold text-upcolor dark:text-red-600">
            Spouse Data
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 p-2">
            <FormField
              control={form.control}
              name="SpouseFirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      type="string"
                      {...field}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                    <Input type="text" {...field} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <hr></hr>
        <div className="p-2">
          <h1 className="font-bold text-upcolor dark:text-red-600">
            Postal Address
          </h1>
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Line 1 of your postal address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <hr></hr>
        <div className="p-2">
          <h1 className="text-upcolor dark:text-red-600 font-bold">
            Nearest Relative Data
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Line 1 of nearest relative&apos;s postal address
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <hr></hr>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
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
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <hr></hr>
        <div className="p-2">
          <h1 className="text-upcolor dark:text-red-600 font-bold">
            Occupation
          </h1>
          <div className="grid md:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="PositionTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position Title</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} onChange={field.onChange} />
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
                          <SelectItem value={NatureOfEmployment} key={index}>
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
                    <Input type="text" {...field} onChange={field.onChange} />
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
              name="YearsOfService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Service</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    How many years have you been working in this position?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <hr></hr>
        <div className="p-2">
          <h1 className="text-upcolor dark:text-red-600 font-bold">
            Dependents
          </h1>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-7 gap-2"
            >
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name={`dependents.${index}.FirstName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name={`dependents.${index}.MiddleName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name={`dependents.${index}.LastName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name={`dependents.${index}.Suffix`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Suffix</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name={`dependents.${index}.BirthDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"default"}
                            className={cn(
                              "w-full flex justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {field.value ? (
                              format(new Date(field.value), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              const newDates = [...dates]; // Create a copy of the dates array
                              if (date !== undefined) {
                                newDates[index] = date; // Update the date at the current index if date is defined
                              }
                              setDates(newDates); // Update the state with the new array of dates
                              field.onChange(date); // Update the form control with the new date
                              console.log("Date changed:", date); // Log or track the date change
                            }}
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
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name={`dependents.${index}.Relationship`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name={`dependents.${index}.Sex`}
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
                          {Sex.map((sex, idx) => (
                            <SelectItem value={sex} key={idx}>
                              {sex}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1 flex items-end">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-center col-span-3 gap-4 mt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                append({
                  id: fields.length + 1,
                  FirstName: "",
                  MiddleName: "",
                  LastName: "",
                  Suffix: "",
                  Relationship: "",
                  Sex: "Male" as "Male" | "Female",
                })
              }
            >
              Add Dependent
            </Button>
          </div>
        </div>

        <hr></hr>
        <div className="p-2">
          <h1 className="text-upcolor dark:text-red-600 font-bold">
            Survey Questions
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-2">
            <div>
              <FormField
                control={form.control}
                name="PrevMemberStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Member?</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="No" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PrevMemberStatus.map((PrevMemberStatus, index) => {
                          return (
                            <SelectItem value={PrevMemberStatus} key={index}>
                              {PrevMemberStatus}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Were you a previous member of this co-op?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3">
              <FormField
                control={form.control}
                name="LeaveReason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for leaving</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} onChange={field.onChange} />
                    </FormControl>
                    <FormDescription>
                      What reasons (if any) did you have for leaving?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="ReferralName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referral Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} onChange={field.onChange} />
                    </FormControl>
                    <FormDescription>
                      Name of person who referred/recruited you to apply (if
                      any)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center col-span-3 gap-4">
          <Button variant="up" type="submit" className=" w-40">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
