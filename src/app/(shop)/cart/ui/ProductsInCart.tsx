"use client";

import { ProductImage, QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div className="flex mb-5" key={`${product.slug}-${product.size}`}>
          <ProductImage
            src={product.image as string}
            width={100}
            height={100}
            alt={product.title}
            className="mr-5 rounded"
            style={{
              width: "100px",
              height: "100px",
            }}
          />
          <div>
            <Link
              href={`/product/${product.slug}`}
              className="hover:underline cursor-pointer">
               {product.title} - { product.size}
            </Link>
            <p> ${product.price} </p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
            <button
              className="underline mt-3"
              onClick={() => removeProduct(product)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
