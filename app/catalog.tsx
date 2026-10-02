"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

const compositions: Record<string, {
  fluralaner: number;
  silimarina: number;
}> = {
  "05": { fluralaner: 125, silimarina: 50 },
  "10": { fluralaner: 250, silimarina: 100 },
  "20": { fluralaner: 500, silimarina: 200 },
  "40": { fluralaner: 1000, silimarina: 400 },
  "60": { fluralaner: 1500, silimarina: 600 },
};

const products = [
  { id: "05", name: "Puñete 5", weight: "Hasta 5 kg", cents: 6999, color: "#E5EEDB" },
  { id: "10", name: "Puñete 10", weight: "5–10 kg", cents: 7799, color: "#E9E2F0" },
  { id: "20", name: "Puñete 20", weight: "11–20 kg", cents: 8490, color: "#F3DED0" },
  { id: "40", name: "Puñete 40", weight: "21–40 kg", cents: 10710, color: "#DCEBE3" },
  { id: "60", name: "Puñete 60", weight: "41–60 kg", cents: 12199, color: "#DDE8EF" },
].map((product) => ({
  ...product,
  composition: compositions[product.id],
  originalCents: product.cents,
  cents: Math.round(product.cents * 90 / 100),
}));

const currency = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

const money = (cents: number) => currency.format(cents / 100);

