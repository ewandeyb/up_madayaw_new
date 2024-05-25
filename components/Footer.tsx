import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className="p-6 md:py-12 bg-gradient-to-r from-[#565656] to-[#303030] dark:bg-gradient-to-r dark:from-[#FFFFFF] dark:to-[#8E8E8E] text-center">
        <div className="flex flex-col items-center gap-2 text-sm text-white">
          <div className="flex gap-4">
            <Link className="text-white hover:underline underline-offset-4 dark:text-black" href="#">
              Contact us: 09325420044
            </Link>
          </div>
          <a href="#" className="float-right text-white dark:text-black">Kalimudan Student Center, University of the Philippines Mindanao, Mintal, Tugbok District, Davao City</a>
          <p className="text-wrap text-white dark:text-black">© 2010-2024 UP Madayaw. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

