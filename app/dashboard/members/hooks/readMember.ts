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

    const addresses = await supabase
      .from("Addresses")
      .select("*")
      .eq("AssocMemberID", MembershipID)
      .order("IsMemberAddress", { ascending: false })
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

    // Return the fetched data
    return {
      memberData: memberData?.data,
      contactNumbers: contactNumbers?.data,
      occupation: occupation?.data,
      addresses: addresses?.data,
      dependents: dependents?.data,
      surveyData: surveyData?.data,
    };
  } catch (error) {
    console.error("Error fetching member data:", error);
    return null;
  }
}
