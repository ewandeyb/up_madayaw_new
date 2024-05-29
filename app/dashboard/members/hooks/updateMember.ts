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
  }
): Promise<string> {
  const new_uuid = crypto.randomUUID();
  const supabase = await createSupbaseServerClient();

  const updateMemberData = await supabase
    .from("MemberData")
    .update({
      MembershipID: new_uuid,
      FirstName: data.FirstName,
      MiddleName: data.MiddleName,
      LastName: data.LastName,
      Suffix: data.Suffix,
      CivilStatus: data.CivilStatus,
      Email: data.Email,
      Sex: data.Sex,
      BirthDate: data.BirthDate,
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
      AssocMemberID: new_uuid,
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
      AssocMemberID: new_uuid,
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
      AssocMemberID: new_uuid,
      IsMemberAddress: true,
      IsRelativeAddress: false,
      Line1: data.MemLine1,
      Barangay: data.MemBarangay,
      MunicipalityCity: data.MemMunicipalityCity,
      Province: data.MemProvince,
      ZipCode: data.MemZipCode,
    })
    .eq("AssocMemberID", MembershipID);

  if (updateMemberAddress.error?.message) {
    console.log(JSON.stringify(updateMemberAddress));
    return JSON.stringify(updateMemberAddress);
  }

  const updateRelativeAddress = await supabase
    .from("Addresses")
    .update({
      AssocMemberID: new_uuid,
      IsMemberAddress: false,
      IsRelativeAddress: true,
      Line1: data.RelativeLine1,
      Barangay: data.RelativeBarangay,
      MunicipalityCity: data.RelativeMunicipalityCity,
      Province: data.RelativeProvince,
      ZipCode: data.RelativeZipCode,
    })
    .eq("AssocMemberID", MembershipID);

  if (updateRelativeAddress.error?.message) {
    console.log(JSON.stringify(updateRelativeAddress));
    return JSON.stringify(updateRelativeAddress);
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
    const addDependent1 = await supabase
      .from("Dependents")
      .update({
        AssocMemberID: new_uuid,
        FirstName: data.Dependent1FirstName,
        MiddleName: data.Dependent1MiddleName,
        LastName: data.Dependent1LastName,
        Suffix: data.Dependent1Suffix,
        BirthDate: data.Dependent1BirthDate,
        Relationship: data.Dependent1Relation,
        Sex: data.Dependent1Sex,
      })
      .eq("AssocMemberID", MembershipID);

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
    const addDependent2 = await supabase
      .from("Dependents")
      .update({
        AssocMemberID: new_uuid,
        FirstName: data.Dependent2FirstName,
        MiddleName: data.Dependent2MiddleName,
        LastName: data.Dependent2LastName,
        Suffix: data.Dependent2Suffix,
        BirthDate: data.Dependent2BirthDate,
        Relationship: data.Dependent2Relation,
        Sex: data.Dependent2Sex,
      })
      .eq("AssocMemberID", MembershipID);

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
    const addDependent3 = await supabase
      .from("Dependents")
      .update({
        AssocMemberID: new_uuid,
        FirstName: data.Dependent3FirstName,
        MiddleName: data.Dependent3MiddleName,
        LastName: data.Dependent3LastName,
        Suffix: data.Dependent3Suffix,
        BirthDate: data.Dependent3BirthDate,
        Relationship: data.Dependent3Relation,
        Sex: data.Dependent3Sex,
      })
      .eq("AssocMemberID", MembershipID);

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

  const addSurveyData = await supabase
    .from("SurveyData")
    .update({
      AssocMemberID: new_uuid,
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
