import { IoCartOutline } from "react-icons/io5";
import Link from "next/link"

export default function Empty() {
  return (
    <div className="flex justify-center items-center h-[800px] gap-2">

      <IoCartOutline size={ 80 } />

      <div className="flex flex-col items-center">

        <h1 className="text-xl font-semibold">
          Your cart is Empty
        </h1>


        <Link href="/">
          Go Back
        </Link>
      </div>
      
    </div>
  );
}