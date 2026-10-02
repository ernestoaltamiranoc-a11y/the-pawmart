import Presentation from "./presentation";
import Catalog from "./catalog";

export default function Home() {
  return (
    <div id="inicio" className="min-h-screen bg-[#FAF8F5] text-[#173F35]">
      

      

      

      <main id="contenido">
        <Presentation />

        <section
          id="video-presentacion"
          aria-labelledby="video-title"
          className="mx-auto max-w-6xl px-5 pb-14 pt-4 sm:px-8"
        >
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-[#53645B]">
              DESCUBRE PUÑETE
            </p>
            <h2
              id="video-title"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Una colección dedicada a su cuidado.
            </h2>
            <p id="video-description" className="mt-3 text-sm leading-6 text-[#53645B]">
              Conoce las cinco presentaciones en este video de 24 segundos.
              Incluye música instrumental, sin narración.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#173F35]/15 bg-[#092A24] shadow-lg sm:rounded-3xl">
            <video
              controls
              playsInline
              preload="metadata"
              aria-label="Presentación de Puñete por THE PAWMART"
              aria-describedby="video-description"
              className="aspect-video w-full"
            >
              <source
                src="/videos/the-pawmart-punete-presentacion.mp4"
                type="video/mp4"
              />
              Tu navegador no puede reproducir este video.
              <a href="/videos/the-pawmart-punete-presentacion.mp4">
                Descargar presentación de Puñete
              </a>
            </video>
          </div>

          <details className="mt-4 text-sm leading-6 text-[#53645B]">
            <summary className="cursor-pointer py-2 underline underline-offset-4">
              Leer descripción del video
            </summary>
            <p className="mt-2">
              THE PAWMART presenta la colección Puñete con el mensaje
              «Tu compañero. Tu mundo». Aparecen las imágenes de Puñete 5,
              10, 20, 40 y 60. El cierre muestra «Elegiste cuidarlo»,
              un descuento de demostración del 10 % y envíos gratis desde
              S/ 79.90 a todo el Perú. Las compras todavía no están habilitadas.
            </p>
          </details>

          <div className="mt-6 text-center">
            <a
              href="#coleccion"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#173F35] px-7 py-3 text-sm font-semibold text-white hover:bg-[#285949]"
            >
              Explorar productos
            </a>
          </div>
        </section>

        <Catalog view="products" />

        <section id="nosotros" className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#53645B]">HOLA, SOMOS THE PAWMART</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">El cariño está en los detalles.</h2>
          <p className="mt-4 text-base leading-7 text-[#53645B]">
            Nacemos con una idea sencilla: hacer más fácil el cuidado de tus mascotas.
            Porque detrás de cada patita hay un compañero, una historia y un hogar.
          </p>
        </section>
      </main>

      
    </div>
  );
}
