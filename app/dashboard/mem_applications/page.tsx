import { columns } from "./columns";
import { DataTable } from "./data-table";
import { createSupbaseServerClient } from "@/lib/supabase";
import { IPermission } from "@/lib/types";

async function getApplicationData(): Promise<IPermission[]> {
  const supabase = await createSupbaseServerClient();

  try {
    // Fetch data from the 'permissions' table with a join on 'MemberData'
    const { data, error } = await supabase
      .from("Permissions")
      .select(`*, MemberData (*)`); // Select all columns and nested MemberData

    if (error) {
      throw error; // Handle errors appropriately
    }

    return data as IPermission[]; // Type cast to your interface for type safety
  } catch (error) {
    console.error("Error fetching application data:", error);
    // Handle errors gracefully (e.g., display a generic error message)
    return []; // Return an empty array to prevent rendering issues
  }
}

const DemoPage = async () => {
  const data = await getApplicationData();

  return (
    <div className=" overflow-y-auto space-y-5 w-full">
      <h1 className="text-3xl font-bold">Members</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DemoPage;