export default function Catalog() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartReady, setCartReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function restoreCart() {
      const restored: Record<string, number> = {};

      try {
        const saved: unknown = JSON.parse(
          localStorage.getItem("the-pawmart-cart-v1") ?? "{}"
        );

        if (saved && typeof saved === "object" && !Array.isArray(saved)) {
          const quantities = saved as Record<string, unknown>;

          for (const product of products) {
            const quantity = quantities[product.id];
            if (
              typeof quantity === "number" &&
              Number.isInteger(quantity) &&
              quantity > 0 &&
              quantity <= 99
            ) {
              restored[product.id] = quantity;
            }
          }
        }
      } catch {
        // Si el navegador bloquea el almacenamiento, el carrito sigue funcionando.
      }

      await Promise.resolve();

      if (!cancelled) {
        setCart(restored);
        setCartReady(true);
      }
    }

    void restoreCart();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!cartReady) return;

    try {
      localStorage.setItem("the-pawmart-cart-v1", JSON.stringify(cart));
    } catch {
      // El carrito puede utilizarse aunque no sea posible guardarlo.
    }
  }, [cart, cartReady]);

  const items = products.filter((product) => (cart[product.id] ?? 0) > 0);
  const count = items.reduce((sum, product) => sum + cart[product.id], 0);
  const subtotal = items.reduce(
    (sum, product) => sum + product.cents * cart[product.id],
    0,
  );

  function changeQuantity(id: string, delta: number) {
    setCart((current) => ({
      ...current,
      [id]: Math.max(0, Math.min(99, (current[id] ?? 0) + delta)),
    }));
  }

  function removeProduct(id: string) {
    setCart((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }

  const quantityButton =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#173F35]/25 text-lg transition hover:bg-[#DCEBE3] disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <section
      id="coleccion"
      aria-labelledby="catalog-title"
      className="border-y border-[#173F35]/10 bg-white"
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-[#53645B]">
              NUESTRA PRIMERA COLECCIÓN
            </p>
            <h2
              id="catalog-title"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Su cuidado empieza aquí.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-[#53645B]">
              Explora las presentaciones de Puñete para perros.
              Toda la colección, en un solo lugar.
            </p>
          </div>

          <a
            href="#carrito"
            className="inline-flex min-h-11 items-center justify-center gap-3 self-start rounded-full bg-[#DCEBE3] px-5 py-3 text-sm font-semibold"
          >
            Ver carrito
            <span className="flex min-w-7 items-center justify-center rounded-full bg-[#173F35] px-2 py-1 text-xs text-white">
              {count}
            </span>
          </a>
        </div>

        <div className="mt-7 rounded-xl border border-[#173F35]/15 bg-[#FAF8F5] px-4 py-3 text-xs leading-5 text-[#53645B]">
          Promoción de demostración: 10 % de descuento sobre precios referenciales de otros comercios, sin
          delivery. Los rangos de peso están pendientes de validación con el
          envase oficial. No se realizan pedidos ni cobros.
        </div>

        <ul className="mt-8 grid list-none grid-cols-1 gap-5 p-0 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#173F35]/15 bg-white"
            >
              <div className="relative aspect-square bg-white">
                <Image
                  src={`/productos/punete-${Number(product.id)}.png`}
                  alt={`Presentación de ${product.name}, para perros: ${product.weight}`}
                  fill
                  sizes="(min-width: 1280px) 220px, (min-width: 1024px) 30vw, (min-width: 480px) 45vw, 90vw"
                  className="object-contain"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-[10px] font-semibold tracking-[0.16em] text-[#53645B]">
                  ANTIPULGAS PARA PERROS
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-[#53645B]">
                  Rango de peso: {product.weight}
                </p>
                <details className="mt-3 text-xs text-[#53645B]">
                  <summary className="flex min-h-11 cursor-pointer items-center underline underline-offset-4 hover:text-[#173F35]">
                    Ver composición
                  </summary>
                  <dl className="space-y-2 rounded-xl bg-[#FAF8F5] p-3">
                    <div>
                      <dt className="font-semibold">Fluralaner</dt>
                      <dd>{product.composition.fluralaner} mg</dd>
                    </div>
                    <div>
                      <dt className="font-semibold">Silimarina</dt>
                      <dd>{product.composition.silimarina} mg</dd>
                    </div>
                  </dl>
                </details>
                <div className="mt-5 border-t border-[#173F35]/10 pt-4">
                  <span className="inline-flex rounded-full bg-[#F4B49D] px-3 py-1 text-xs font-bold text-[#173F35]">
                    −10 %
                  </span>
                  <p className="mt-3 text-xs text-[#53645B]">
                    Precio referencial: <del>{money(product.originalCents)}</del>
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">
                    {money(product.cents)}
                  </p>
                </div>
                <div
                  role="group"
                  aria-label={`Seleccionar cantidad de ${product.name}`}
                  className="mt-5"
                >
                  {(cart[product.id] ?? 0) === 0 ? (
                    <button
                      key="add"
                      type="button"
                      onClick={(event) => {
                        changeQuantity(product.id, 1);
                        const group = event.currentTarget.parentElement;
                        requestAnimationFrame(() => {
                          group?.querySelector<HTMLButtonElement>('[data-increase]')?.focus();
                        });
                      }}
                      aria-label={`Agregar ${product.name} al carrito`}
                      className="min-h-11 w-full rounded-full bg-[#173F35] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#245747]"
                    >
                      Agregar +
                    </button>
                  ) : (
                    <div
                      key="quantity"
                      className="flex min-h-11 items-center justify-between rounded-full bg-[#173F35] p-1 text-white"
                    >
                      <button
                        type="button"
                        onClick={(event) => {
                          const group = event.currentTarget.parentElement?.parentElement;
                          const lastUnit = cart[product.id] === 1;
                          changeQuantity(product.id, -1);
                          if (lastUnit) {
                            requestAnimationFrame(() => {
                              group?.querySelector<HTMLButtonElement>("button")?.focus();
                            });
                          }
                        }}
                        aria-label={`Restar una unidad de ${product.name}`}
                        className="flex h-11 w-11 items-center justify-center rounded-full text-xl hover:bg-white/15"
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center font-semibold tabular-nums">
                        <span className="sr-only">Cantidad: </span>
                        {cart[product.id]}
                      </span>
                      <button
                        type="button"
                        data-increase
                        onClick={() => changeQuantity(product.id, 1)}
                        disabled={cart[product.id] >= 99}
                        aria-label={`Sumar una unidad de ${product.name}`}
                        className="flex h-11 w-11 items-center justify-center rounded-full text-xl hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-2xl text-xs leading-6 text-[#53645B]">
          Imágenes promocionales de cada presentación. Consulta la ficha del producto y las indicaciones de su envase antes de utilizarlo.
        </p>

        <section
          id="carrito"
          aria-labelledby="cart-title"
          className="mt-12 rounded-3xl border border-[#173F35]/15 bg-[#FAF8F5] p-5 sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="cart-title" className="text-2xl font-semibold tracking-tight">
              Tu carrito
            </h2>
            <span className="rounded-full bg-white px-3 py-2 text-xs font-medium">
              Modo de prueba
            </span>
          </div>

          <p role="status" aria-atomic="true" className="mt-3 text-sm text-[#53645B]">
            {count === 0
              ? "Tu carrito está vacío. Agrega una presentación para empezar."
              : `${count} ${count === 1 ? "unidad" : "unidades"} en tu carrito · Subtotal: ${money(subtotal)}`}
          </p>

          {items.length > 0 && (
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_280px]">
              <ul className="min-w-0 divide-y divide-[#173F35]/15">
                {items.map((product) => (
                  <li key={product.id} className="py-5 first:pt-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="mt-1 text-sm text-[#53645B]">
                          {money(product.cents)} por unidad
                        </p>
                      </div>
                      <p className="shrink-0 font-semibold tabular-nums">
                        {money(product.cents * cart[product.id])}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div
                        role="group"
                        aria-label={`Cantidad de ${product.name}`}
                        className="flex items-center gap-2"
                      >
                        <button
                          type="button"
                          onClick={() => changeQuantity(product.id, -1)}
                          disabled={cart[product.id] <= 1}
                          aria-label={`Restar una unidad de ${product.name}`}
                          className={quantityButton}
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center font-semibold tabular-nums">
                          {cart[product.id]}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeQuantity(product.id, 1)}
                          disabled={cart[product.id] >= 99}
                          aria-label={`Sumar una unidad de ${product.name}`}
                          className={quantityButton}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProduct(product.id)}
                        aria-label={`Eliminar ${product.name} del carrito`}
                        className="min-h-11 px-2 text-sm text-[#53645B] underline underline-offset-4 hover:text-[#173F35]"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="self-start rounded-2xl bg-white p-5">
                <h3 className="font-semibold">Resumen</h3>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-xl font-semibold tabular-nums">
                    {money(subtotal)}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-5 text-[#53645B]">
                  Delivery pendiente de calcular según el destino.
                </p>
                <div className="mt-5 border-t border-[#173F35]/10 pt-4 text-sm leading-6 text-[#53645B]">
                  Los pagos aún no están habilitados. Este carrito permite
                  probar la selección de productos.
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
