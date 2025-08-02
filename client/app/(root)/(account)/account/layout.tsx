import React, { ReactNode } from "react";

export default function AccountLayout({ children}: { children: ReactNode }) {


  return (
    <div className="mb-5">
      {children}
    </div>
  );
}
