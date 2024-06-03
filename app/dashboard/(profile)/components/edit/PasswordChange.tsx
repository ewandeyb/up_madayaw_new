import React from "react";
import DialogForm from "../DialogForm";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { IMemberData } from "@/lib/types";
import PasswordChangeForm from "./PasswordChangeForm";

export default function Profile({ MemberProfile }: { MemberProfile: IMemberData }) {
  return (
    <DialogForm
      id="change-password"
      title="Change Password"
      Trigger={
        <Button
          variant="secondary"
          className=" font-normal max-h-12"
        >
          <Pencil1Icon />
          Change Password
        </Button>
      }
      form={<PasswordChangeForm MemberProfile={MemberProfile} />}
    />
  );
}
