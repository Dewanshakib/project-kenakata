import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full max-h-screen mt-32">
      <div className="max-w-xl mx-auto grid place-items-center">
        <h1 className="text-[200px] font-medium">404</h1>

        <p className="text-xl font-medium text-gray-600 mb-5">
          We {`can't`} find the page you were looking for.
        </p>

        <Link className="p-4 font-medium bg-orange-500 w-full text-center text-xl text-white rounded-md" href={"/"}>
          Go to home page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
