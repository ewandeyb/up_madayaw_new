import { Button } from "@/components/ui/button";
import React from "react";
import DialogForm from "../DialogForm";
import ElevateForm from "./ElevateForm";

export default function ElevateMember() {
  return (
    <DialogForm
      id="elevate-trigger"
      title="Elevate Member"
      Trigger={<Button variant="secondary">Elevate to Member</Button>}
      form={<ElevateForm />}
    />
  );
}
