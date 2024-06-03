"use server";
import { readUserSession } from "@/lib/actions";
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";
import { UUID } from "crypto";

export async function elevateMember(data: {
  MembershipID: string;
  Status: string;
  Role: string;
  Email: string;
  password: string;
  confirm: string;
}) {
  const supabase = await createSupabaseAdmin();
  console.log("reached here!");

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
  // Value of oldmembership id before elevated to actual member
  const old_membershipID = data.MembershipID;

  if (createResult.error?.message) {
    return JSON.stringify(createResult);
  } else {
    const updateID = await supabase
      .from("MemberData")
      .update({ MembershipID: createResult.data.user?.id })
      .eq("MembershipID", data.MembershipID);

    if (updateID.error?.message) {
      return JSON.stringify(updateID);
    } else {
      const permissionsID = createResult.data.user?.id;
      console.log("PermissionsID:", permissionsID);
      // Insert into Permissions table
      const permissionResult = await supabase.from("Permissions").insert({
        Role: data.Role, // Assuming Status is used as Role here
        Status: data.Status, // Assuming Status is used as Role here
        PermissionsID: permissionsID, // Reference MembershipID
      });

      if (permissionResult.error) {
        console.error(
          "Error inserting into Permissions:",
          permissionResult.error.message
        );
        return JSON.stringify({ error: permissionResult.error.message });
      } else {
        console.log("Permission inserted successfully:", permissionResult.data);
      }

      const { data: occupationData, error } = await supabase
        .from("Occupation")
        .select("NatureOfEmployment")
        .eq("AssocMemberID", createResult.data.user?.id);

      if (error) {
        console.error("Error fetching member type:", error.message);
        return; // Handle the error appropriately
      }

      let memberType = ""; // Initialize memberType variable

      if (occupationData && occupationData.length > 0) {
        // Check if occupationData is not empty and has at least one item
        memberType = occupationData[0]?.NatureOfEmployment || ""; // Extract the NatureOfEmployment
      } else {
        console.error(
          "Member type not found for MembershipID:",
          createResult.data.user?.id
        );
        return; // Handle the case where member type is not found
      }

      const result = await supabase
        .from("MemberData")
        .update({ MemberType: memberType })
        .eq("MembershipID", createResult.data.user?.id);

      if (result.error) {
        return JSON.stringify({ error: result.error.message });
      }

      // Revalidate the path
      await revalidatePath("/dashboard/member");
      return JSON.stringify({
        success: true,
        permissionResult: permissionResult.data,
      });
    }
  }
}

export async function createMember(data: {
  FirstName: string;
  Role: string;
  Status: string;
  Email: string;
  password: string;
  confirm: string;
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
    const memberResult = await supabase.from("MemberData").insert({
      FirstName: data.FirstName,
      MembershipID: createResult.data.user?.id,
      Email: data.Email,
    });
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

export async function updateMemberBasicById(
  id: string,
  data: {
    FirstName: string;
  }
) {
  console.log("hello");
  const supabase = await createSupbaseServerClient();

  const result = await supabase
    .from("MemberData")
    .update(data)
    .eq("MembershipID", id);
  revalidatePath("/dashboard/members");
  return JSON.stringify(result);
}

export async function deleteMemberById(user_id: UUID) {
  const { data: userSession } = await readUserSession();

  if (userSession.session?.user.user_metadata.Role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to access this!" },
    });
  }

  // delete account
  const supabaseAdmin = await createSupabaseAdmin();

  const deleteResult = await supabaseAdmin.auth.admin.deleteUser(user_id); // Says cannot find user

  console.log("delete result: ", deleteResult);
  if (deleteResult.error?.message) {
    console.log("aha!");
    return JSON.stringify(deleteResult);
  } else {
    // Delete member from MemberData table
    //const supabase = await createSupbaseServerClient();
    console.log(user_id);
    const { data: memberResult, error } = await supabaseAdmin
      .from("MemberData")
      .delete()
      .eq("MembershipID", user_id);

    if (error) {
      console.log("Error deleting member:", error.message);
      return JSON.stringify({ error: error.message });
    } else {
      console.log("Successfully Deleted Member");
      revalidatePath("/dashboard/members");
      return JSON.stringify(memberResult);
    }
  }
}

export async function deleteMemberApplicationByID(user_id: UUID) {
  const { data: userSession } = await readUserSession();

  if (userSession.session?.user.user_metadata.Role !== "admin") {
    return JSON.stringify({
      error: { message: "You are not allowed to access this!" },
    });
  }

  const supabase = await createSupbaseServerClient();
  console.log("User ID to delete:", user_id);

  // Log the data before deletion for verification
  const { data: existingMember, error: fetchError } = await supabase
    .from("MemberData")
    .select("*")
    .eq("MembershipID", user_id)
    .single();

  if (fetchError) {
    console.log("Error fetching member data:", fetchError.message);
    return JSON.stringify({ error: fetchError.message });
  }

  console.log("Member data to be deleted:", existingMember);

  const { data: memberResult, error: deleteError } = await supabase
    .from("MemberData")
    .delete()
    .eq("MembershipID", user_id);

  if (deleteError) {
    console.log("Error deleting member application:", deleteError.message);
    return JSON.stringify({ error: deleteError.message });
  } else {
    console.log("Successfully Deleted Member Application");
    revalidatePath("/dashboard/member_applications");
    return JSON.stringify(memberResult);
  }
}

export async function readMembers() {
  unstable_noStore(); //Cache

  const supabase = await createSupbaseServerClient();

  return await supabase.from("Permissions").select("*,MemberData(*)");
}
