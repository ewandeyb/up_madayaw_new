"use server";
import { createSupbaseServerClient } from "@/lib/supabase";
import { UUID } from "crypto";

export async function readMemberData(MembershipID: UUID): Promise<any> {
  try {
    const supabase = await createSupbaseServerClient();

    // Query the relevant tables to fetch member data based on MembershipID
    const memberData = await supabase
      .from("MemberData")
      .select("*")
      .eq("MembershipID", MembershipID)
      .single();

    const contactNumbers = await supabase
      .from("ContactNumbers")
      .select("*")
      .eq("AssocMemberID", MembershipID)
      .single();

    const occupation = await supabase
      .from("Occupation")
      .select("*")
      .eq("AssocMemberID", MembershipID)
      .single();

    const memberAddresses = await supabase
      .from("Addresses")
      .select("*")
      .eq("AssocMemberID", MembershipID)
      .eq("IsMemberAddress", true)
      .single();

    const relativeAddresses = await supabase
      .from("Addresses")
      .select("*")
      .eq("AssocMemberID", MembershipID)
      .eq("IsRelativeAddress", true)
      .single();

    const dependents = await supabase
      .from("Dependents")
      .select("*")
      .eq("AssocMemberID", MembershipID)
      .order("BirthDate", { ascending: true });

    const surveyData = await supabase
      .from("SurveyData")
      .select("*")
      .eq("AssocMemberID", MembershipID)
      .single();

    console.log(dependents);
    // Return the fetched data
    return {
      memberData: memberData?.data,
      contactNumbers: contactNumbers?.data,
      occupation: occupation?.data,
      memberAddresses: memberAddresses?.data,
      relativeAddresses: relativeAddresses?.data,
      dependents: dependents?.data,
      surveyData: surveyData?.data,
    };
  } catch (error) {
    console.error("Error fetching member data:", error);
    return null;
  }
}
