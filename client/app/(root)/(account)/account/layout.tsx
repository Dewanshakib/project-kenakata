import AccountInfo from "@/components/account/account-info";
import React, { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5">
      <AccountInfo />
      {children}
    </div>
  );
}
