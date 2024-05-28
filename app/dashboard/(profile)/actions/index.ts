"use server";
import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";
import { createClient } from '@supabase/supabase-js';
import { IMemberData } from "@/lib/types";
import { getUser } from "@/utils/supabase/auth"; // Assuming you have an auth utility to get the logged-in user
import { useRouter } from 'next/router';

const supabase = createClient('https://hudheaqnruaponeloslj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1ZGhlYXFucnVhcG9uZWxvc2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MDM0MTQsImV4cCI6MjAzMDM3OTQxNH0.k1V6fGk48AiZWeoeAqkqC0MZEjcUxyjOv2eqxwhd48A');

export async function updateMemberBasicById(id: string, data: Partial<IMemberData>) {

  unstable_noStore(); //Cache

  const supabase = await createSupbaseServerClient()

  // Fetch the currently logged-in user
  const user = await getUser(supabase);

  const result = await supabase.from("MemberData").update(data).eq("MembershipID", user.id);
  revalidatePath("/dashboard");
  return JSON.stringify(result);
}

export async function readProfile() {

  unstable_noStore(); //Cache

  const supabase = await createSupbaseServerClient()

  // Fetch the currently logged-in user
  const user = await getUser(supabase);

  return await supabase
    .from("MemberData")
    .select("MembershipNo, FirstName, LastName, CivilStatus, BirthDate, Email, MemberType")
    .eq("MembershipID", user.id) // Assuming user_id is the foreign key in your table
    .single();
}