import { columns } from "./columns";
import { DataTable } from "./data-table";
import { createSupbaseServerClient } from "@/lib/supabase";
import DeleteMember from "../members/components/DeleteMember";
import { Delete } from "lucide-react";
import { IPermission } from "@/lib/types";
import { data1 } from "@/app/apply/components/schema";
async function getApplicationData(): Promise<data1[]> {
  const supabase = await createSupbaseServerClient();

  try {
    // Fetch data from the 'permissions' table with a join on 'MemberData'
    const { data, error } = await supabase.from("MemberData").select(`*`); // Select all columns and nested MemberData

    if (error) {
      throw error; // Handle errors appropriately
    }

    return data as data1[]; // Type cast to your interface for type safety
  } catch (error) {
    console.error("Error fetching application data:", error);
    // Handle errors gracefully (e.g., display a generic error message)
    return []; // Return an empty array to prevent rendering issues
  }
}

const DemoPage = async () => {
  const data = await getApplicationData();

  return (
    <div className="overflow-y-auto space-y-5 w-full max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold">Member Applications</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DemoPage;
