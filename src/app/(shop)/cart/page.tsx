import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";

export default function Cart() {
  // redirect("/empty");
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Shopping Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* SHOPPING CART */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more Items</span>
            <Link href="/" className="underline mb-5">
              Continue Shopping
            </Link>

            {/* ITEMS */}
            <ProductsInCart />
          </div>

          {/* CHECKOUT */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
