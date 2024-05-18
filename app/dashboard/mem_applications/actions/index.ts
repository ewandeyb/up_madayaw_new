"use server";
import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";

export async function createApplication(data: {
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
      Email : data.Email,
    },
  });

  if (createResult.error?.message) {
    return JSON.stringify(createResult);
  } else {
    const memberResult = await supabase
      .from("MemberData")
      .insert({ FirstName: data.FirstName, MembershipID: createResult.data.user?.id, Email: data.Email});
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