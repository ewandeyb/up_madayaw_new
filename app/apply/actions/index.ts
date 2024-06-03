"use server";

import { createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function createApplication(data: {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Suffix?: string;
  CivilStatus: string;
  Email: string;
  Sex: string;
  BirthDate?: Date;
  Birthplace: string;
  ContactNumber: string;

  SpouseFirstName?: string;
  SpouseMiddleName?: string;
  SpouseLastName?: string;
  SpouseSuffix?: string;
  SpouseOccupation?: string;

  PositionTitle: string;
  OfficeTitle: string;
  NatureOfEmployment: string;
  YearsOfService: number;

  MemLine1: string;
  MemBarangay: string;
  MemMunicipalityCity: string;
  MemProvince: string;
  MemZipCode: number;

  NearestRelativeFirstName: string;
  NearestRelativeLastName: string;

  RelativeLine1: string;
  RelativeBarangay: string;
  RelativeMunicipalityCity: string;
  RelativeProvince: string;
  RelativeZipCode: number;

  dependents: {
    id: number;
    FirstName: string;
    MiddleName?: string;
    LastName: string;
    Suffix?: string;
    BirthDate?: Date;
    Relationship: string;
    Sex: string;
  }[];

  PrevMemberStatus: string;
  LeaveReason?: string;
  ReferralName?: string;
}) {
  console.log("In Hook data:", data);
  const new_uuid = crypto.randomUUID();
  const supabase = await createSupbaseServerClient();
  const modifiedBirthDate =
    data.BirthDate instanceof Date
      ? new Date(data.BirthDate.getTime() + 24 * 60 * 60 * 1000)
      : undefined;

  const addMemberData = await supabase.from("MemberData").insert({
    MembershipID: new_uuid,
    MemberType: "PENDING",
    FirstName: data.FirstName,
    MiddleName: data.MiddleName,
    LastName: data.LastName,
    Suffix: data.Suffix,
    CivilStatus: data.CivilStatus,
    Email: data.Email,
    Sex: data.Sex,
    BirthDate: modifiedBirthDate,
    Birthplace: data.Birthplace,

    SpouseFirstName: data.SpouseFirstName,
    SpouseMiddleName: data.SpouseMiddleName,
    SpouseLastName: data.SpouseLastName,
    SpouseSuffix: data.SpouseSuffix,
    SpouseOccupation: data.SpouseOccupation,

    NearestRelativeFirstName: data.NearestRelativeFirstName,
    NearestRelativeLastName: data.NearestRelativeLastName,
  });

  const addContactNumber = await supabase.from("ContactNumbers").insert({
    AssocMemberID: new_uuid,
    ContactNumber: data.ContactNumber,
  });

  if (addContactNumber.error?.message) {
    console.log(JSON.stringify(addContactNumber));
    return JSON.stringify(addContactNumber);
  }

  const addOccupation = await supabase.from("Occupation").insert({
    AssocMemberID: new_uuid,
    PositionTitle: data.PositionTitle,
    OfficeTitle: data.OfficeTitle,
    NatureOfEmployment: data.NatureOfEmployment,
    YearsOfService: data.YearsOfService,
  });

  if (addOccupation.error?.message) {
    console.log(JSON.stringify(addOccupation));
    return JSON.stringify(addOccupation);
  }

  const addMemberAddress = await supabase.from("Addresses").insert({
    AssocMemberID: new_uuid,
    IsMemberAddress: true,
    IsRelativeAddress: false,
    Line1: data.MemLine1,
    Barangay: data.MemBarangay,
    MunicipalityCity: data.MemMunicipalityCity,
    Province: data.MemProvince,
    ZipCode: data.MemZipCode,
  });

  if (addMemberAddress.error?.message) {
    console.log(JSON.stringify(addMemberAddress));
    return JSON.stringify(addMemberAddress);
  }

  const addRelativeAddress = await supabase.from("Addresses").insert({
    AssocMemberID: new_uuid,
    IsMemberAddress: false,
    IsRelativeAddress: true,
    Line1: data.RelativeLine1,
    Barangay: data.RelativeBarangay,
    MunicipalityCity: data.RelativeMunicipalityCity,
    Province: data.RelativeProvince,
    ZipCode: data.RelativeZipCode,
  });

  if (addRelativeAddress.error?.message) {
    console.log(JSON.stringify(addRelativeAddress));
    return JSON.stringify(addRelativeAddress);
  }

  for (const dependent of data.dependents) {
    const addDependent = await supabase.from("Dependents").insert({
      AssocMemberID: new_uuid,
      FirstName: dependent.FirstName,
      MiddleName: dependent.MiddleName,
      LastName: dependent.LastName,
      Suffix: dependent.Suffix,
      BirthDate: dependent.BirthDate,
      Relationship: dependent.Relationship,
      Sex: dependent.Sex,
      OrderOfDependent: dependent.id,
    });

    if (addDependent.error?.message) {
      console.log(JSON.stringify(addDependent));
      return JSON.stringify(addDependent);
    }
  }

  const addSurveyData = await supabase.from("SurveyData").insert({
    AssocMemberID: new_uuid,
    PrevMemberStatus: data.PrevMemberStatus,
    LeaveReason: data.LeaveReason,
    ReferralName: data.ReferralName,
  });

  if (addSurveyData.error?.message) {
    console.log(JSON.stringify(addSurveyData));
    return JSON.stringify(addSurveyData);
  }

  revalidatePath("/apply");
}
