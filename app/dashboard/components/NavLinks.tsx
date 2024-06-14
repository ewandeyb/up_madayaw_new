"use client";
import React, { useState, useEffect } from "react";
import { PersonIcon, IdCardIcon, ReaderIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import fetchRole from "../members/hooks/fetchRole"; // Adjust the import path as needed

export default function NavLinks() {
  const pathname = usePathname();
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAdminStatus() {
      const role = await fetchRole();
      setUserIsAdmin(role === "admin");
    }

    checkAdminStatus();
  }, []);

  const links = [
    {
      href: "/dashboard",
      text: "Profile",
      Icon: IdCardIcon,
    },
  ];

  if (userIsAdmin) {
    links.push(
      {
        href: "/dashboard/members",
        text: "Members",
        Icon: PersonIcon,
      },
      {
        href: "/dashboard/member_applications",
        text: "Member Applications",
        Icon: ReaderIcon,
      },
      {
        href: "/dashboard/loan_applications",
        text: "Loan Applications",
        Icon: ReaderIcon,
      }
    );
  }

  return (
    <div className="space-y-5">
      {links.map((link, index) => {
        const Icon = link.Icon;
        return (
          <Link
            onClick={() => document.getElementById("sidebar-close")?.click()}
            href={link.href}
            key={index}
            className={cn("flex items-center gap-2 rounded-sm p-2", {
              "bg-upcolor dark:bg-slate-500 text-white": pathname === link.href,
            })}
          >
            <Icon />
            {link.text}
          </Link>
        );
      })}
    </div>
  );
}
