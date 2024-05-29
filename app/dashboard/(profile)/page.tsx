import React from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/auth"; // Assuming you have an auth utility to get the logged-in user

import pfp from "@/components/img/main-thumb-51062368-200-pnohclmjfcyvsrzdzwdzejscgiotevdv.jpeg";
import civil from "@/components/img/4219711.png";
import birth from "@/components/img/8926835.png";
import email from "@/components/img/8743964.png";
import memtype from "@/components/img/5455787.png";
import position from "@/components/img/6214076.png";
import office from "@/components/img/4924628.png";
import loan from "@/components/img/9903593.png";
import amount from "@/components/img/5329260.png";
import payment from "@/components/img/4108843.png";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/store/user";

export default async function Profile() {
  const supabase = createClient();

  // Fetch the currently logged-in user
  const user = await getUser(supabase);
  const current_user = useUserStore.getState().user;

  const isAdmin = user?.user_metadata.Role === "admin";
  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }
  console.log("hello profile!");
  console.log(user);
  // Query to get the user-specific data
  const { data: MemberData, error } = await supabase
    .from("MemberData")
    .select(
      "MembershipNo, FirstName, LastName, CivilStatus, BirthDate, Email, MemberType"
    )
    .eq("Email", user.email) // Assuming user_id is the foreign key in your table
    .single();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Check if both FirstName and LastName are null
  const fullName =
    MemberData.FirstName || MemberData.LastName
      ? `${MemberData.FirstName ?? " "} ${MemberData.LastName ?? " "}`
      : "NULL";

  return (
    <section className="w-full p-10 px-4 lg:px-8">
      <Button className="float-right" variant="secondary">
        Edit{" "}
      </Button>
      <div className="flex flex-col lg:flex-row items-center justify-start gap-4 lg:gap-6 text-left">
        <div className="inline-block rounded-lg px-3 py-1 text-sm">
          <Image
            alt="Profile Picture"
            className="overflow-hidden rounded-xl object-cover lg:order-last"
            height="150"
            src={pfp}
            width="150"
          />
        </div>
        <div className="space-y-2">
          <h2 className="mt-2 text-3xl font-bold tracking-tighter text-center md:text-center lg:text-left sm:text-4xl">
            {fullName}
          </h2>
          <p className="max-w-[900px] text-gray-500 tracking-tighter text-center md:text-center lg:text-left md:text-xl lg:text-base xl:text-xl dark:text-gray-400">
            Membership Number: {MemberData.MembershipNo ?? "NULL"}
          </p>
        </div>
      </div>
      <hr className="h-px my-6 bg-black border-0 dark:bg-white"></hr>
      <div className="flex justify-center">
        <div className="flex flex-col lg:flex-row justify-between w-full max-w-5xl gap-6">
          <div className="max-w-[600px] mx-auto">
            <div className="flex flex-col justify-center space-y-4 border-2 border-black dark:border-white bg-white dark:bg-black rounded-xl p-10">
              <ul className="grid gap-6">
                <li className="mb-6">
                  <div className="grid gap-6">
                    <h3 className="text-3xl font-bold text-upcolor dark:text-white">
                      Personal Information
                    </h3>
                    <div className="flex items-center">
                      <Image
                        alt="Civil Status"
                        className="overflow-hidden rounded-xl object-cover"
                        height="60"
                        src={civil}
                        width="60"
                      />
                      <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                        Civil Status:{" "}
                        <span className="font-semibold">
                          {MemberData.CivilStatus ?? "NULL"}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Image
                        alt="Date of Birth"
                        className="overflow-hidden rounded-xl object-cover"
                        height="60"
                        src={birth}
                        width="60"
                      />
                      <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                        Date of Birth:{" "}
                        <span className="font-semibold">
                          {MemberData.BirthDate ?? "NULL"}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mb-6">
                  <div className="grid gap-6">
                    <h3 className="text-3xl font-bold text-upcolor dark:text-white">
                      Contact Information
                    </h3>
                    <div className="flex items-center">
                      <Image
                        alt="Date of Birth"
                        className="overflow-hidden rounded-xl object-cover"
                        height="60"
                        src={email}
                        width="60"
                      />
                      <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                        Email :{" "}
                        <span className="font-semibold">
                          {MemberData.Email ?? "NULL"}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mb-6">
                  <div className="grid gap-6">
                    <h3 className="text-3xl font-bold text-upcolor dark:text-white">
                      Membership Details
                    </h3>
                    <div className="flex items-center">
                      <Image
                        alt="Membership Type"
                        className="overflow-hidden rounded-xl object-cover"
                        height="60"
                        src={memtype}
                        width="60"
                      />
                      <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                        MemberType:{" "}
                        <span className="font-semibold">
                          {MemberData.MemberType ?? "NULL"}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-[600px] mx-auto">
            <div className="flex flex-col justify-center space-y-4 border-2 border-black dark:border-white bg-white dark:bg-black rounded-xl p-10">
              <ul className="grid gap-6">
                <li className="mb-6">
                  <div className="grid gap-6">
                    <h3 className="text-3xl font-bold text-upcolor dark:text-white">
                      Employment Information
                    </h3>
                    <div className="flex items-center">
                      <Image
                        alt="Position"
                        className="overflow-hidden rounded-xl object-cover"
                        height="60"
                        src={position}
                        width="60"
                      />
                      <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                        Position Title:{" "}
                        {/* Add corresponding data if available */}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Image
                        alt="Office"
                        className="overflow-hidden rounded-xl object-cover"
                        height="60"
                        src={office}
                        width="60"
                      />
                      <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                        Office/Unit: {/* Add corresponding data if available */}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="mb-6">
                  <div className="grid gap-6">
                    <h3 className="text-3xl font-bold text-upcolor dark:text-white">
                      Loan Details
                    </h3>
                    <div className="flex items-center">
                      <Image
                        alt="Loan"
                        className="overflow-hidden rounded-xl object-cover"
                        height="60"
                        src={loan}
                        width="60"
                      />
                      <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                        I would like to apply for:{" "}
                        {/* Add corresponding data if available */}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Image
                        alt="Amount"
                        className="overflow-hidden rounded-xl object-cover"
                        height="60"
                        src={amount}
                        width="60"
                      />
                      <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                        Amount in words:
                        <span className="block text-base text-black dark:text-black">
                          {/* Add corresponding data if available */}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Image
                        alt="Payment"
                        className="overflow-hidden rounded-xl object-cover"
                        height="60"
                        src={payment}
                        width="60"
                      />
                      <p className="ml-8 text-base text-gray-500 dark:text-gray-400">
                        Payable in: {/* Add corresponding data if available */}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
