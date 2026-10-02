import type { Metadata } from "next";
import Catalog from "../catalog";

export const metadata: Metadata = {
  title: "Tu carrito | THE PAWMART",
};

export default function CartPage() {
  return (
    <main id="contenido">
      <h1 className="sr-only">Carrito de compra</h1>
      <Catalog view="cart" />
    </main>
  );
}
