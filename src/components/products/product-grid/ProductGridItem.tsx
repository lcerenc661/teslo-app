"use client";

import { Product } from "@/interfaces";
import { ProductGrid } from "./ProductGrid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  return (
    <div
      className="rounded-md overflow-hidden fade-in"
      onMouseEnter={() => setDisplayImage(product.images[1])}
      onMouseLeave={() => setDisplayImage(product.images[0])}>
      <Link className="hover:text-blue-600" href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="w-full object-cover rounded-md"
          width={500}
          height={500}
        />

        <div className="p-4 flex flex-col">
          {product.title}
          <span className="font-bold">${product.price}</span>
        </div>
      </Link>
    </div>
  );
};
