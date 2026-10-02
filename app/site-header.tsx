import Link from "next/link";

function PawMark() {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true" className="h-9 w-9">
      <ellipse cx="12" cy="17" rx="5" ry="7" transform="rotate(-25 12 17)" />
      <ellipse cx="22" cy="11" rx="5" ry="7" transform="rotate(-8 22 11)" />
      <ellipse cx="33" cy="13" rx="5" ry="7" transform="rotate(18 33 13)" />
      <ellipse cx="40" cy="23" rx="4" ry="6" transform="rotate(30 40 23)" />
      <path d="M12 33c0-5 7-14 13-14s14 10 14 15c0 9-10 5-14 5s-13 4-13-6Z" />
    </svg>
  );
}



export default function SiteHeader() {
  return (
    <header className="border-b border-[#173F35]/10 bg-[#FAF8F5]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <Link
          href="/"
          aria-label="THE PAWMART, inicio"
          className="flex w-fit items-center gap-2.5"
        >
          <PawMark />
          <span className="flex flex-col leading-none">
            <span className="mb-1 text-[9px] font-semibold tracking-[0.35em]">THE</span>
            <span className="text-2xl font-extrabold tracking-[-0.06em]">PAWMART</span>
          </span>
        </Link>

        <nav
          aria-label="Navegación principal"
          className="grid grid-cols-4 gap-1 rounded-full bg-[#DCEBE3]/60 p-1 text-xs font-semibold sm:text-sm"
        >
          {[
            { href: "/", label: "Inicio" },
            { href: "/productos", label: "Productos" },
            { href: "/blog", label: "Blog" },
            { href: "/carrito", label: "Carrito" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center justify-center rounded-full px-3 transition-colors hover:bg-[#173F35] hover:text-white focus-visible:bg-[#173F35] focus-visible:text-white sm:px-5"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
