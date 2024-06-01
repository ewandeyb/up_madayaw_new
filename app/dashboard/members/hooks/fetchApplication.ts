"use server";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { UUID } from "crypto";

export default async function readApplication(ApplicationID: UUID) {
  try {
    const supabase = await createSupbaseServerClient();
    const { data, error } = await supabase
      .from("MemberData")
      .select(`*`)
      .eq("MembershipID", ApplicationID)
      .single();

    return { data, error };
  } catch (error) {
    // Handle any errors that occur during the operation
    return { data: null, error };
  }
}
