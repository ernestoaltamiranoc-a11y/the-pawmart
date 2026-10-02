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

function PetIllustration() {
  return (
    <svg
      viewBox="0 0 560 560"
      role="img"
      aria-labelledby="pet-title"
      className="h-auto w-full"
    >
      <title id="pet-title">Ilustración de un perro y un gato juntos</title>
      <circle cx="280" cy="280" r="230" fill="#C8DDD0" />
      <circle cx="450" cy="125" r="35" fill="#F4B49D" />
      <path d="m87 145 8 18 20 2-15 13 4 20-18-10-17 10 3-20-15-13 20-2Z" fill="#FAF8F5" />
      <path d="m454 324 5 12 14 2-10 9 2 14-12-7-12 7 3-14-11-9 14-2Z" fill="#173F35" />
      <ellipse cx="281" cy="471" rx="191" ry="23" fill="#173F35" opacity=".1" />

      <path d="M344 449c89 27 151-23 122-58-21-25-49 1-27 17"
        fill="none" stroke="#173F35" strokeWidth="25" strokeLinecap="round" />
      <path d="M307 339c-27 42-34 103-19 130h123c10-40-8-102-37-130Z" fill="#173F35" />
      <path d="m292 272 1-84 64 44 55-45 8 85Z" fill="#173F35" />
      <path d="m304 239 1-30 25 23M378 232l23-24 3 31" fill="#E8A991" />
      <ellipse cx="356" cy="295" rx="72" ry="66" fill="#173F35" />
      <path d="M337 355c-17 32-23 78-15 110h62c6-40-3-82-19-110Z" fill="#FAF8F5" />
      <path d="M310 287q12-12 23 0M375 287q12-12 23 0" fill="none"
        stroke="#FAF8F5" strokeWidth="5" strokeLinecap="round" />
      <path d="m348 305 9 8 9-8Z" fill="#F4B49D" />
      <path d="M357 314v9m0 0q-8 7-15 0m15 0q8 7 15 0" fill="none"
        stroke="#FAF8F5" strokeWidth="3" strokeLinecap="round" />
      <path d="m320 310-40-7m40 17-39 5m110-15 39-7m-39 17 39 5"
        stroke="#173F35" strokeWidth="3" strokeLinecap="round" />

      <path d="M150 345c-35 28-54 83-39 124h172c13-45-5-99-39-124Z" fill="#DCA978" />
      <path d="M159 354c-17 30-19 75-11 115h88c10-40 2-86-14-115Z" fill="#FAF0DF" />
      <path d="M128 223c-31-27-65-2-65 32 0 39 16 88 42 91 20 2 33-35 36-64Z" fill="#9A6544" />
      <path d="M248 223c31-27 65-2 65 32 0 39-16 88-42 91-20 2-33-35-36-64Z" fill="#9A6544" />
      <path d="M108 278c0-65 31-95 80-95s82 30 82 95c0 65-33 94-82 94s-80-29-80-94Z" fill="#E7BD91" />
      <path d="M181 184c-10 32-9 68-4 95h28c6-36 3-67-7-95Z" fill="#FAF0DF" />
      <ellipse cx="151" cy="279" rx="7" ry="9" fill="#173F35" />
      <ellipse cx="228" cy="279" rx="7" ry="9" fill="#173F35" />
      <ellipse cx="190" cy="318" rx="41" ry="31" fill="#FAF0DF" />
      <path d="M174 306q16-10 32 0 0 18-16 20-16-2-16-20Z" fill="#173F35" />
      <path d="M190 326v9m0 0q-13 10-23 0m23 0q13 10 23 0" fill="none"
        stroke="#173F35" strokeWidth="4" strokeLinecap="round" />
      <path d="M181 343h21v13c0 17-21 17-21 0Z" fill="#D78578" />
      <path d="M131 359q58 30 119 0" fill="none" stroke="#173F35" strokeWidth="15" />
      <circle cx="191" cy="381" r="13" fill="#F4B49D" />
      <path d="M128 430v40m124-40v40" stroke="#9A6544" strokeWidth="4" strokeLinecap="round" />

      <path d="M254 124c-17-24-42-1-24 17l24 23 25-23c18-18-8-41-25-17Z" fill="#173F35" />
    </svg>
  );
}

