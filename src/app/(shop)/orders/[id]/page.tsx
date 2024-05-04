import {
  OrderStatus,
  PayPalButton,
  QuantitySelector,
  Title,
} from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = params;

  const { order, ok } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const address = order!.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* SHOPPING CART */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order!.isPaid} />

            {/* ITEMS */}
            {order?.OrderItem.map((item) => (
              <div
                className="flex mb-5"
                key={item.product.slug + "-" + item.size}
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  alt={item.product.title}
                  className="mr-5 rounded"
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                />
                <div>
                  <p>{item.product.title} </p>
                  <p>
                    {" "}
                    ${item.price} X {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CHECKOUT */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-max">
            <h2 className="text-2xl mb-2">Delivery Address</h2>
            <div className="mb-10">
              <p>
                {address!.firstName} {address!.lastName}
              </p>
              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.postalCode}</p>
              <p>
                {address!.city}, {address!.countryId}
              </p>
              <p>{address!.phone}</p>
            </div>

            {/* DIVIDER */}

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2 mb-4">
              <span> No. Products</span>
              <span className="text-right"> {order?.itemsInOrder} Items</span>

              <span> Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}{" "}
              </span>

              <span> Taxes (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="mt-5 text-2xl"> Total</span>
              <span className="text-right mt-5 text-2xl">
                {currencyFormat(order!.total)}
              </span>
            </div>

            {!order?.isPaid ? (
              <PayPalButton orderId={order!.id} amount={order!.total} />
            ) : (
              <></>
            )}

            <div className="mt-5 mb-2 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
