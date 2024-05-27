import React from "react";
import DialogForm from "../DialogForm";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import EditForm from "./EditorForm";
import { IPermission } from "@/lib/types";

export default function EditProfile() {
  return (
    <DialogForm
      id="update-trigger"
      title="Edit Profile"
      Trigger={
        <Button
          variant="secondary"
          className=" font-normal max-h-12"
        >
          <Pencil1Icon />
          Edit
        </Button>
      }
      form={<EditForm />}
    />
  );
}
