"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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

export const products = [
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

export const money = (cents: number) => currency.format(cents / 100);



type CartContextValue = {
  cart: Record<string, number>;
  cartReady: boolean;
  items: typeof products;
  count: number;
  subtotal: number;
  changeQuantity: (id: string, delta: number) => void;
  removeProduct: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
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


  return (
    <CartContext.Provider value={{
      cart, cartReady, items, count, subtotal,
      changeQuantity, removeProduct,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("El carrito necesita CartProvider.");
  }
  return context;
}
