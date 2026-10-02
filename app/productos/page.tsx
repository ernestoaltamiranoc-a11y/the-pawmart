import type { Metadata } from "next";
import Catalog from "../catalog";

export const metadata: Metadata = {
  title: "Productos | THE PAWMART",
};

export default function ProductsPage() {
  return (
    <main id="contenido">
      <h1 className="sr-only">Productos de THE PAWMART</h1>
      <Catalog view="products" />
    </main>
  );
}
