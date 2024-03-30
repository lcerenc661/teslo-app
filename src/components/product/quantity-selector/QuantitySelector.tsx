'use client';
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import { useState } from 'react';
import clsx from "clsx";

interface Props {
    quantity: number ;
    onQuantityChange: ( quantity: number) => void
}

export const QuantitySelector = ( { quantity, onQuantityChange}: Props) => {

    const onValueChange = ( value: number) =>{
        if (value < 0) return;
        onQuantityChange(value)
    }
  return (
    <div className="flex">
        <button onClick={ ()=> { onValueChange(quantity - 1)}} >
            <IoRemoveCircleOutline size={30} className={
            clsx(
                { "stroke-slate-400": quantity === 0 }, 
            )
        } />
        </button>
        <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded-md">
            { quantity}
        </span>
        <button>
            <IoAddCircleOutline size={"30"} onClick={ ()=> { onValueChange(quantity + 1)}} />
        </button>
    </div>
  )
}