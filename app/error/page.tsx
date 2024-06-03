import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-800">
      <div className="mx-auto max-w-md space-y-4 text-center">
        <TriangleAlertIcon className="mx-auto h-12 w-12 text-yellow-500" />
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Unauthorized Access
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          You do not have permission to access this resource.
        </p>
        <Link
          href="#"
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          prefetch={false}
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}

function TriangleAlertIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
