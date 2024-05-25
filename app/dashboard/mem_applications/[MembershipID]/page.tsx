"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createSupbaseServerClient } from "@/lib/supabase";
import { IPermission } from "@/lib/types";
import { data1 } from "../../../apply/components/schema";
export default function ViewApplication() {
  const { MembershipID } = useParams();
  const router = useRouter();

  //actions

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          router.back();
        }}
        className="float-right"
      >
        Back
      </Button>
      <h1 className="text-3xl font-bold">Full Member Details</h1>
    </>
  );
}
