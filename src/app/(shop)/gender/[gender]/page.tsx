export const revalidate = 60; // 60 seconds

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: { gender: string },
  searchParams: {
    page?: string;
  }
}
export default async function Category({ params, searchParams }: Props) {
  const { gender } = params;
  
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }


  return (
    <div>
      <Title title={`${gender}`} subtitle="All Products" className="mb-2 capitalize" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
