import AccountInfo from "@/components/account/account-info";
import { MapPinHouse, PanelTop, UserRoundPen } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Account() {
  // links
  const nav_links = [
    {
      src: "/account/orders",
      name: "Orders",
      logo: <PanelTop />,
    },
    {
      src: "/account/edit-account",
      name: "Edit Account",
      logo: <UserRoundPen />,
    },
    {
      src: "/account/addresses",
      name: "addresses",
      logo: <MapPinHouse />,
    },
  ];

  return (
    <div className="flex-col flex">
      <AccountInfo />
      <div className="flex flex-col md:flex-row gap-4 mt-3 px-2">
        {nav_links.map((link) => (
          <Link
            className="p-10 md:p-20 bg-gray-100 rounded-2xl"
            href={`${link.src}`}
            key={link.name}
          >
            <span className="flex gap-2 font-semibold md:text-lg md:font-bold">
              {link.logo} {link.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
