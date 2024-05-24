import Link from "next/link";

export default function Footer() {
  return (
    <>
      <hr></hr>
      <footer className="p-6 md:py-12 dark:bg-black text-center ">
        <div className="flex flex-col items-center gap-2 text-sm">
          <div className="flex gap-4">
            <Link
              className="text-gray-500 hover:underline underline-offset-4 dark:text-gray-400"
              href="#"
            >
              Contact us: 09325420044
            </Link>
          </div>
          <a href="#" className="float-right text-gray-500 dark:text-gray-400">
            Kalimudan Student Center, University of the Philippines Mindanao,
            Mintal, Tugbok District, Davao City
          </a>
          <p className="text-wrap text-gray-500 dark:text-gray-400">
            © 2010-2024 UP Madayaw. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
