import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: { gender: Category };
}
export default function Category({ params }: Props) {
  const { gender } = params;
  console.log(gender)

  const products = initialData.products.filter(
    (product) => product.gender === params.gender
  );

  // if ( id ==="kids") {
  //   notFound();
  // }

  return (
    <div>
      <Title title={`${gender}`} subtitle="All Products" className="mb-2 capitalize" />
      {/* <ProductGrid products={products} /> */}
    </div>
  );
}
