import AccountInfo from "@/components/profile/account-info";
import React, { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-5xl mx-auto">
      <AccountInfo />
      {children}
    </div>
  );
}
