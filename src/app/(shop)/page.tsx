
export const revalidate = 60; // 60 seconds

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

// import Image from "next/image";

// const products = initialData.products

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ShopPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products,  totalPages } = await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Store" subtitle="All Products" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
