import Link from "next/link";

export default function Auth() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-blue-600">Auth Center</span>
        </h1>
        <p className="mt-3 text-2xl">
          Secure authentication for multiple frontend sites
        </p>
        <div className="flex mt-6">
          <Link
            href="/auth/signin"
            className="mx-4 px-6 py-3 rounded-md bg-blue-600 text-white"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="mx-4 px-6 py-3 rounded-md bg-green-600 text-white"
          >
            Sign Up
          </Link>
        </div>
      </main>
    </div>
  );
}
