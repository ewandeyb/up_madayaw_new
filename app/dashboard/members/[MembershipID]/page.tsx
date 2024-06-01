"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UUID } from "crypto";
import { useState, useEffect } from "react";
import React from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { ArrowLeftIcon } from "lucide-react";
import readAddress from "../hooks/fetchAddressData";
import readMembers from "../hooks/fetchMemberData";
import readContact from "../hooks/fetchContactData";
import readOccupation from "../hooks/fetchOccupationData";
import readSurvey from "../hooks/fetchSurveyData";
import readDependent from "../hooks/fetchDependentData";

export default function ViewApplication() {
  const { MembershipID } = useParams();
  const router = useRouter();
  const [member, setMember] = useState<any>(); // lol sorry for using any
  const [address, setAddress] = useState<any>();
  const [contact, setContact] = useState<any>();
  const [occupation, setOccupation] = useState<any>();
  const [survey, setSurvey] = useState<any>();
  const [dependent, setDependent] = useState<any>();

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

  useEffect(() => {
    // Fetch member data when MembershipID changes
    readAddress(MembershipID as UUID)
      .then(({ data, error }) => {
        if (error) {
          // Handle error
          console.error(error);
        } else {
          // Set member data
          console.log(data);
          setAddress(data);
        }
      })
      .catch((error) => {
        // Handle any unexpected errors
        console.error(error);
      });
  }, [MembershipID]); // useEffect will run whenever MembershipID changes

  useEffect(() => {
    // Fetch member data when MembershipID changes
    readContact(MembershipID as UUID)
      .then(({ data, error }) => {
        if (error) {
          // Handle error
          console.error(error);
        } else {
          // Set member data
          console.log(data);
          setContact(data);
        }
      })
      .catch((error) => {
        // Handle any unexpected errors
        console.error(error);
      });
  }, [MembershipID]); // useEffect will run whenever MembershipID changes

  useEffect(() => {
    // Fetch member data when MembershipID changes
    readOccupation(MembershipID as UUID)
      .then(({ data, error }) => {
        if (error) {
          // Handle error
          console.error(error);
        } else {
          // Set member data
          console.log(data);
          setOccupation(data);
        }
      })
      .catch((error) => {
        // Handle any unexpected errors
        console.error(error);
      });
  }, [MembershipID]); // useEffect will run whenever MembershipID changes

  useEffect(() => {
    // Fetch member data when MembershipID changes
    readDependent(MembershipID as UUID)
      .then(({ data, error }) => {
        if (error) {
          // Handle error
          console.error(error);
        } else {
          // Set member data
          console.log(data);
          setDependent(data);
        }
      })
      .catch((error) => {
        // Handle any unexpected errors
        console.error(error);
      });
  }, [MembershipID]); // useEffect will run whenever MembershipID changes
  useEffect(() => {
    // Fetch member data when MembershipID changes
    readSurvey(MembershipID as UUID)
      .then(({ data, error }) => {
        if (error) {
          // Handle error
          console.error(error);
        } else {
          // Set member data
          console.log(data);
          setSurvey(data);
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
            <AvatarImage alt="User Avatar" />
            <AvatarFallback className="text-upcolor font-semibold">
              UP
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">
              {member && member.MemberData
                ? `${member.MemberData.FirstName ?? ""} ${
                    member.MemberData.LastName ?? ""
                  }`.trim()
                : "N/A"}
            </h1>

            <p className="text-gray-500 dark:text-gray-400">Member</p>
          </div>

          <Button
            className="p-2 rounded-md ml-auto bg-gray-200 hover:bg-upcolor dark:hover:bg-gray-700 transition-colors"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowLeftIcon className="w-6 h-6 text-gray-600 hover:text-white dark:text-gray-600" />
            <span className="sr-only">Back</span>
          </Button>
        </div>
      </header>

      <div className="flex flex-col overflow-y-96 ">
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Member Details</CardTitle>
            <Button
              variant="outline"
              onClick={() => {
                router.push(`/dashboard/members/${MembershipID}/edit`);
              }}
            >
              Edit
            </Button>
          </CardHeader>
          <CardContent>
            {member && member.MemberData ? (
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(member.MemberData).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <div className="flex text-sm gap-2 p-4">
                      <span className="font-bold text-upcolor dark:text-white">
                        {key}:{" "}
                      </span>
                      {"   "}
                      <span className="font-semibold text-black dark:text-slate-500">
                        {String(value) ?? "N/A"}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <p>No Member Data Available</p>
            )}
            <hr className="mt-5 mb-5"></hr>
            <h1 className=" mb-5 font-bold">Dependent Data</h1>
            {dependent && dependent[0] ? (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(dependent[0]).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="font-bold text-upcolor dark:text-white">
                      {key}:
                    </span>
                    <span className="font-semibold text-black dark:text-slate-500">
                      {String(value) ?? "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No dependent data available</p>
            )}
          </CardContent>
        </Card>

        {/* ADDRESS OF PERSON */}
        <Card className="h-3/6">
          <CardHeader>
            <CardTitle>Address Details</CardTitle>
          </CardHeader>
          <CardContent>
            {address && address[0] ? (
              <div className="grid grid-cols-3 gap-2">
                {Object.entries({
                  ...address[0],
                }).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <div className="flex text-sm gap-2 p-4">
                      <span className="font-bold text-upcolor dark:text-white">
                        {key}:{" "}
                      </span>
                      {"   "}
                      <span className="font-semibold text-black dark:text-slate-500">
                        {String(value) ?? "N/A"}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <p>No address details available</p>
            )}
          </CardContent>
        </Card>
        {/* ADDRESS OF RELATIVE PERSON */}
        <Card className="h-3/6">
          <CardHeader>
            <CardTitle>Address Relative Details</CardTitle>
          </CardHeader>
          <CardContent>
            {address && address[1] ? (
              <div className="grid grid-cols-3 gap-2">
                {Object.entries({
                  ...address[1],
                }).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <div className="flex text-sm gap-2 p-4">
                      <span className="font-bold text-upcolor dark:text-white">
                        {key}:{" "}
                      </span>
                      {"   "}
                      <span className="font-semibold text-black dark:text-slate-500">
                        {String(value) ?? "N/A"}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <p>No address details available</p>
            )}
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="">
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent>
            {contact ? (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(contact).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="font-bold text-upcolor dark:text-white">
                      {key}:
                    </span>
                    <span className="font-semibold text-black dark:text-slate-500">
                      {String(value) ?? "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No contact details available</p>
            )}
            <hr className="mt-5 mb-5"></hr>
            <h1 className=" mb-5 font-bold">Occupation</h1>
            {occupation && occupation[0] ? (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(occupation[0]).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="font-bold text-upcolor dark:text-white">
                      {key}:
                    </span>
                    <span className="font-semibold text-black dark:text-slate-500">
                      {String(value) ?? "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No occupation data available</p>
            )}
            <hr className="mt-5 mb-5"></hr>
            <h1 className=" mb-5 font-bold">Survey Data</h1>
            {survey && survey[0] ? (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(survey[0]).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="font-bold text-upcolor dark:text-white">
                      {key}:
                    </span>
                    <span className="font-semibold text-black dark:text-slate-500">
                      {String(value) ?? "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No survey data available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
