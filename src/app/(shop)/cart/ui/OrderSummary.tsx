"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, []);

  const summaryInformation = useCartStore((store) =>
    store.getSummaryInformation()
  );

  if (!loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-xl p-7 h-max">
        <h2 className="text-2xl mb-2">Order Summary</h2>
        <div className="grid grid-cols-2">
          <span> No. Products</span>
          <span className="text-right">
            {" "}
            {summaryInformation.itemsInCart} Items
          </span>

          <span> Subtotal</span>
          <span className="text-right">
             {currencyFormat(summaryInformation.subsTotal)}{" "}
          </span>

          <span> Taxes (15%)</span>
          <span className="text-right">
             {currencyFormat(summaryInformation.tax)}
          </span>

          <span className="mt-5 text-2xl"> Total</span>
          <span className="text-right mt-5 text-2xl">
            {currencyFormat(summaryInformation.total)}
          </span>
        </div>

        <div className="mt-5 mb-2 w-full">
          <Link
            href="/checkout/address"
            className="flex btn-primary justify-center">
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
};
