"use server";
import { createSupbaseServerClient } from "@/lib/supabase";
import { UUID } from "crypto";

export default async function readOccupation(MembershipID: UUID) {
  try {
    const supabase = await createSupbaseServerClient();
    const { data, error } = await supabase
      .from("Occupation")
      .select(`*`)
      .eq("AssocMemberID", MembershipID);

    if (error) {
      console.error("Error fetching occupation:", error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error reading occupation:", error);
    return { data: null, error };
  }
}
