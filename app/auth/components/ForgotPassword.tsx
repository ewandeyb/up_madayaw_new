import React from "react";
import DialogForm from "./DialogForm";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { IMemberData } from "@/lib/types";
import ForgotPassswordForm from "./ForgrotPasswordForm";
import Link from "next/link";

export default function Profile() {
  return (
    <DialogForm
      id="change-password"
      title="Change Password"
      Trigger={
        <Link href="">
          <Pencil1Icon />
          Change Password
        </Link>
      }
      form={<ForgotPassswordForm />}
    />
  );
}
