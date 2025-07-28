import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/images/kk_logo.png";
import Menu from "./menu";

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

  return (
    <div className="sticky top-0 w-full px-8 2xl:px-14">
      <div className="flex justify-between items-center py-2 2xl:py-4">
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

        {/* navlinks & auth section starts -> Desktop*/}
        <div className="hidden md:block">
          <div className="flex items-center gap-x-5">
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
        </div>
        {/* navlinks & auth section ends -> Desktop*/}

        {/* mobile menu starts*/}
            <Menu/>
        {/* mobile menu ends*/}
      </div>
    </div>
  );
}
