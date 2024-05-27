"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import readMembers from "../fetchMemberData";
import { UUID } from "crypto";
import { useState, useEffect } from "react";
import React from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export default function ViewApplication() {
  const { MembershipID } = useParams();
  const router = useRouter();
  const [member, setMember] = useState<any>(); // lol sorry for using any
  const [address, setAddress] = useState();
  useEffect(() => {
    // Fetch member data when MembershipID changes
    readMembers(MembershipID as UUID)
      .then(({ data, error }) => {
        if (error) {
          // Handle error
          console.error(error);
        } else {
          // Set member data
          console.log(data);
          setMember(data);
        }
      })
      .catch((error) => {
        // Handle any unexpected errors
        console.error(error);
      });
  }, [MembershipID]); // useEffect will run whenever MembershipID changes

  return (
    <>
      <header className="bg-gray-100 dark:bg-gray-800 py-8 px-4 md:px-6">
        <div className="container mx-auto flex items-center gap-4">
          <Avatar>
            <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
            <AvatarFallback className="text-upcolor font-semibold">
              UP
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">
              {member && member.MemberData
                ? `${member.MemberData.FirstName || ""} ${
                    member.MemberData.LastName || ""
                  }`.trim()
                : "N/A"}
            </h1>

            <p className="text-gray-500 dark:text-gray-400">Member</p>
          </div>
          <Button className="ml-auto">Edit</Button>
          <Button
            className="p-2 rounded-md ml-auto bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-600" />
            <span className="sr-only">Back</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-col">
        <Card className="max-h-1/2">
          <CardHeader>
            <CardTitle>Member Details</CardTitle>
          </CardHeader>
          <CardContent>
            {member && member.MemberData && (
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(member.MemberData).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <div className="flex text-sm gap-2 p-4">
                      <span className="font-bold text-upcolor dark:text-white">
                        {key}:{" "}
                      </span>
                      {"   "}
                      <span className="font-semibold text-black dark:text-slate-500">
                        {String(value) || "N/A"}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="h-3/6">
          <CardHeader>
            <CardTitle>Address Details</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </>
  );
}
