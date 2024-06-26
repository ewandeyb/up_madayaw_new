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
import Link from "next/link";
import EditProfile from "./components/edit/EditProfile";
import PasswordChange from "./components/edit/PasswordChange";
import { Button } from "@/components/ui/button";
export default async function Profile() {
  const supabase = createClient();

  // Fetch the currently logged-in user
  const user = await getUser(supabase);
  console.log(user);
  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }
  //console.log("hello profile!");
  // console.log(user);
  // Query to get the user-specific data
  const { data: MemberData, error } = await supabase
    .from("MemberData")
    .select(
      "MembershipID, MembershipNo, FirstName, LastName, CivilStatus, BirthDate, Email, MemberType"
    )
    .eq("MembershipID", user.id) // Assuming user_id is the foreign key in your table
    .single();
  const { data: EmploymentInfo } = await supabase
    .from("Occupation")
    .select("PositionTitle, OfficeTitle")
    .eq("AssocMemberID", user.id)
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
    <section className="max-w-screen max-h-90vh p-10 px-4 lg:px-8 border-2 dark:bg-graident-dark">
      <div className="grid grid-cols-1 gap-1 mb-4 items-center justify-start md:grid-cols-w-1/2 lg:float-right">
        <Button variant="secondary" className="">
          <Link href="/loan_form.pdf" className=" font-normal">
            Loan Application
          </Link>
        </Button>
        <EditProfile MemberProfile={MemberData} />
        <PasswordChange MemberProfile={MemberData} />
      </div>
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
          <p className="max-w-[900px] text-gray-500 dark:text-white tracking-tighter text-center md:text-center lg:text-left md:text-xl lg:text-base xl:text-xl">
            Membership Number: {MemberData.MembershipNo ?? "NULL"}
          </p>
        </div>
      </div>
      <hr className="h-px my-6 bg-black border-0 dark:bg-white"></hr>
      <div className="flex justify-center items-center">
        <div className="flex flex-col lg:flex-row w-full max-w-5xl gap-6">
          <div className="max-w-[600px] md:ml-6">
            <div className="flex flex-col justify-center space-y-4 border-2 border-black dark:border-white bg-white dark:bg-black rounded-xl">
              <ul className="grid gap-6 p-2">
                <li className="mb-6">
                  <div className="grid gap-6">
                    <h3 className="text-3xl font-bold text-upcolor dark:text-white">
                      Personal Information
                    </h3>
                    <div className="flex items-center">
                      <Image
                        alt="Civil Status"
                        className="object-contain"
                        height="60"
                        src={civil}
                        width="60"
                      />
                      <p className="ml-8 text-xl text-gray-500 dark:text-gray-400">
                        Civil Status:{" "}
                        <span className="font-semibold text-wrap">
                          {MemberData.CivilStatus ?? "NULL"}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Image
                        alt="Date of Birth"
                        className="object-contain"
                        height="60"
                        src={birth}
                        width="60"
                      />
                      <p className="ml-8 text-xl text-gray-500 dark:text-gray-400">
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
                        alt="Email"
                        className="object-contain"
                        height="60"
                        src={email}
                        width="60"
                      />
                      <p className="ml-8 text-xl text-gray-500 dark:text-gray-400  ">
                        Email :{" "}
                        <span className="font-semibold text-xs md:text-normal lg:text-xl">
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
                        className="object-contain"
                        height="60"
                        src={memtype}
                        width="60"
                      />
                      <p className="ml-8 text-xl text-gray-500 dark:text-gray-400">
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
          <div className="mx-auto justify-center">
            <div className="flex flex-col justify-center space-y-4 border-2 border-black dark:border-white bg-white dark:bg-black rounded-xl">
              <ul className="grid gap-6 p-2">
                <li className="mb-6">
                  <div className="grid gap-6">
                    <h3 className="text-3xl font-bold text-upcolor dark:text-white">
                      Employment Information
                    </h3>
                    <div className="flex items-center">
                      <Image
                        alt="Position"
                        className="object-contain"
                        height="60"
                        src={position}
                        width="60"
                      />
                      <p className="ml-8 text-xl text-gray-500 dark:text-gray-400">
                        Position Title:{" "}
                        <span className="font-semibold text-xs md:text-normal lg:text-xl">
                          {EmploymentInfo?.PositionTitle ?? "NULL"}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Image
                        alt="Office"
                        className="object-contain"
                        height="60"
                        src={office}
                        width="60"
                      />
                      <p className="ml-8 text-xl text-gray-500 dark:text-gray-400">
                        Office/Unit:
                        <span className="font-semibold text-xs md:text-normal lg:text-xl">
                          {EmploymentInfo?.OfficeTitle ?? "NULL"}
                        </span>
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
                        className="object-contain"
                        height="60"
                        src={loan}
                        width="60"
                      />
                      <p className="ml-8 text-xl text-gray-500 dark:text-gray-400">
                        I would like to apply for:{" "}
                        {/* Add corresponding data if available */}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Image
                        alt="Amount"
                        className="object-contain"
                        height="60"
                        src={amount}
                        width="60"
                      />
                      <p className="ml-8 text-xl text-gray-500 dark:text-gray-400">
                        Amount in words:
                        <span className="block text-black dark:text-black">
                          {/* Add corresponding data if available */}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Image
                        alt="Payment"
                        className="object-contain"
                        height="60"
                        src={payment}
                        width="60"
                      />
                      <p className="ml-8 text-xl text-gray-500 dark:text-gray-400">
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
