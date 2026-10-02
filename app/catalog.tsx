"use client";

import Image from "next/image";
import Link from "next/link";
import ShippingSummary from "./shipping-summary";
import { products, money, useCart } from "./cart-provider";

export default function Catalog({
  view = "products",
}: {
  view?: "products" | "cart";
}) {
  const {
    cart, cartReady, items, count, subtotal,
    changeQuantity, removeProduct,
  } = useCart();

  if (!cartReady) {
    return (
      <p role="status" className="px-6 py-12 text-center text-[#53645B]">
        Preparando tu selección…
      </p>
    );
  }

  const quantityButton =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#173F35]/25 text-lg transition hover:bg-[#DCEBE3] disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <section
      id={view === "cart" ? "seleccion" : "coleccion"}
      aria-labelledby={view === "cart" ? "cart-title" : "catalog-title"}
      className="border-y border-[#173F35]/10 bg-white"
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        {view === "products" && (<>
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

          <Link href="/carrito"
            className="inline-flex min-h-11 items-center justify-center gap-3 self-start rounded-full bg-[#DCEBE3] px-5 py-3 text-sm font-semibold"
          >
            Ver carrito
            <span className="flex min-w-7 items-center justify-center rounded-full bg-[#173F35] px-2 py-1 text-xs text-white">
              {count}
            </span>
          </Link>
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
              <div className="relative aspect-[4/5] overflow-hidden bg-white">
                <Image
                  src={`/productos/punete-${Number(product.id)}.png`}
                  alt={`Presentación de ${product.name}, para perros: ${product.weight}`}
                  fill
                  sizes="(min-width: 1280px) 220px, (min-width: 1024px) 30vw, (min-width: 480px) 45vw, 90vw"
                  className="object-cover object-center"
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

        
</>)}
{view === "cart" && (<>
<Link href="/productos" className="inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4">← Seguir comprando</Link>
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

          {items.length > 0 && (
            <div className="mt-5 rounded-2xl bg-[#DCEBE3] px-5 py-4">
              <p className="text-lg font-semibold tracking-tight">
                Elegiste cuidarlo.
              </p>
              <p className="mt-1 text-sm leading-6 text-[#53645B]">
                Gracias por confiar en THE PAWMART.
              </p>
            </div>
          )}

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
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-white">
                          <Image
                            src={`/productos/punete-${Number(product.id)}.png`}
                            alt={`Presentación de ${product.name}`}
                            fill
                            sizes="64px"
                            className="object-cover object-center"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="mt-1 text-sm text-[#53645B]">
                            {money(product.cents)} por unidad
                          </p>
                        </div>
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

              <ShippingSummary subtotal={subtotal} />
            </div>
          )}
        </section>
</>)}

      </div>
    </section>
  );
}
