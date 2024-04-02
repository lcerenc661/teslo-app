"use client";

import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import Link from "next/link";
import Products from "../../../app/(shop)/products/page";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { logout } from "@/actions";
import { useSession } from "next-auth/react";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);

  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session, status } = useSession();
  const isAuthenticated = !!session?.user;
  console.log({session, status})

  return (
    <div>
      {isSideMenuOpen && (
        <>
          {/* BACKGROUND  */}
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>

          {/* Blur */}
          <div
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
            onClick={closeMenu}></div>
        </>
      )}

      {/* SIDEMENU */}

      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}>
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeMenu}
        />
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-50 rounded pl-10 pr-10 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blur-500"
          />
        </div>

        <Link
          href="/profile"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          onClick={closeMenu}>
          <IoPersonOutline size={30} />
          <span className="ml-3 text-xl">Profile</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Orders</span>
        </Link>

        {isAuthenticated ? (
          <button
            className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={() => {
              logout();
            }}>
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Logout</span>
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={closeMenu}>
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Login</span>
          </Link>
        )}

        {/* LINE SEPARATOR */}
        <div className="w-full h-px bg-gray-200 my-10" />

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
          <IoShirtOutline size={30} />
          <span className="ml-3 text-xl">Products</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Orders</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all">
          <IoPeopleOutline size={30} />
          <span className="ml-3 text-xl">Users</span>
        </Link>
      </nav>
    </div>
  );
};
