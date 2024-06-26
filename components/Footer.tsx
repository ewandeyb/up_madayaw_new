import Link from "next/link";

export default function Footer() {
  return (
    <>
      <hr className="border-r"></hr>
      <footer
        className="p-6 md:py-12 bg-gray dark:bg-black text-center text-white"
      /* style={{
      backgroundColor: "#7b1113",
      backgroundImage: "linear-gradient(355deg, #7b1113 0%, #f1f3f5 100%)",
    }} */
      >
        <div className="flex flex-col items-center gap-2 text-sm text-white">
          <div className="flex gap-4">
            <Link
              className="text-black hover:underline underline-offset-4 dark:text-white"
              href="#"
            >
              Contact us: 09325420044
            </Link>
          </div>
          <a href="#" className="float-right text-black dark:text-white">
            Kalimudan Student Center, University of the Philippines Mindanao,
            Mintal, Tugbok District, Davao City
          </a>
          <p className="text-wrap text-black dark:text-white">
            © 2010-2024 UP Madayaw. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
