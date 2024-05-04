"use client";

import { placeOrder } from "@/actions/order/place-order";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat, sleep } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const summaryInformation = useCartStore((store) =>
    store.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity,
        size: product.size,
      };
    });

    const resp = await placeOrder(productsToOrder, address);
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    // *Everything went well
    clearCart();
    router.replace("/orders/" + resp.order!.id);
    setIsPlacingOrder(false);
  };

  if (!loaded) {
    return <p>Loading....</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-max">
      <h2 className="text-2xl mb-2">Delivery Address</h2>
      <div className="mb-10">
        <p>
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* DIVIDER */}

      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

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

      <div className="mt-5 mb-2 w-ful">
        <p className="mb-5">
          <span className="text-xs">
            By clicking on &quot;Place Order&quot; you agree with our{" "}
            <a href="#" className="underline">
              terms and conditions
            </a>{" "}
            of data management
          </span>
        </p>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="text-red-500">{errorMessage}</p>
        <button
          // href="/orders/132"
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disable": isPlacingOrder,
          })}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
