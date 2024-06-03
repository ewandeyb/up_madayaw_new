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
      id="send-password-reset"
      title="Send Password Reset"
      description="Please type in the email you used to register."
      Trigger={
        <Link href="">
          Forgot Password?
        </Link>
      }
      form={<ForgotPassswordForm />}
    />
  );
}
