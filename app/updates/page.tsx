import Image from 'next/image';
import Updates from '@/components/Updates';

export default function About() {
  return (
    <>
      <section className="w-full py-10 bg-gradient-to-r from-[#FFFFFF] to-[#8E8E8E] dark:bg-gradient-to-r dark:from-[#B2B2B2] dark:to-[#202020] min-h-[400px]">
        <div className="container px-4 md:px-6">
          <Updates />
        </div>
      </section>
    </>
  );
}