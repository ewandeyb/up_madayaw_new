"use server";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { UUID } from "crypto";

export default async function readContact(MembershipID: UUID) {
  try {
    const supabase = await createSupbaseServerClient();
    const { data, error } = await supabase
      .from("ContactNumbers")
      .select(`*`)
      .eq("AssocMemberID", MembershipID)
      .single();

    return { data, error };
  } catch (error) {
    // Handle any errors that occur during the operation
    return { data: null, error };
  }
}
