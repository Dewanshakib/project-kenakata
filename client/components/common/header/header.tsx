"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/images/kk_logo.png";
import Menu from "./menu";
import { ShieldUser, ShoppingBasket, User } from "lucide-react";
import { useUserStore } from "@/zustand/user.store";
import SearchBar from "../search/search-bar";

export default function Header() {
  // navlinks
  const navlinks = [
    {
      src: "/",
      name: "Home",
    },
    {
      src: "/men",
      name: "Men",
    },
    {
      src: "/women",
      name: "Women",
    },
    {
      src: "/kids",
      name: "Kids",
    },
    {
      src: "/about",
      name: "About",
    },
    {
      src: "/contact",
      name: "Contact",
    },
  ];

  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);

  return (
    isAuthenticated && (
      <div className="sticky top-0 w-full z-50 px-6 lg:px-8 2xl:px-14 backdrop-blur-sm bg-white/10 border-b border-b-gray-300">
        <div className="flex justify-between items-center py-2 2xl:py-4 ">
          {/* logo & search icon starts */}
          <div className="flex flex-1 gap-6 items-center">
            <Link href={"/"}>
              <section className="relative w-15 h-15">
                <Image
                  src={logo}
                  alt="logo"
                  fill
                  loading="lazy"
                  className="object-contain"
                />
              </section>
            </Link>

            <SearchBar />
          </div>
          {/* logo & search icon ends */}

          {/* navlinks & auth section starts -> Desktop*/}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-x-5">
              {navlinks.map((navlink) => (
                <Link
                  className="font-semibold hover:text-orange-500 duration-200"
                  key={navlink.src}
                  href={navlink.src}
                >
                  {navlink.name}
                </Link>
              ))}
            </div>
            {/* auth section starts */}
            {isAuthenticated && (
              <div className="ml-5 flex items-center gap-2 relative">
                {user?.role.toLowerCase() === "admin" && (
                  <Link
                    href={"/admin"}
                    className="px-4 rounded-md font-medium cursor-pointer py-2 bg-gray-700 text-white hover:duration-300 hover:opacity-90"
                  >
                    <span className="flex gap-2">
                      <ShieldUser />
                      <p>Admin</p>
                    </span>
                  </Link>
                )}
                <Link
                  href={`/account/dashboard`}
                  className="px-4 rounded-md font-medium cursor-pointer py-2 border border-gray-300 hover:duration-300 hover:opacity-90"
                >
                  <span className="flex gap-2">
                    <User />
                    <p>Account</p>
                  </span>
                </Link>
                <Link
                  href={"/cart"}
                  className="p-2 rounded-md font-medium cursor-pointer hover:duration-300 hover:opacity-90"
                >
                  <span className="absolute top-0 right-1.5 rounded-full text-xs font-medium">
                    0
                  </span>
                  <ShoppingBasket size={34} />
                </Link>
              </div>
            )}
            {/* auth section ends */}
          </div>
          {/* navlinks & auth section ends -> Desktop*/}

          {/* mobile menu starts*/}
          <Menu />
          {/* mobile menu ends*/}
        </div>
      </div>
    )
  );
}
