"use server";

import { createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

type string_nul = string | undefined ;
export async function createApplication(data: {
  FirstName: string,
  MiddleName: string,
  LastName: string,
  Suffix: string,
  CivilStatus: string,
  Email: string,
  Sex: string,
  BirthDate: Date,
  BirthPlace: string,

  SpouseFirstName: undefined | string,
  SpouseMiddleName: string,
  SpouseLastName: string,
  SpouseSuffix: string,
  SpouseOccupation: string,

  PositionTitle: string,
  OfficeTitle: string,
  NatureOfEmployment: string,
  YearsOfService: number,

  MemLine1: string,
  MemBarangay: string,
  MemMunicipalityCity: string,
  MemProvince: string,
  MemZipCode: number,

  NearestRelativeFirstName: string,
  NearestRelativeLastName: string,

  RelativeLine1: string,
  RelativeBarangay: string,
  RelativeMunicipalityCity: string,
  RelativeProvince: string,
  RelativeZipCode: number,

  Dependent1FirstName: string,
  Dependent1MiddleName: string,
  Dependent1LastName: string,
  Dependent1Suffix: string,
  Dependent1BirthDate: Date,
  Dependent1Relation: string,
  Dependent1Sex: string,

  Dependent2FirstName: string,
  Dependent2MiddleName: string,
  Dependent2LastName: string,
  Dependent2Suffix: string,
  Dependent2BirthDate: Date,
  Dependent2Relation: string,
  Dependent2Sex: string,

  Dependent3FirstName: string,
  Dependent3MiddleName: string,
  Dependent3LastName: string,
  Dependent3Suffix: string,
  Dependent3BirthDate: Date,
  Dependent3Relation: string,
  Dependent3Sex: string,

  PrevMemberStatus: string,
  LeaveReason: string,
  ReferralName: string
}): Promise<string> {

  const FirstName =  data.FirstName != undefined ? data.FirstName : null;

  const new_uuid = crypto.randomUUID();
  const supabase = await createSupbaseServerClient();
  // modification? may or may not work.
  const addMemberData = await supabase.from("MemberData").insert({
      MembershipID: new_uuid,
      MemberType: "PENDING",
      FirstName: FirstName !== undefined ? data.FirstName : null,
      MiddleName: data.MiddleName,
      LastName: data.LastName,
      Suffix: data.Suffix,
      CivilStatus: data.CivilStatus,
      Email: data.Email,
      Sex: data.Sex,
      BirthDate: data.BirthDate,
      Birthplace: data.BirthPlace,

      SpouseFirstName: data.SpouseFirstName,
      SpouseMiddleName: data.SpouseMiddleName,
      SpouseLastName: data.SpouseLastName,
      SpouseSuffix: data.SpouseSuffix,
      SpouseOccupation: data.SpouseOccupation,

      NearestRelativeFirstName: data.NearestRelativeFirstName,
      NearestRelativeLastName: data.NearestRelativeLastName
  });

  const addOccupation = await supabase.from("Occupation").insert({
    AssocMemberID: new_uuid,
    PositionTitle:data.PositionTitle,
    OfficeTitle: data.OfficeTitle,
    NatureOfEmployment: data.NatureOfEmployment,
    YearsOfService: data.YearsOfService
});

  const addMemberAddress = await supabase.from("Addresses").insert({
    AssocMemberID: new_uuid,
    IsMemberAddress: true,
    IsRelativeAddress: false,
    Line1: data.MemLine1,
    Barangay: data.MemBarangay,
    MunicipalityCity: data.MemMunicipalityCity,
    Provice: data.MemProvince,
    ZipCode: data.MemZipCode
  });

  const addRelativeAddress = await supabase.from("Addresses").insert({
    AssocMemberID: new_uuid,
    IsMemberAddress: false,
    IsRelativeAddress: true,
    Line1: data.RelativeLine1,
    Barangay: data.RelativeBarangay,
    MunicipalityCity: data.RelativeMunicipalityCity,
    Provice: data.RelativeProvince,
    ZipCode: data.RelativeZipCode
  });

  //Dependent1FirstName: string,
  //Dependent1MiddleName: string,
  //Dependent1LastName: string,
  //Dependent1Suffix: string,
  //Dependent1BirthDate: Date,
  //Dependent1Relation: string,
  //Dependent1Sex: string,'

  const addSurveyData = await supabase.from("SurveyData").insert({
    AssocMemberID: new_uuid,
    PrevMemberStatus: data.PrevMemberStatus,
    LeaveReason: data.LeaveReason,
    ReferralName: data.ReferralName
  });

  if (addMemberData.error?.message) {
    return JSON.stringify(addMemberData);
  } else {
    revalidatePath("/apply");
    return JSON.stringify(addMemberData);
  }

  if (addOccupation.error?.message) {
    return JSON.stringify(addOccupation);
  } else {
    revalidatePath("/apply");
    return JSON.stringify(addOccupation);
  }
}

/* CODE BELOW NOT UPDATED */

export async function updateMemberBasicById(
  id: string,
  data: {
    name: string;
  }
) {

  const supabase = await createSupbaseServerClient();

  const result = await supabase.from("members").update(data).eq("id", id)
  revalidatePath("/dashboard/members")
  return JSON.stringify(result)

}

export async function readMembers() {

  unstable_noStore(); //Cache

  const supbase = await createSupbaseServerClient()

  return await supbase.from("permissions").select("*,members(*)");
}
