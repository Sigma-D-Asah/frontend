// Default layout kept for static pages — cleaned of template references

import { Navbar } from "@/components/Navbar.tsx";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3 text-sm text-gray-500">
        Accenture · Predictive Maintenance Copilot
      </footer>
    </div>
  );
}
