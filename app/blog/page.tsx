import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | THE PAWMART",
};

export default function BlogPage() {
  return (
    <main id="contenido" className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
      <p className="text-xs font-semibold tracking-[0.2em] text-[#53645B]">
        EL BLOG DE THE PAWMART
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
        Cuidar empieza por conocer.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-[#53645B]">
        Estamos preparando artículos sobre Puñete y el cuidado de los perros,
        con fuentes verificadas y explicaciones claras.
      </p>
      <div className="mt-10 rounded-3xl border border-[#173F35]/15 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Próximamente</h2>
        <p className="mt-3 leading-7 text-[#53645B]">
          Presentaciones y composición, lectura del envase y preguntas
          para conversar con tu médico veterinario.
        </p>
      </div>
      <Link
        href="/productos"
        className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#173F35] px-6 text-sm font-semibold text-white hover:bg-[#285949]"
      >
        Explorar productos
      </Link>
    </main>
  );
}
