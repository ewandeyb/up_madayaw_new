"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
import { ApplicationFormFields } from "@/app/apply/components/types";
import { ApplicationFormSchema } from "@/app/apply/components/schema";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import { createApplication } from "@/app/apply/actions";
import { updateMember } from "../../hooks/updateMember";
import { UUID } from "crypto";
import { readMemberData } from "../../hooks/readMember";
export default function Edit() {
  const [isPending, startTransition] = useTransition();
  const CivilStatus = [
    "Single",
    "Married",
    "Divorced",
    "Widowed",
    "Annulled",
    "Legally Seperated",
  ];
  const { MembershipID } = useParams();
  const Sex = ["Male", "Female", "Other", "Prefer not to Say"];
  const NatureOfEmployment = ["Casual", "NGS", "Permanent"];
  const [BirthDate, setDate] = React.useState<Date>();
  const [date1, setDate1] = React.useState<Date>();
  const [date2, setDate2] = React.useState<Date>();
  const [date3, setDate3] = React.useState<Date>();

  const PrevMemberStatus = ["Yes", "No"];

  const form = useForm<ApplicationFormFields>({
    /*  resolver: zodResolver(ApplicationFormSchema), */ // So you can edit parts of the form and not all.
    defaultValues: {
      FirstName: "",
      MiddleName: "",
      LastName: "",
      CivilStatus: "Single",
      Sex: "Male",
      Email: "",
      Birthplace: "",
      ContactNumber: "",

      PositionTitle: "",
      NatureOfEmployment: "NGS",
      OfficeTitle: "",
      YearsOfService: 10,

      MemLine1: "",
      MemBarangay: "",
      MemMunicipalityCity: "",
      MemProvince: "",
      MemZipCode: 69,

      NearestRelativeFirstName: "",
      NearestRelativeLastName: "",

      RelativeLine1: "",
      RelativeBarangay: "",
      RelativeMunicipalityCity: "",
      RelativeProvince: "",
      RelativeZipCode: 420,

      Dependent1FirstName: "",

      Dependent2FirstName: "",
      Dependent2MiddleName: "",
      Dependent2LastName: "",
      Dependent2Suffix: "",
      Dependent2BirthDate: new Date("2020-04-20"),
      Dependent2Relation: "",
      Dependent2Sex: "",

      PrevMemberStatus: "",
      LeaveReason: "",
      ReferralName: "",
    },
  });
  const { reset } = form;
  useEffect(() => {
    async function fetchData() {
      const response = await readMemberData(MembershipID as UUID);
      console.log("fetchData");
      console.log(response);
      reset({
        FirstName: response.memberData.FirstName ?? "",
        MiddleName: response.memberData.MiddleName ?? "",
        LastName: response.memberData.LastName ?? "",
        CivilStatus: response.memberData.CivilStatus ?? "Single",
        Email: response.memberData.Email ?? "",
        Birthplace: response.memberData.Birthplace ?? "",
        ContactNumber: response.memberData.ContactNumber ?? "",
        Sex: response.memberData.Sex ?? "Male",
        BirthDate: response.memberData.BirthDate ?? new Date("2020-04-20"),
        /*  PositionTitle: data.PositionTitle ?? "",
        NatureOfEmployment: data.NatureOfEmployment ?? "NGS",
        OfficeTitle: data.OfficeTitle ?? "",
        YearsOfService: data.YearsOfService ?? 10,
        MemLine1: data.MemLine1 ?? "",
        MemBarangay: data.MemBarangay ?? "",
        MemMunicipalityCity: data.MemMunicipalityCity ?? "",
        MemProvince: data.MemProvince ?? "",
        MemZipCode: data.MemZipCode ?? 69,
        NearestRelativeFirstName: data.NearestRelativeFirstName ?? "",
        NearestRelativeLastName: data.NearestRelativeLastName ?? "",
        RelativeLine1: data.RelativeLine1 ?? "",
        RelativeBarangay: data.RelativeBarangay ?? "",
        RelativeMunicipalityCity: data.RelativeMunicipalityCity ?? "",
        RelativeProvince: data.RelativeProvince ?? "",
        RelativeZipCode: data.RelativeZipCode ?? 420,
        Dependent1FirstName: data.Dependent1FirstName ?? "",
        Dependent2FirstName: data.Dependent2FirstName ?? "",
        Dependent2MiddleName: data.Dependent2MiddleName ?? "",
        Dependent2LastName: data.Dependent2LastName ?? "",
        Dependent2Suffix: data.Dependent2Suffix ?? "",
        Dependent2BirthDate: data.Dependent2BirthDate
          ? new Date(data.Dependent2BirthDate)
          : new Date("2020-04-20"),
        Dependent2Relation: data.Dependent2Relation ?? "",
        Dependent2Sex: data.Dependent2Sex ?? "",
        PrevMemberStatus: data.PrevMemberStatus ?? "",
        LeaveReason: data.LeaveReason ?? "",
        ReferralName: data.ReferralName ?? "",  */
      });
    }
    fetchData();
  }, [MembershipID, reset]);

  function onSubmit(data: ApplicationFormFields) {
    startTransition(async () => {
      const result = await updateMember(MembershipID as UUID, data);
      console.log("result below");
      console.log(result);
      const { error } = JSON.parse(result || "{}");
      if (error?.message) {
        //console.log({error})
        toast({
          title: "Failed to update member data",
          description: (
            <pre className="w-full mt-2 rounded-md bg-slate-950 p-4">
              <code className="text-white">{error.message}</code>
            </pre>
          ),
        });
      } else {
        document.getElementById("create-trigger")?.click();
        toast({
          title: "Sucessfully updated member data!",
        });
      }
    });
  }

  const data = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex flex-items justify-between">
        <h1 className="text-2xl font-bold">Edit Member</h1>
        <Button
          variant="outline"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-2">
          <hr></hr>
          <div className="p-2">
            <h1 className="font-bold text-upcolor">Personal Data</h1>

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
            <h1 className="font-bold text-upcolor">Spouse Data</h1>
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
            <h1 className="font-bold text-upcolor">Postal Address</h1>
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
            <h1 className="text-upcolor font-bold">Nearest Relative Data</h1>
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
            <h1 className="text-upcolor font-bold">Occupation</h1>
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
                      <Input
                        type="number"
                        {...field}
                        onChange={field.onChange}
                      />
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
            <h1 className="text-upcolor font-bold">Dependents</h1>

            <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-7 gap-2">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="Dependent1FirstName"
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
                  name="Dependent1MiddleName"
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
                  name="Dependent1LastName"
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
                  name="Dependent1Suffix"
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
                  name="Dependent1BirthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"default"}
                            className={cn(
                              "w-full flex justify-start text-left font-normal",
                              !date1 && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {date1 ? (
                              format(date1, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={date1}
                            onSelect={(date1) => {
                              setDate1(date1); // Update the state with the new date
                              field.onChange(date1); // Update the form control with the new date
                              console.log("Date changed:", date1); // Log or track the date change
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
                  name="Dependent1Relation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relation</FormLabel>
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
                  name="Dependent1Sex"
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
              </div>
            </div>

            <hr></hr>
            <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-7 gap-2">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="Dependent2FirstName"
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
                  name="Dependent2MiddleName"
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
                  name="Dependent2LastName"
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
                  name="Dependent2Suffix"
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
                  name="Dependent2BirthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"default"}
                            className={cn(
                              "w-full flex justify-start text-left font-normal",
                              !date2 && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {date2 ? (
                              format(date2, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={date2}
                            onSelect={(date2) => {
                              setDate2(date2); // Update the state with the new date
                              field.onChange(date2); // Update the form control with the new date
                              console.log("Date changed:", date2); // Log or track the date change
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
                  name="Dependent2Relation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relation</FormLabel>
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
                  name="Dependent2Sex"
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
              </div>
            </div>

            <hr></hr>
            <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-7 gap-2">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="Dependent3FirstName"
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
                  name="Dependent3MiddleName"
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
                  name="Dependent3LastName"
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
                  name="Dependent3Suffix"
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
                  name="Dependent3BirthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"default"}
                            className={cn(
                              "w-full flex justify-start text-left font-normal",
                              !date3 && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {date3 ? (
                              format(date3, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className="w-auto p-0">
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={date3}
                            onSelect={(date3) => {
                              setDate3(date3); // Update the state with the new date
                              field.onChange(date3); // Update the form control with the new date
                              console.log("Date changed:", date3); // Log or track the date change
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
                  name="Dependent3Relation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relation</FormLabel>
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
                  name="Dependent3Sex"
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
              </div>
            </div>
          </div>

          <hr></hr>
          <div className="p-2">
            <h1 className="text-upcolor font-bold">Survey Questions</h1>
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
                        <Input
                          type="text"
                          {...field}
                          onChange={field.onChange}
                        />
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
                        <Input
                          type="text"
                          {...field}
                          onChange={field.onChange}
                        />
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
            <Button
              variant="up"
              type="submit"
              onClick={() => {
                router.back();
              }}
            >
              Save{" "}
              <AiOutlineLoading3Quarters
                className={cn("animate-spin", { hidden: !isPending })}
              />
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}