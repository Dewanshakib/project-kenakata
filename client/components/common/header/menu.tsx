"use client";
import {
  AlignRight,
  LogIn,
  LogOut,
  ShieldUser,
  ShoppingBasket,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/kk_logo.png";
import { useUserStore } from "@/zustand/user.store";
import LogoutBtn from "@/components/auth/logout-btn";

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

  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const user = useUserStore((state) => state.user);

  return (
    <div className="md:hidden p-1">
      {/* menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-gray-100/80 cursor-pointer hover:transition-all hover:duration-200 p-1.5 rounded-md"
      >
        <AlignRight size={30} />
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
              className="bg-white w-screen sm:w-[70%] h-screen p-2"
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
                <div className="flex flex-col gap-y-4  mt-12">
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
                <div>
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
                <div>
                  <h1 className="text-2xl font-bold border-b border-b-gray-300 mb-1 mt-4">
                    Profile
                  </h1>
                  <div className="mt-3 mb-2">
                    <div className="flex flex-col gap-y-3">
                      {!isAuthenticated && (
                        <Link
                          href={"/login"}
                          className="bg-gray-900 cursor-pointer hover:opacity-90 hover:duration-300 w-full text-white p-1.5 rounded-md font-medium"
                        >
                          <span className="inline-flex items-center justify-center w-full gap-4">
                            <LogIn />
                            Login
                          </span>
                        </Link>
                      )}
                      {isAuthenticated && (
                        <>
                          {user?.role.toLowerCase() === "admin" && (
                            <Link
                              className="py-1.5 grid place-items-center font-medium rounded-md text-center w-full bg-gray-200 border border-gray-300"
                              href={"/admin"}
                            >
                              <span className="inline-flex items-center justify-center w-full gap-4">
                                <ShieldUser />
                                Admin
                              </span>
                            </Link>
                          )}
                          <Link
                            className="py-1.5 grid place-items-center rounded-md font-medium text-center w-full bg-gray-200 border border-gray-300"
                            href={"/account/dashboard"}
                          >
                            <span className="inline-flex items-center justify-center w-full gap-4">
                              <User />
                              Account
                            </span>
                          </Link>
                          <LogoutBtn/>
                        </>
                      )}
                    </div>
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
