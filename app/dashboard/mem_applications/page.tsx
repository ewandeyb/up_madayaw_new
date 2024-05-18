import { readUserSession } from "@/lib/actions";
import { Applications, columns } from "./columns"
import { DataTable } from "./data-table"
import { createSupabaseAdmin, createSupbaseServerClient } from "@/lib/supabase";
import { revalidatePath, unstable_noStore } from "next/cache";
import { createClient } from "@supabase/supabase-js";

async function getApplicationData(): Promise<Applications[]> {
  
  const supabase = await createSupbaseServerClient();
  const { data: permissions, error: permissionsError } = await supabase
  .from('Permissions')
  .select(`
    "Role",
    "Status",
    "PermissionsID"
  `);

if (permissionsError) {
  console.error('Error fetching permissions data:', permissionsError.message);
  return [];
}

const { data: memberData, error: memberDataError } = await supabase
  .from('MemberData')
  .select(`
    "MembershipID",
    "FirstName",
    "LastName",
    "Email",
    "MemberType"
  `);

if (memberDataError) {
  console.error('Error fetching member data:', memberDataError.message);
  return [];
}

// Perform the join programmatically
const joinedData = permissions.map(permission => {
  const matchingMember = memberData.find(member => member.MembershipID === permission.PermissionsID);
  return {
    MembershipID: matchingMember?.MembershipID || '', // Ensure MembershipID is present
    FirstName: matchingMember?.FirstName || '',       // Ensure FirstName is present
    LastName: matchingMember?.LastName || '',         // Ensure LastName is present
    Email: matchingMember?.Email || '',               // Ensure Email is present
    MemberType: matchingMember?.MemberType || '',     // Ensure MemberType is present
    Role: permission.Role,
    Status: permission.Status,
    PermissionsID: permission.PermissionsID
  };
});

console.log('Applications:', joinedData);
revalidatePath("/dashboard/mem_applications")
return joinedData;
}

export default async function DemoPage() {
  const data = await getApplicationData()
  
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
