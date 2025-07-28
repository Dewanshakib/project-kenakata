"use client";
import { MenuIcon, ShoppingBasket, X } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/kk_logo.png";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="md:hidden">
      {/* menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-gray-100/80 cursor-pointer hover:transition-all hover:duration-200 p-1.5 rounded-md"
      >
        <MenuIcon size={30} />
      </button>
      {/* menu button */}

      {/* sidebar starts*/}
      {isOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={(e) => e.target === e.currentTarget && setIsOpen(!isOpen)}
            className="fixed inset-0 top-0 left-0 md:hidden w-screen bg-black/30 h-screen"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              exit={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="bg-white w-screen sm:w-[70%] h-screen"
            >
              <div className="p-4">
                {/* header starts */}
                <div className="flex justify-between items-center">
                  {/* logo starts */}
                  <div className="">
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
                  </div>
                  {/* logo ends */}

                  {/* close btn */}
                  <button
                    className="p-1.5 bg-gray-200 rounded-full cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <X size={26} />
                  </button>
                  {/* close btn */}
                </div>
                {/* header ends */}

                {/* content starts */}
                <div className="flex flex-col gap-y-4 ml-1.5 mt-12">
                  <h1 className="text-2xl font-bold border-b border-b-gray-300 mb-1">
                    Links
                  </h1>

                  {navlinks.map((navlink) => (
                    <Link
                      className="font-medium hover:text-orange-500 duration-200"
                      key={navlink.src}
                      href={navlink.src}
                    >
                      {navlink.name}
                    </Link>
                  ))}
                </div>

                {/* cart btn starts */}
                <div className="ml-1.5">
                  <h1 className="text-2xl font-bold border-b border-b-gray-300 mb-2 mt-5">
                    Cart
                  </h1>
                  <Link
                    href={"/cart"}
                    className="py-1.5 grid place-items-center rounded-md text-center w-full bg-gray-200 border border-gray-300"
                  >
                    <span className="inline-flex gap-x-2 font-semibold">
                      <ShoppingBasket /> Cart
                    </span>
                  </Link>
                </div>
                {/* cart btn ends*/}

                {/* user content starts */}
                <div className="ml-1.5">
                  <h1 className="text-2xl font-bold border-b border-b-gray-300 mb-1 mt-4">
                    Profile
                  </h1>
                  <div className="mt-2 mb-2">
                    <div className="flex flex-col gap-y-4">
                      <Link href={"/login"}>Login</Link>
                      <Link href={"/profile"}>Dashboard</Link>
                      <Link href={"/dashboard"}>Profile</Link>
                    </div>

                    <button className="bg-gray-900 text-white p-1.5 rounded-md font-medium">
                      Logout
                    </button>
                  </div>
                </div>
                {/* user content ends */}

                {/* content ends */}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
      {/* sidebar ends*/}
    </div>
  );
}
