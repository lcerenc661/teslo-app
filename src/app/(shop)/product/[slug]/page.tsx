export const revalidate = 10080;

import { notFound } from "next/navigation";

import { titleFont } from "@/config/fonts";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from "@/components";
import { getCategories, getProductBySlug } from "@/actions";
import type { Metadata, ResolvingMetadata } from "next";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? "Product not found",
    description: product?.description ?? "",
    // openGraph: {
    //   title: product?.title ?? "Product not found",
    //   description: product?.description ?? "",
    //   // images: [], => comple url image
    //   images: [`/products/${product?.images[1]}`],
    // },
  };
}

export default async function Product({ params }: Props) {
  const { slug } = params;
  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ]);

  if (!product) notFound();

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* SlideShow */}
      <div className="col-span-1 md:col-span-2 flex flex-col">
        {/* DESKTOP SLIDESHOW */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />

        {/* MOBILE SLIDESHOW */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />

        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">${product.price.toFixed(2)} </p>

        {/*Selector de tallas */}

        <AddToCart product={product} />

        {/*Description */}
        <h3 className="font-bold text-sm"> Description </h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
