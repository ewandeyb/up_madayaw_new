import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import logo from "../components/img/logo.png";
import { readUserSession } from "@/lib/actions";
import ModeToggle from "./ToggleDarkMode";
import coop from "@/components/img/coop_no_bg.png";
import { cn } from "@/lib/utils";

export default async function Header() {
  const { data: userSession } = await readUserSession();
  const isLoggedIn =
    userSession.session?.user.user_metadata.Role === "admin" ||
    userSession.session?.user.user_metadata.Role === "user";
  const email = userSession.session?.user.email;
  const isDarkMode = true;

  const isDarkModeClass = cn({ dark: isDarkMode });
  return (
    <header className="flex h-16 w-full items-center justify-between bg-up_color px-4 shadow-sm dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <Image
            alt="coop"
            src={coop}
            width="48"
            height="10"
            className="dark:invert"
          />
          <span className="text-xl font-extrabold text-gray">UP Madayaw</span>
        </Link>
        <ModeToggle />
      </div>
      <nav className="hidden items-center gap-4 sm:flex">
        <Link
          className="text-sm text-gray font-medium hover:underline hover:underline-offset-4"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-sm text-gray font-medium hover:underline hover:underline-offset-4"
          href="/about"
        >
          About
        </Link>
        <Link
          className="text-sm text-gray font-medium hover:underline hover:underline-offset-4"
          href="/updates"
        >
          Updates
        </Link>
        {isLoggedIn ? (
          <Link
            className="hover:underline hover:underline-offset-4 text-sm text-gray font-normal"
            href="/auth"
          >
            Welcome{" "}
            <span className=" font-normal light:text-upcolor dark: text-white">
              {email}
            </span>
          </Link>
        ) : (
          <Link
            className="text-sm text-gray font-medium hover:underline hover:underline-offset-4"
            href="/auth"
          >
            Login
          </Link>
        )}
        <Button
          size="sm"
          variant="up"
          className=" text-white font-bold border w-26"
        >
          <a href="/apply">Apply Now</a>
        </Button>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="sm:hidden" size="icon" variant="outline">
            <AlignJustify className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 p-6">
            <Link
              className="text-sm font-medium hover:underline hover:underline-offset-4"
              href="/"
            >
              Home
            </Link>
            <Link
              className="text-sm font-medium hover:underline hover:underline-offset-4"
              href="/about"
            >
              About
            </Link>
            <Link
              className="text-sm font-medium hover:underline hover:underline-offset-4"
              href="/updates"
            >
              Updates
            </Link>
            {isLoggedIn ? (
              <Link
                className="hover:underline hover:underline-offset-4 text-sm text-gray font-normal"
                href="/auth"
              >
                Welcome{" "}
                <span className=" font-normal text-upcolor ">{email}</span>
              </Link>
            ) : (
              <Link
                className="text-sm text-gray font-medium hover:underline hover:underline-offset-4"
                href="/auth"
              >
                Login
              </Link>
            )}
            <Button
              size="sm"
              variant="up"
              className=" text-white font-bold border "
            >
              Apply
            </Button>
            <Image
              src={coop}
              width="150"
              height="20"
              alt="coop"
              className="mx-auto block mt-12"
            />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
