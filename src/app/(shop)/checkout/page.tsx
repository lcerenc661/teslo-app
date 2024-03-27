import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Link from "next/link";
import Image from "next/image";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckOut() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verify Order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* SHOPPING CART */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Manage Items</span>
            <Link href="/cart" className="underline mb-5">
              Edit item List
            </Link>

            {/* ITEMS */}
            {productsInCart.map((product) => (
              <div className="flex mb-5" key={product.slug}>
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className="mr-5 rounded"
                  style={{
                    width: '100px',
                    height: '100px'
                  }}
                />
                <div>
                  <p>{product.title} </p>
                  <p> ${product.price} X 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CHECKOUT */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-max">
            <h2 className="text-2xl mb-2">Delivery Address</h2>
            <div className="mb-10">
              <p>Luis Ceren</p>
              <p>Av. Simpre viva 123</p> 
              <p>Col. Centro</p> 
              <p>Alcaldia CuauhTemoc</p> 
              <p>CP 123123</p> 
              <p>123.123.132</p> 
            </div>

            {/* DIVIDER */}

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span> No. Products</span>
              <span className="text-right"> 3 Items</span>

              <span> Subtotal</span>
              <span className="text-right">$ 100</span>

              <span> Taxes (15%)</span>
              <span className="text-right">$ 15</span>

              <span className="mt-5 text-2xl"> Total</span>
              <span className="text-right mt-5 text-2xl">$ 115</span>
            </div>

            <div className="mt-5 mb-2 w-ful">

              <p className="mb-5">

                <span className="text-xs">
                  By clicking on &quot;Place Order&quot; you agree with our <a href="#" className="underline">terms and conditions</a> of data management
                </span>
              </p>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link
                href="/orders/132"
                className="flex btn-primary justify-center">
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
