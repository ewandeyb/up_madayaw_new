import Image from 'next/image';
import Updates from '@/components/Updates';

export default function About() {
  return (
    <>
      <section className="w-full bg-gray-100 py-10 dark:bg-gray-800 min-h-[400px]">
        <div className="container px-4 md:px-6">
          <Updates />
        </div>
      </section>      
    </>
  );
}