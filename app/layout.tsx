import "./globals.css";

export const metadata = {
  title: "Portenox",
  description: "AI Career Growth Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <nav className="border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between">
            <a href="/" className="font-bold text-xl">
              Portenox
            </a>

            <div className="flex gap-6 text-sm text-zinc-400">
              <a href="/">Home</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/analyze">Analyze</a>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}