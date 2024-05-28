"use server";
import { createSupbaseServerClient } from "@/lib/supabase";
import { UUID } from "crypto";

export default async function readAddress(MembershipID: UUID) {
  try {
    const supabase = await createSupbaseServerClient();
    const { data, error } = await supabase
      .from("Addresses")
      .select(`*`)
      .eq("AssocMemberID", MembershipID);

    if (error) {
      console.error("Error fetching addresses:", error.message);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error reading addresses:", error);
    return { data: null, error };
  }
}
