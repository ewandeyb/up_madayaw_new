"use server";
import { createSupbaseServerClient } from "@/lib/supabase";
import { UUID } from "crypto";

export default async function readSurvey(MembershipID: UUID) {
  try {
    const supabase = await createSupbaseServerClient();
    const { data, error } = await supabase
      .from("SurveyData")
      .select(`*`)
      .eq("AssocMemberID", MembershipID);

    if (error) {
      console.error("Error fetching survey Data:", error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error reading survey Data:", error);
    return { data: null, error };
  }
}
