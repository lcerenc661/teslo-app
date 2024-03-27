'use client';
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { useState } from 'react';
import clsx from "clsx";

interface Props {
    quantity: number ;
}

export const QuantitySelector = ( { quantity}: Props) => {

    const [count, setCount] = useState( quantity);
    const onQuantityChange = ( value: number) =>{
        if (value < 0) return;
        setCount(value)
    }
  return (
    <div className="flex">
        <button onClick={ ()=> { onQuantityChange(count - 1)}} >
            <IoRemoveCircleOutline size={30} className={
            clsx(
                { "stroke-slate-400": count === 0 }, 
            )
        } />
        </button>
        <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded-md">
            { count}
        </span>
        <button>
            <IoAddCircleOutline size={"30"} onClick={ ()=> { onQuantityChange(count + 1)}} />
        </button>
    </div>
  )
}