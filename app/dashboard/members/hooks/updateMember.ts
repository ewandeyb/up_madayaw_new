"use server";

import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";
import { UUID } from "crypto";

function isUndefined(datum: string | Date | undefined) {
  return datum === undefined;
}

export async function updateMember(
  MembershipID: UUID,
  data: {
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
  }
): Promise<string> {
  const new_uuid = crypto.randomUUID();
  const supabase = await createSupbaseServerClient();
  const modifiedBirthDate =
    data.BirthDate instanceof Date
      ? new Date(data.BirthDate.getTime() + 24 * 60 * 60 * 1000)
      : undefined;

  const updateMemberData = await supabase
    .from("MemberData")
    .update({
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
    })
    .eq("MembershipID", MembershipID);

  if (updateMemberData.error?.message) {
    console.log(JSON.stringify(updateMemberData));
    return JSON.stringify(updateMemberData);
  }

  const updateContactNumber = await supabase
    .from("ContactNumbers")
    .update({
      ContactNumber: data.ContactNumber,
    })
    .eq("AssocMemberID", MembershipID);

  if (updateContactNumber.error?.message) {
    console.log(JSON.stringify(updateContactNumber));
    return JSON.stringify(updateContactNumber);
  }

  const updateOccupation = await supabase
    .from("Occupation")
    .update({
      PositionTitle: data.PositionTitle,
      OfficeTitle: data.OfficeTitle,
      NatureOfEmployment: data.NatureOfEmployment,
      YearsOfService: data.YearsOfService,
    })
    .eq("AssocMemberID", MembershipID);

  if (updateOccupation.error?.message) {
    console.log(JSON.stringify(updateOccupation));
    return JSON.stringify(updateOccupation);
  }

  const updateMemberAddress = await supabase
    .from("Addresses")
    .update({
      Line1: data.MemLine1,
      Barangay: data.MemBarangay,
      MunicipalityCity: data.MemMunicipalityCity,
      Province: data.MemProvince,
      ZipCode: data.MemZipCode,
    })
    .eq("AssocMemberID", MembershipID)
    .eq("IsMemberAddress", true)
    .eq("IsRelativeAddress", false);

  if (updateMemberAddress.error?.message) {
    console.log(JSON.stringify(updateMemberAddress));
    return JSON.stringify(updateMemberAddress);
  }

  const updateRelativeAddress = await supabase
    .from("Addresses")
    .update({
      Line1: data.RelativeLine1,
      Barangay: data.RelativeBarangay,
      MunicipalityCity: data.RelativeMunicipalityCity,
      Province: data.RelativeProvince,
      ZipCode: data.RelativeZipCode,
    })
    .eq("AssocMemberID", MembershipID)
    .eq("IsMemberAddress", false)
    .eq("IsRelativeAddress", true);

  function parseDependents(data: Record<string, any>): {
    id: number;
    FirstName: string;
    MiddleName?: string;
    LastName: string;
    Suffix?: string;
    BirthDate?: Date;
    Relationship: string;
    Sex: string;
  }[] {
    const dependents: {
      id: number;
      FirstName: string;
      MiddleName?: string;
      LastName: string;
      Suffix?: string;
      BirthDate?: Date;
      Relationship: string;
      Sex: string;
    }[] = [];

    let index = 1;
    while (data[`Dependent${index}FirstName`]) {
      const birthDate = data[`Dependent${index}BirthDate`];
      const modifiedBirthDate =
        birthDate instanceof Date
          ? new Date(birthDate.getTime() + 24 * 60 * 60 * 1000)
          : undefined;

      dependents.push({
        id: index,
        FirstName: data[`Dependent${index}FirstName`],
        MiddleName: data[`Dependent${index}MiddleName`],
        LastName: data[`Dependent${index}LastName`],
        Suffix: data[`Dependent${index}Suffix`],
        BirthDate: modifiedBirthDate,
        Relationship: data[`Dependent${index}Relationship`],
        Sex: data[`Dependent${index}Sex`],
      });

      index++;
    }

    return dependents;
  }

  // Parse dependents
  const dependents = parseDependents(data);
  console.log("Parsed dependents:", dependents);
  for (const dependent of dependents) {
    console.log("Fname", dependent.FirstName);
    const addDependent = await supabase
      .from("Dependents")
      .update({
        FirstName: dependent.FirstName,
        MiddleName: dependent.MiddleName,
        LastName: dependent.LastName,
        Suffix: dependent.Suffix,
        BirthDate: dependent.BirthDate,
        Relationship: dependent.Relationship,
        Sex: dependent.Sex,
      })
      .eq("AssocMemberID", MembershipID)
      .eq("OrderOfDependent", dependent.id);

    if (addDependent.error?.message) {
      console.log(JSON.stringify(addDependent));
      return JSON.stringify(addDependent);
    }
  }

  const addSurveyData = await supabase
    .from("SurveyData")
    .update({
      PrevMemberStatus: data.PrevMemberStatus,
      LeaveReason: data.LeaveReason,
      ReferralName: data.ReferralName,
    })
    .eq("AssocMemberID", MembershipID);

  if (addSurveyData.error?.message) {
    console.log(JSON.stringify(addSurveyData));
    return JSON.stringify(addSurveyData);
  }

  revalidatePath(`/dashboard/members/${MembershipID}/edit`);
  return JSON.stringify(updateMemberData);
}
