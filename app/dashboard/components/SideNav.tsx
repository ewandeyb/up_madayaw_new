import React from "react";
import NavLinks from "./NavLinks";

import { cn } from "@/lib/utils";
import ModeToggle from "../../../components/ToggleDarkMode";
import { Button } from "@/components/ui/button";
import SignOut from "./SignOut";

export default function SideNav() {
  return <SideBar className="h-screen hidden lg:block  flex-1" />;
}

export const SideBar = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <div
        className={cn(
          " min-h-full  w-full lg:w-96 lg:p-10 space-y-5 flex flex-col "
        )}
      >
        <div className="flex-1 space-y-5">
          <div className="flex items-center gap-2 flex-1">
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
          <NavLinks />
        </div>
        <div className="">
          <SignOut />
        </div>
      </div>
    </div>
  );
};
