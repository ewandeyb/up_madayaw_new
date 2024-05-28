"use server";
import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";
import { createClient } from '@supabase/supabase-js';
import { IMemberData } from "@/lib/types";
import { getUser } from "@/utils/supabase/auth"; // Assuming you have an auth utility to get the logged-in user

export async function createMember(data: {
  /*MembershipNo: string,
  MemberType: string,
  MiddleName: string,
  LastName: string,
  Suffix: string,
  Sex: string,
  BirthDate: string,
  Birthplace: string,
  SpouseFirstName: string,
  SpouseMiddleName: string,
  SpouseLastName: string,
  SpouseSuffix: string,
  SpouseOccupation: string,
  NearestRelativeFirstName: string,
  NearestRelativeLastName: string, */

  FirstName: string,
  Role: string,
  Status: string,
  Email: string,
  password: string,
  confirm: string,
}) {
  //Prevent User from accessing admin stuff
  const { data: userSession } = await readUserSession();

  if (userSession.session?.user.user_metadata.Role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to access this!" },
    });
  }

  const supabase = await createSupabaseAdmin();
  // create account

  const createResult = await supabase.auth.admin.createUser({
    email: data.Email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      Role: data.Role,
      Status: data.Status,
      Email: data.Email,
    },
  });

  if (createResult.error?.message) {
    return JSON.stringify(createResult);
  } else {
    const memberResult = await supabase
      .from("MemberData")
      .insert({ FirstName: data.FirstName, MembershipID: createResult.data.user?.id, Email: data.Email });
    if (memberResult.error?.message) {
      return JSON.stringify(memberResult);
    } else {
      const permissionResult = await supabase.from("Permissions").insert({
        Role: data.Role,
        PermissionsID: createResult.data.user?.id,
        Status: data.Status,
      });
      revalidatePath("/dashboard/member");
      return JSON.stringify(permissionResult);
    }
  }

}

const supabase = createClient('https://hudheaqnruaponeloslj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1ZGhlYXFucnVhcG9uZWxvc2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4MDM0MTQsImV4cCI6MjAzMDM3OTQxNH0.k1V6fGk48AiZWeoeAqkqC0MZEjcUxyjOv2eqxwhd48A');

export async function updateMemberBasicById(MembershipID: string, data: Partial<IMemberData>) {

  const { error } = await supabase
    .from("MemberData")
    .update(data)
    .eq("MembershipID", MembershipID);

  return JSON.stringify({ error });
}

export async function deleteMemberById(user_id: string) {

  const { data: userSession } = await readUserSession();

  if (userSession.session?.user.user_metadata.Role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to access this!" },
    });
  }

  // delete account
  const supabaseAdmin = await createSupabaseAdmin();

  const deleteResult = await supabaseAdmin.auth.admin.deleteUser(user_id);

  if (deleteResult.error?.message) {

    return JSON.stringify(deleteResult);
  } else {
    const supbase = await createSupbaseServerClient();

    const result = await supbase.from("MemberData").delete().eq("MembershipID", user_id);
    revalidatePath("/dashboard/members");
    console.log(result);
    return JSON.stringify(result);
  }
}

export async function readMembers() {

  unstable_noStore(); //Cache

  const supabase = await createSupbaseServerClient()

  return await supabase.from("Permissions").select("*,MemberData(*)");
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

