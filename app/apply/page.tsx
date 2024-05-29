import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CreateApplicationForm from "./components/CreateApplicationForm";
import Link from "next/link";

export default function Apply() {
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3 dark:bg-graident-dark">
      <h1 className="text-large md: text-4xl font-bold text-center mt-10 mb-10">
        UP Madayaw Application Form
      </h1>
      <CreateApplicationForm />
    </div>
  );
}
