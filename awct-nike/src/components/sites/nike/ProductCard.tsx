"use client";
import { useState } from "react";
import { type Product, translate } from "./data";
export function ProductCard({
  product,
  persian,
}: {
  product: Product;
  persian: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const variants = product.images.slice(1);
  const image = selected ? variants[selected] : product.images[0];
  return (
    <article className="product">
      <a className="product-image" href={product.href}>
        <img src={image?.local} alt={product.name} loading="lazy" />
      </a>
      {variants.length > 0 && (
        <div className="swatches" aria-label={`${product.name} colors`}>
          {variants.map((v, i) => (
            <button
              key={v.local + i}
              aria-label={`Select ${v.alt}`}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
              onMouseEnter={() => setSelected(i)}
            >
              <img src={v.local} alt={v.alt} loading="lazy" />
            </button>
          ))}
        </div>
      )}
      <a className="product-copy" href={product.href}>
        {product.status && (
          <span className="status">{translate(product.status, persian)}</span>
        )}
        <h2 dir="auto">{product.name}</h2>
        <p>{translate(product.subtitle || "", persian)}</p>
        <strong dir="ltr">
          {product.price
            ?.match(/\$[\d.]+/g)
            ?.map((price, i) =>
              i === 0 ? (
                <span key={i}>{price}</span>
              ) : (
                <del key={i}>{price}</del>
              ),
            )}
        </strong>
      </a>
    </article>
  );
}
