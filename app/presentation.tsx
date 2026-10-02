"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./presentation.module.css";

const collection = [
  { number: 5, color: "#9bd3a9" },
  { number: 10, color: "#baa0e0" },
  { number: 20, color: "#e79191" },
  { number: 40, color: "#8ec5d7" },
  { number: 60, color: "#d8bc86" },
];

export function ShippingBand() {
  const [paused, setPaused] = useState(false);

  return (
    <div className={styles.shipping} data-paused={paused}>
      <span className="sr-only">Envíos gratis desde S/ 79.90 a todo el Perú.</span>
      <div className={styles.shippingWindow} aria-hidden="true">
        <div className={styles.shippingTrack}>
          {[0, 1].map((group) => (
            <div className={styles.shippingGroup} key={group}>
              {[0, 1, 2].map((item) => (
                <span key={item}>ENVÍOS GRATIS DESDE S/ 79.90 · TODO EL PERÚ</span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        className={styles.shippingControl}
        aria-label={paused ? "Reanudar banda de envíos" : "Pausar banda de envíos"}
        onClick={() => setPaused(!paused)}
      >
        {paused ? "▶" : "Ⅱ"}
      </button>
    </div>
  );
}

export default function Presentation() {
  const [paused, setPaused] = useState(false);
  const [run, setRun] = useState(0);

  return (
    <section
      className={styles.hero}
      aria-labelledby="presentation-title"
      data-paused={paused}
    >
      <div key={run} className={styles.stage}>
        <div className={styles.glow} aria-hidden="true" />

        <div className={styles.intro}>
          <p className={styles.eyebrow}>THE PAWMART PRESENTA</p>
          <h1 id="presentation-title" className={styles.title}>
            Pequeñas patas.
            <span>Un amor enorme.</span>
          </h1>
          <p className={styles.description}>
            Descubre Puñete y sus cinco presentaciones para perros.
            El cuidado de tu compañero empieza con una elección informada.
          </p>
          <a href="#coleccion" className={styles.cta}>
            Descubre Puñete <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className={styles.showcase}>
          <div className={styles.orbit} aria-hidden="true" />
          <p className={styles.collectionLabel}>UNA COLECCIÓN. CINCO PRESENTACIONES.</p>

          <ul className={styles.products} aria-label="Presentaciones de Puñete">
            {collection.map((product, index) => (
              <li
                key={product.number}
                className={styles.product}
                style={{ animationDelay: index * 0.55 + "s" }}
              >
                <div className={styles.imageFrame}>
                  <Image
                    src={"/productos/punete-" + product.number + ".png"}
                    alt={"Imagen promocional de Puñete " + product.number}
                    fill
                    sizes="(min-width: 1024px) 190px, (min-width: 640px) 17vw, 29vw"
                    className={styles.image}
                  />
                </div>
                <span className={styles.productName}>
                  <span style={{ backgroundColor: product.color }} />
                  Puñete {product.number}
                </span>
              </li>
            ))}
          </ul>

          <p className={styles.closing}>Elegiste cuidarlo.</p>
        </div>

        <div className={styles.bottom}>
          <p>Para quienes son parte de la familia.</p>
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.pause}
              aria-pressed={paused}
              onClick={() => setPaused(!paused)}
            >
              {paused ? "Reanudar" : "Pausar"}
            </button>
            <button
              type="button"
              onClick={() => {
                setPaused(false);
                setRun(run + 1);
              }}
            >
              Repetir
            </button>
          </div>
        </div>
        <div className={styles.progress} aria-hidden="true" />
      </div>
    </section>
  );
}
