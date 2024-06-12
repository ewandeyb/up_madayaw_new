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
import readAddress from "../../members/hooks/fetchAddressData";
import readMembers from "../../members/hooks/fetchMemberData";
import readContact from "../../members/hooks/fetchContactData";
import readOccupation from "../../members/hooks/fetchOccupationData";
import readSurvey from "../../members/hooks/fetchSurveyData";
import readDependent from "../../members/hooks/fetchDependentData";
import readApplication from "../../members/hooks/fetchApplication";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function ViewApplication() {
  const { ApplicationID } = useParams();
  const router = useRouter();
  const [member, setMember] = useState<any>(); // lol sorry for using any
  const [address, setAddress] = useState<any>();
  const [contact, setContact] = useState<any>();
  const [occupation, setOccupation] = useState<any>();
  const [survey, setSurvey] = useState<any>();
  const [dependent, setDependent] = useState<any>();

  useEffect(() => {
    // Fetch member data when ApplicationID changes
    readApplication(ApplicationID as UUID)
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
  }, [ApplicationID]); // useEffect will run whenever ApplicationID changes

  useEffect(() => {
    // Fetch member data when ApplicationID changes
    readAddress(ApplicationID as UUID)
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
  }, [ApplicationID]); // useEffect will run whenever ApplicationID changes

  useEffect(() => {
    // Fetch member data when ApplicationID changes
    readContact(ApplicationID as UUID)
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
  }, [ApplicationID]); // useEffect will run whenever ApplicationID changes

  useEffect(() => {
    // Fetch member data when ApplicationID changes
    readOccupation(ApplicationID as UUID)
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
  }, [ApplicationID]); // useEffect will run whenever ApplicationID changes

  useEffect(() => {
    // Fetch member data when ApplicationID changes
    readDependent(ApplicationID as UUID)
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
  }, [ApplicationID]); // useEffect will run whenever ApplicationID changes
  useEffect(() => {
    // Fetch member data when ApplicationID changes
    readSurvey(ApplicationID as UUID)
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
  }, [ApplicationID]); // useEffect will run whenever ApplicationID changes

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
              {member
                ? `${member.FirstName ?? ""} ${member.LastName ?? ""}`.trim()
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
        <Tabs defaultValue="member">
          <TabsList className="grid w-full grid-cols-1 overflow-x-auto md:grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="member">Member Data</TabsTrigger>
            <TabsTrigger value="dependents">Dependent Data</TabsTrigger>
            <TabsTrigger value="address">Address Data</TabsTrigger>
            <TabsTrigger value="relative">Relative Data</TabsTrigger>
            <TabsTrigger value="contact">Contact Data</TabsTrigger>
            <TabsTrigger value="occupation">Occupation Data</TabsTrigger>
            <TabsTrigger value="survey">Survey Data</TabsTrigger>
          </TabsList>

          <TabsContent value="member">
            <Card className="">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Member Details</CardTitle>
                <Button
                  variant="outline"
                  onClick={() => {
                    router.push(`/dashboard/members/${ApplicationID}/edit`);
                  }}
                  className="w-1/6 mt-5 ml-auto mb-5"
                >
                  Edit
                </Button>
              </CardHeader>
              <CardContent>
                {member ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {Object.entries(member)
                      .filter(([key]) => key != "MembershipID")
                      .map(([key, value]) => (
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dependents">
            <Card>
              <CardHeader>
                <CardTitle>Dependent Details</CardTitle>
              </CardHeader>
              <CardContent>
                {dependent && dependent.length > 0 ? (
                  dependent.map((dependent: any, index: number) => (
                    <div key={index}>
                      <hr className="mt-5 mb-5"></hr>
                      <h3 className="mb-5 font-bold">Dependent {index + 1}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {Object.entries(dependent)
                          .filter(
                            ([key]) =>
                              key != "AssocMemberID" &&
                              key != "created_at" &&
                              key != "DependentID"
                          )
                          .map(([key, value]) => (
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
                    </div>
                  ))
                ) : (
                  <p>No dependent data available</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="address">
            <Card className="h-3/6">
              <CardHeader>
                <CardTitle>Address Details</CardTitle>
              </CardHeader>
              <CardContent>
                {address && address[0] ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {Object.entries({
                      ...address[0],
                    })
                      .filter(
                        ([key]) =>
                          key != "created_at" &&
                          key != "AssocMemberID" &&
                          key != "IsMemberAddress" &&
                          key != "IsRelativeAddress"
                      )
                      .map(([key, value]) => (
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
          </TabsContent>

          <TabsContent value="relative">
            <Card className="h-3/6">
              <CardHeader>
                <CardTitle>Address Relative Details</CardTitle>
              </CardHeader>
              <CardContent>
                {address && address[1] ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {Object.entries({
                      ...address[1],
                    })
                      .filter(
                        ([key]) =>
                          key != "created_at" &&
                          key != "AssocMemberID" &&
                          key != "IsMemberAddress" &&
                          key != "IsRelativeAddress"
                      )
                      .map(([key, value]) => (
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
          </TabsContent>

          <TabsContent value="contact">
            <Card className="">
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
              </CardHeader>
              <CardContent>
                {contact ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(contact)
                      .filter(([key]) => key != "AssocMemberID")
                      .map(([key, value]) => (
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="occupation">
            <Card>
              <CardHeader>
                <CardTitle>Occupation Details</CardTitle>
              </CardHeader>
              <CardContent>
                {occupation && occupation[0] ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {Object.entries(occupation[0])
                      .filter(
                        ([key]) => key != "AssocMemberID" && key != "created_at"
                      )
                      .map(([key, value]) => (
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="survey">
            <Card>
              <CardHeader>
                <CardTitle>Survey Details</CardTitle>
              </CardHeader>
              <CardContent>
                {survey && survey[0] ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
                    {Object.entries(survey[0])
                      .filter(
                        ([key]) => key != "AssocMemberID" && key != "created_at"
                      )
                      .map(([key, value]) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
