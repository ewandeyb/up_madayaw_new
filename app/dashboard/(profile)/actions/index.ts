"use server";
import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { IMemberData } from "@/lib/types";
import { getUser } from "@/utils/supabase/auth"; // Assuming you have an auth utility to get the logged-in user
import exp from "constants";
import { string } from "zod";

const supabase = createClient(
  "https://hudheaqnruaponeloslj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1ZGhlYXFucnVhcG9uZWxvc2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MDM0MTQsImV4cCI6MjAzMDM3OTQxNH0.k1V6fGk48AiZWeoeAqkqC0MZEjcUxyjOv2eqxwhd48A"
);

export async function updateMemberBasicByEmail(
  email: string,
  data: Partial<IMemberData>
) {
  unstable_noStore(); //Cache

  const supabase = await createSupbaseServerClient();

  // Fetch the currently logged-in user
  const user = await getUser(supabase);

  const result = await supabase
    .from("MemberData")
    .update(data)
    .eq("Email", user.email);
  revalidatePath("/dashboard");
  return JSON.stringify(result);
}

export async function readProfile() {
  unstable_noStore(); //Cache

  const supabase = await createSupbaseServerClient();

  // Fetch the currently logged-in user
  const user = await getUser(supabase);

  return await supabase
    .from("MemberData")
    .select(
      "MembershipNo, FirstName, LastName, CivilStatus, BirthDate, Email, MemberType"
    )
    .eq("MembershipID", user.id) // Assuming user_id is the foreign key in your table
    .single();
}

export async function updateUserPassword(
  email: string,
  pass_data: {
    PreviousPassword?: string;
    NewPassword: string;
    ConfirmPassword: string;
  }
) {
  unstable_noStore(); // Cache

  if (pass_data.NewPassword === pass_data.ConfirmPassword) {
    const supabase = await createSupbaseServerClient();

    // Fetch the currently logged-in user
    const user = await getUser(supabase);
    console.log(user.id);

    const updatePassword = await supabase.auth.updateUser({
      password: pass_data.NewPassword,
    });

    if (updatePassword.error?.message) {
      console.log(JSON.stringify(updatePassword));
      return JSON.stringify(updatePassword);
    }

    revalidatePath("");
    const { error } = await supabase.auth.signOut();
    return JSON.stringify(updatePassword);
  } else {
    return '{"error": {"message": "Passwords do not match."}}';
  }
}
