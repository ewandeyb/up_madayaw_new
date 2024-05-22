"use server";

import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

function isUndefined(datum: string | Date | undefined) {
  return datum === undefined;
}

export async function createApplication(data: {
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Suffix?: string;
  CivilStatus: string;
  Email: string;
  Sex: string;
  BirthDate?: Date;
  BirthPlace: string;

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

  Dependent1FirstName?: string;
  Dependent1MiddleName?: string;
  Dependent1LastName?: string;
  Dependent1Suffix?: string;
  Dependent1BirthDate?: Date;
  Dependent1Relation?: string;
  Dependent1Sex?: string;

  Dependent2FirstName?: string;
  Dependent2MiddleName?: string;
  Dependent2LastName?: string;
  Dependent2Suffix?: string;
  Dependent2BirthDate?: Date;
  Dependent2Relation?: string;
  Dependent2Sex?: string;

  Dependent3FirstName?: string;
  Dependent3MiddleName?: string;
  Dependent3LastName?: string;
  Dependent3Suffix?: string;
  Dependent3BirthDate?: Date;
  Dependent3Relation?: string;
  Dependent3Sex?: string;

  PrevMemberStatus: string;
  LeaveReason?: string;
  ReferralName?: string;
}): Promise<string> {
  const new_uuid = crypto.randomUUID();
  const supabase = await createSupbaseServerClient();
  // modification? may or may not work.
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
    BirthDate: data.BirthDate,
    Birthplace: data.BirthPlace,

    SpouseFirstName: data.SpouseFirstName,
    SpouseMiddleName: data.SpouseMiddleName,
    SpouseLastName: data.SpouseLastName,
    SpouseSuffix: data.SpouseSuffix,
    SpouseOccupation: data.SpouseOccupation,

    NearestRelativeFirstName: data.NearestRelativeFirstName,
    NearestRelativeLastName: data.NearestRelativeLastName,
  });

  if (addMemberData.error?.message) {
    console.log(JSON.stringify(addMemberData));
    return JSON.stringify(addMemberData);
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

  const DependentData1 = [
    data.Dependent1FirstName,
    data.Dependent1MiddleName,
    data.Dependent1LastName,
    data.Dependent1BirthDate,
    data.Dependent1Relation,
    data.Dependent1Sex,
  ];
  if (!DependentData1.some(isUndefined)) {
    const addDependent1 = await supabase.from("Dependents").insert({
      AssocMemberID: new_uuid,
      FirstName: data.Dependent1FirstName,
      MiddleName: data.Dependent1MiddleName,
      LastName: data.Dependent1LastName,
      Suffix: data.Dependent1Suffix,
      BirthDate: data.Dependent1BirthDate,
      Relationship: data.Dependent1Relation,
      Sex: data.Dependent1Sex,
    });

    if (addDependent1.error?.message) {
      console.log(JSON.stringify(addDependent1));
      return JSON.stringify(addDependent1);
    }
  }

  const DependentData2 = [
    data.Dependent2FirstName,
    data.Dependent2MiddleName,
    data.Dependent2LastName,
    data.Dependent2BirthDate,
    data.Dependent2Relation,
    data.Dependent2Sex,
  ];
  if (!DependentData2.some(isUndefined)) {
    const addDependent2 = await supabase.from("Dependents").insert({
      AssocMemberID: new_uuid,
      FirstName: data.Dependent2FirstName,
      MiddleName: data.Dependent2MiddleName,
      LastName: data.Dependent2LastName,
      Suffix: data.Dependent2Suffix,
      BirthDate: data.Dependent2BirthDate,
      Relationship: data.Dependent2Relation,
      Sex: data.Dependent2Sex,
    });

    if (addDependent2.error?.message) {
      console.log(JSON.stringify(addDependent2));
      return JSON.stringify(addDependent2);
    }
  }

  const DependentData3 = [
    data.Dependent3FirstName,
    data.Dependent3MiddleName,
    data.Dependent3LastName,
    data.Dependent3BirthDate,
    data.Dependent3Relation,
    data.Dependent3Sex,
  ];
  if (!DependentData3.some(isUndefined)) {
    const addDependent3 = await supabase.from("Dependents").insert({
      AssocMemberID: new_uuid,
      FirstName: data.Dependent3FirstName,
      MiddleName: data.Dependent3MiddleName,
      LastName: data.Dependent3LastName,
      Suffix: data.Dependent3Suffix,
      BirthDate: data.Dependent3BirthDate,
      Relationship: data.Dependent3Relation,
      Sex: data.Dependent3Sex,
    });

    if (addDependent3.error?.message) {
      console.log(JSON.stringify(addDependent3));
      return JSON.stringify(addDependent3);
    }
  }

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
    ReferralName: data.ReferralName,
  });

  if (addSurveyData.error?.message) {
    console.log(JSON.stringify(addSurveyData));
    return JSON.stringify(addSurveyData);
  }

  revalidatePath("/apply");
  return JSON.stringify(addMemberData);
}

/* CODE BELOW NOT UPDATED */

export async function updateMemberBasicById(
  id: string,
  data: {
    name: string;
  }
) {
  const supabase = await createSupbaseServerClient();

  const result = await supabase.from("members").update(data).eq("id", id);
  revalidatePath("/dashboard/members");
  return JSON.stringify(result);
}

export async function readMembers() {
  unstable_noStore(); //Cache

  const supbase = await createSupbaseServerClient();

  return await supbase.from("Permissions").select("*,MemberData(*)");
}
