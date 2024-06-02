"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useFieldArray } from "react-hook-form";
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
  const [dates, setDates] = React.useState<Date[]>([]);
  const [dependent, setDependent] = useState([]); // Initialize dependent as an empty array

  const PrevMemberStatus = ["Yes", "No"];

  const form = useForm<ApplicationFormFields>({
    /*  resolver: zodResolver(ApplicationFormSchema), */ // So you can edit parts of the form and not all.
    defaultValues: {
      FirstName: "",
      MiddleName: "",
      LastName: "",
      Sex: "Male",
      Email: "",
      Birthplace: "",
      BirthDate: new Date("2020-02-02"),
      ContactNumber: "",
      Suffix: "",

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

      PrevMemberStatus: "",
      LeaveReason: "",
      ReferralName: "",
    },
  });
  const { fields } = useFieldArray({
    name: "dependents",
    control: form.control,
  });

  const { reset } = form;
  useEffect(() => {
    async function fetchData() {
      const response = await readMemberData(MembershipID as UUID);
      console.log("fetchData");
      console.log(response);
      console.log("Passing Response Dependents", response.dependents);
      setDependent(response.dependents);
      const dependentResetValues: Record<string, any> = {};
      response.dependents.forEach((dependent: any, index: number) => {
        dependentResetValues[`Dependent${index + 1}FirstName`] =
          dependent.FirstName;
        dependentResetValues[`Dependent${index + 1}MiddleName`] =
          dependent.MiddleName;
        dependentResetValues[`Dependent${index + 1}LastName`] =
          dependent.LastName;
        dependentResetValues[`Dependent${index + 1}Suffix`] = dependent.Suffix;
        dependentResetValues[`Dependent${index + 1}Relationship`] =
          dependent.Relationship;
        dependentResetValues[`Dependent${index + 1}BirthDate`] =
          dependent.BirthDate;
        dependentResetValues[`Dependent${index + 1}Sex`] = dependent.Sex;
      });
      console.log("Dependent Reset values", dependentResetValues);
      reset({
        //PERSONAL DATA
        FirstName: response.memberData.FirstName ?? "",
        MiddleName: response.memberData.MiddleName ?? "",
        LastName: response.memberData.LastName ?? "",
        CivilStatus: response.memberData.CivilStatus ?? "Single",
        Email: response.memberData.Email ?? "",
        Birthplace: response.memberData.Birthplace ?? "",
        ContactNumber: response.contactNumbers.ContactNumber ?? "",
        Sex: response.memberData.Sex ?? "Male",
        BirthDate: response.memberData.BirthDate ?? new Date("2020-04-20"),
        Suffix: response.memberData.Suffix ?? "",

        // SPOUSE DATA
        SpouseFirstName: response.memberData.SpouseFirstName,
        SpouseMiddleName: response.memberData.SpouseMiddleName,
        SpouseLastName: response.memberData.SpouseLastName,
        SpouseSuffix: response.memberData.SpouseSuffix,
        SpouseOccupation: response.memberData.SpouseOccupation,

        // MEMBER ADDRESS
        MemLine1: response.memberAddresses.Line1,
        MemBarangay: response.memberAddresses.Barangay,
        MemMunicipalityCity: response.memberAddresses.MunicipalityCity,
        MemProvince: response.memberAddresses.Province,
        MemZipCode: response.memberAddresses.ZipCode,

        // Relative Name (Member Data Table)
        NearestRelativeFirstName: response.memberData.NearestRelativeFirstName,
        NearestRelativeLastName: response.memberData.NearestRelativeLastName,

        // Relative Address
        RelativeLine1: response.relativeAddresses.Line1,
        RelativeBarangay: response.relativeAddresses.Barangay,
        RelativeMunicipalityCity: response.relativeAddresses.MunicipalityCity,
        RelativeProvince: response.relativeAddresses.Province,
        RelativeZipCode: response.relativeAddresses.ZipCode,

        // Occupation
        PositionTitle: response.occupation.PositionTitle,
        NatureOfEmployment: response.occupation.NatureOfEmployment,
        OfficeTitle: response.occupation.OfficeTitle,
        YearsOfService: response.occupation.YearsOfService,

        // Dependents
        ...dependentResetValues,

        // Survey Data
        PrevMemberStatus: response.surveyData.PrevMemberStatus,
        LeaveReason: response.surveyData.LeaveReason,
        ReferralName: response.surveyData.ReferralName,
      });
    }
    fetchData();
  }, [MembershipID, reset]);

  function onSubmit(data: ApplicationFormFields) {
    console.log("Edit Data", data);
    startTransition(async () => {
      const result = await updateMember(MembershipID as UUID, data);
      console.log("Results", result);
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
                      {...field}
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
                      {...field}
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
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start" className="w-auto p-0">
                        <Calendar
                          {...field} // Spread the field props to ensure value and onChange are managed correctly
                          mode="single"
                          captionLayout="dropdown-buttons"
                          onSelect={(date) => {
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

          {dependent.map((dependent: any, index: number) => (
            <div key={index}>
              <hr className="mt-5 mb-5"></hr>
              <h3 className="mb-5 font-bold">Dependent {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-7 gap-2">
                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name={
                      `Dependent${
                        index + 1
                      }FirstName` as `dependents.${number}.FirstName`
                    }
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
                    name={
                      `Dependent${
                        index + 1
                      }MiddleName` as `dependents.${number}.FirstName`
                    }
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
                    name={
                      `Dependent${
                        index + 1
                      }LastName` as `dependents.${number}.LastName`
                    }
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
                    name={
                      `Dependent${
                        index + 1
                      }Suffix` as `dependents.${number}.Suffix`
                    }
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
                    name={
                      `Dependent${
                        index + 1
                      }BirthDate` as `dependents.${number}.BirthDate`
                    }
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
                                  newDates[index + 1] = date; // Update the date at the current index if date is defined
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
                    name={
                      `Dependent${
                        index + 1
                      }Relationship` as `dependents.${number}.Relationship`
                    }
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
                    name={
                      `Dependent${index + 1}Sex` as `dependents.${number}.Sex`
                    }
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
              </div>
            </div>
          ))}

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
                        {...field}
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
