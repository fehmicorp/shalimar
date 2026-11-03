import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8f5ee] text-[#382b20]">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-[#b18a50]/10" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[340px] w-[340px] rounded-full border border-[#b18a50]/10" />
      <div className="pointer-events-none absolute -bottom-52 -left-40 h-[500px] w-[500px] rounded-full border border-[#b18a50]/10" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
          <Link href="/" className="flex flex-col items-center">
            <Image
              src="/logo.png"
              alt="Shalimar"
              width={200}
              height={25}
              className="max-h-9 w-auto object-contain"
              priority
            />
            <span className="ml-2 text-sm font-medium font-serif uppercase tracking-[0.29em] text-yellow-700">
              Shalimar
            </span>
          </Link>
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#817361]">
            <ShieldCheck size={15} className="text-[#b18a50]" />
            <span>Secure Admin Portal</span>
          </div>
        </header>
        <section className="flex flex-1 items-start justify-center px-5 sm:px-8">
          <div className="w-full max-w-[440px]">{children}</div>
        </section>
        <footer className="grid grid-cols-1 md:grid-cols-3 max-h-16 items-center gap-4 px-6 py-6 text-[10px] uppercase tracking-[0.16em] text-[#817361] sm:px-10 lg:px-16 border-t border-[#e3d8c8]/50 bg-white/30 backdrop-blur-md">
          <span className="text-center md:text-left">
            © 2026 Shalimar Corporation
          </span>
          <div className="text-center">
            <Link 
              href="https://fehmicorp.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#a47c43] font-medium transition hover:text-[#382b20]"
            >
              Developed by Fehmi Corp
            </Link>
          </div>
          <span className="text-center md:text-right text-[#817361]/80">
            Private access · Authorized personnel only
          </span>
        </footer>
      </div>
    </main>
  );
}