export default function Home() {
  return (
    <div id="inicio" className="min-h-screen bg-[#FAF8F5] text-[#173F35]">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:block focus:p-4">
        Saltar al contenido
      </a>

      <div className="bg-[#173F35] px-4 py-2.5 text-center text-xs tracking-wide text-white">
        Para los que tienen un lugar enorme en tu vida.
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-6 lg:px-12">
        <a href="#inicio" aria-label="THE PAWMART, inicio" className="flex items-center gap-2.5">
          <PawMark />
          <span className="flex flex-col leading-none">
            <span className="mb-1 text-[9px] font-semibold tracking-[0.35em]">THE</span>
            <span className="text-xl font-extrabold tracking-[-0.06em] sm:text-2xl">PAWMART</span>
          </span>
        </a>
        <nav aria-label="Navegación principal" className="flex items-center gap-6 text-sm font-medium">
          <a href="#coleccion" className="hidden underline-offset-4 hover:underline sm:inline">
            Nuestra colección
          </a>
          <a href="#nosotros" className="rounded-full border border-[#173F35]/20 px-4 py-2.5 hover:bg-[#DCEBE3]">
            Conócenos
          </a>
        </nav>
      </header>

      <main id="contenido">
        <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-10 pt-4 sm:px-8 sm:pt-8 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:pb-20 lg:pt-12">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#DCEBE3] px-4 py-2 text-xs font-semibold tracking-wide">
              <span className="h-2 w-2 rounded-full bg-[#173F35]" aria-hidden="true" />
              PEQUEÑAS PATAS. GRANDES AMORES.
            </p>
            <h1 className="max-w-xl text-[clamp(2.5rem,6.3vw,5.5rem)] leading-[1.04] font-semibold tracking-[-0.065em]">
              Su bienestar.
              <br />
              Tu tranquilidad.
              <span className="mt-2 block text-[#567360]">Nuestro mundo.</span>
            </h1>
            <p className="mt-5 max-w-md sm:mt-7 text-base leading-7 text-[#53645B] sm:text-lg sm:leading-8">
              Cuidar de quien te alegra la vida debería ser simple.
              Un espacio pensado para ellos, y una experiencia fácil para ti.
            </p>
            <a
              href="#coleccion"
              className="mt-8 inline-flex min-h-14 items-center justify-center gap-6 rounded-full bg-[#173F35] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#285949]"
            >
              Descubre nuestra colección
              <span aria-hidden="true">↗</span>
            </a>
            <p className="mt-5 text-xs text-[#53645B]">
              Hecho con cariño. Pensado para sus mejores días.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute top-5 right-1 z-10 rotate-6 rounded-2xl bg-[#F4B49D] px-5 py-3 text-center text-xs font-semibold shadow-sm sm:top-10">
              Más momentos juntos.
              <br />
              Más colitas felices.
            </div>
            <PetIllustration />
            <div className="absolute bottom-3 left-2 rounded-2xl border border-[#173F35]/10 bg-[#FAF8F5] px-5 py-4 shadow-sm sm:bottom-6 sm:left-8">
              <p className="text-[10px] font-semibold tracking-[0.18em] text-[#53645B]">NUESTRA RAZÓN DE SER</p>
              <p className="mt-1 text-sm font-semibold">Ellos también son familia.</p>
            </div>
          </div>
        </section>

        <section id="coleccion" className="border-y border-[#173F35]/10 bg-[#DCEBE3]/40">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 py-9 sm:px-8 md:flex-row md:items-center lg:px-12">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-[#53645B]">CONOCE NUESTRA PRIMERA COLECCIÓN</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Puñete. Cuidado para tu perro.
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-[#53645B]">
              Estamos preparando las presentaciones y sus detalles para que puedas compararlas con claridad.
            </p>
          </div>
        </section>

        <section id="nosotros" className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#53645B]">HOLA, SOMOS THE PAWMART</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">El cariño está en los detalles.</h2>
          <p className="mt-4 text-base leading-7 text-[#53645B]">
            Nacemos con una idea sencilla: hacer más fácil el cuidado de tus mascotas.
            Porque detrás de cada patita hay un compañero, una historia y un hogar.
          </p>
        </section>
      </main>

      <footer className="border-t border-[#173F35]/10 px-5 py-6 text-center text-xs text-[#53645B]">
        THE PAWMART · Para quienes son parte de la familia.
      </footer>
    </div>
  );
}
