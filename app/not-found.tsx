import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound(){
  return (
    <div>
        <div className="flex min-h-[80dvh] flex-col items-center justify-center gap-6 px-4 py-12 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-up_color">Oops! Page not found.</h1>
          <p className="text-gray-500 dark:text-gray-400">The page you are looking for does not exist or has been moved.</p>
        </div>
        <Button size="sm" variant="up" className=" text-white font-bold border w-26">
          <a href="/">Go Back Home</a>
        </Button>
        </div>
    </div>
  )
}