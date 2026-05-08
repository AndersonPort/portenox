"use client";

import Link from "next/link";
import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full border-b border-zinc-800 bg-zinc-950 px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">
        Portenox
      </h1>

      <div className="flex gap-6 items-center text-sm text-zinc-300">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/analyze">Analyze</Link>
        <Link href="/history">History</Link>

        {!session ? (
          <button
            onClick={() => signIn("google")}
            className="bg-white text-black px-4 py-2 rounded-xl font-medium"
          >
            Login
          </button>
        ) : (
          <>
            <span>
              {session.user?.name}
            </span>

            <button
              onClick={() => signOut()}
              className="border border-zinc-700 px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}