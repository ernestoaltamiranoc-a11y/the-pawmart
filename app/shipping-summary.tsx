"use client";

import { useState } from "react";

const districts = [
  { name: "San Borja", cents: 800 },
  { name: "Surquillo", cents: 800 },
  { name: "Barranco", cents: 1000 },
  { name: "Miraflores", cents: 1000 },
  { name: "San Isidro", cents: 1000 },
  { name: "Santiago de Surco", cents: 1000 },
  { name: "Cercado de Lima", cents: 1200 },
  { name: "Jesús María", cents: 1200 },
  { name: "La Victoria", cents: 1200 },
  { name: "Lince", cents: 1200 },
  { name: "Magdalena del Mar", cents: 1200 },
  { name: "Pueblo Libre", cents: 1200 },
  { name: "San Luis", cents: 1200 },
  { name: "San Miguel", cents: 1200 },
  { name: "Otro distrito de Lima Metropolitana", cents: 1500 },
];

const currency = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

const money = (cents: number) => currency.format(cents / 100);
const freeShippingThreshold = 7990;

export default function ShippingSummary({ subtotal }: { subtotal: number }) {
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");

  const selectedDistrict = districts.find((item) => item.name === district);
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;

  const baseShipping =
    region === "provincias"
      ? 1500
      : region === "lima" && selectedDistrict
        ? selectedDistrict.cents
        : null;

  const shipping = qualifiesForFreeShipping ? 0 : baseShipping;
  const total = shipping === null ? null : subtotal + shipping;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);
  const progress = Math.min(100, subtotal / freeShippingThreshold * 100);

  const selectClass =
    "mt-2 min-h-12 w-full rounded-xl border border-[#173F35]/25 bg-white px-3 py-2 text-sm text-[#173F35]";

  return (
    <div className="self-start rounded-2xl bg-white p-5">
      <h3 className="text-lg font-semibold">Resumen de tu compra</h3>

      <div className="mt-5 rounded-xl bg-[#DCEBE3] p-4">
        <p className="text-sm font-semibold">
          {qualifiesForFreeShipping
            ? "¡Tu pedido tiene envío gratis!"
            : "Te faltan " + money(remaining) + " para envío gratis."}
        </p>
        <progress
          value={progress}
          max={100}
          aria-label="Avance hacia el envío gratis"
          className="mt-3 block h-2 w-full accent-[#173F35]"
        />
        <p className="mt-2 text-xs leading-5 text-[#53645B]">
          Desde S/ 79.90 en productos, después de descuentos.
        </p>
      </div>

      <div className="mt-5">
        <label htmlFor="shipping-region" className="text-sm font-medium">
          ¿Dónde recibirás tu pedido?
        </label>
        <select
          id="shipping-region"
          value={region}
          onChange={(event) => {
            setRegion(event.target.value);
            setDistrict("");
          }}
          className={selectClass}
        >
          <option value="">Selecciona tu destino</option>
          <option value="lima">Lima Metropolitana</option>
          <option value="provincias">Provincias</option>
        </select>
      </div>

      {region === "lima" && (
        <div className="mt-4">
          <label htmlFor="shipping-district" className="text-sm font-medium">
            Distrito de entrega
          </label>
          <select
            id="shipping-district"
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            className={selectClass}
          >
            <option value="">Selecciona tu distrito</option>
            {districts.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {region === "provincias" && (
        <p className="mt-3 text-xs leading-5 text-[#53645B]">
          Entrega estimada de 2 a 4 días, según el destino.
        </p>
      )}

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between gap-3">
          <dt>Productos con descuento</dt>
          <dd className="shrink-0 tabular-nums">{money(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Envío</dt>
          <dd className="text-right font-medium tabular-nums">
            {shipping === null
              ? "Selecciona destino"
              : shipping === 0
                ? "Gratis"
                : money(shipping)}
          </dd>
        </div>
        <div className="flex justify-between gap-3 border-t border-[#173F35]/15 pt-4 text-lg font-semibold">
          <dt>Total</dt>
          <dd className="shrink-0 tabular-nums">
            {total === null ? "Por calcular" : money(total)}
          </dd>
        </div>
      </dl>

      <p role="status" aria-atomic="true" className="sr-only">
        {total === null
          ? "Selecciona tu destino para calcular el total."
          : "Envío: " + (shipping === 0 ? "gratis" : money(shipping ?? 0)) +
            ". Total: " + money(total) + "."}
      </p>

      <p className="mt-5 border-t border-[#173F35]/10 pt-4 text-xs leading-5 text-[#53645B]">
        Simulación de compra. Tarifas distritales propuestas,
        pendientes de validación logística. Los pagos aún no están habilitados.
      </p>
    </div>
  );
}
