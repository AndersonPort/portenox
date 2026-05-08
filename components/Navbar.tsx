import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-zinc-800 bg-zinc-950 px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">
        Portenox
      </h1>

      <div className="flex gap-6 text-sm text-zinc-300">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/analyze">Analyze</Link>
        <Link href="/history">History</Link>
      </div>
    </nav>
  );
}