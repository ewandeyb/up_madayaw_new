import React from "react";
import CreateApplicationForm from "./components/CreateApplicationForm";
import Link from "next/link";
export default function Apply() {
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3 dark:bg-graident-dark">
      <div className="flex flex-col items-center justify-center space-y-4 text-center ">
        <div className="inline-block rounded-lg mt-10 text-upcolor bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 dark:text-white">
          Apply Now
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          UP Madayaw Application Form
        </h2>
        <Link
          href="application_form.pdf"
          className="text-xl text-gray-600 dark:text-white"
        >
          or download our{" "}
          <span className="font-semibold text-upcolor hover:underline hover:underline-offset-4 dark:text-red-600">
            digital form
          </span>
        </Link>
      </div>
      <CreateApplicationForm />
    </div>
  );
}
