"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import logo from "@/assets/images/kk_logo.png";
import { IResetPwdErrors } from "@/types/types";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<IResetPwdErrors | null>(null);
  const [formData, setFormData] = useState({
    token: "",
    password: "",
  });
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/users/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res?.json();
      if (res.status === 400) {
        setErrors(data.error);
        return;
      }

      if (res.status === 401) {
        toast.error(data.message);
        setErrors(null);
        return;
      }

      toast.success(data.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl w-full border border-gray-300 p-4 rounded-md">
      <div className="relative w-30 h-36 mx-auto my-4">
        <Image
          src={logo}
          alt="logo"
          fill
          loading="lazy"
          className="object-conatin"
        />
      </div>

      <div className="mb-10">
        <h1 className="text-2xl font-bold mt-5 text-center">Reset password</h1>
      </div>

      <div className="">
        <form onSubmit={onSubmit}>
          <div className="mb-2.5">
            <label htmlFor="Email" className="font-medium">
              Token
            </label>
            <input
              value={formData.token}
              onChange={(e) =>
                setFormData({ ...formData, token: e.target.value })
              }
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="password"
              placeholder="******************"
            />
            {errors?.token &&
              errors.token.map((error) => (
                <p
                  key={error}
                  className="font-semibold text-sm text-red-500 my-2"
                >
                  • {error}
                </p>
              ))}
          </div>
          <div className="mb-2.5">
            <label htmlFor="Email" className="font-medium">
              New password
            </label>
            <input
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="password"
              placeholder="******************"
            />
            {errors?.password &&
              errors.password.map((error) => (
                <p
                  key={error}
                  className="font-semibold text-sm text-red-500 my-2"
                >
                  • {error}
                </p>
              ))}
          </div>
          <div>
            <button
              className={`${
                loading && "opacity-50"
              } bg-orange-400 text-gray-100 font-medium hover:bg-orange-500 w-full p-1.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-orange-500`}
            >
              {loading ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-3 w-fit">
        <Link href={"/forget-password"}>
          <span className="flex border text-sm text-gray-800 w-fit p-2 rounded-md border-gray-300 items-center hover:bg-gray-100 hover:duration-300">
            <ChevronLeft />
            <p className="font-bold pr-2 ">Go back</p>
          </span>
        </Link>
      </div>
    </div>
  );
}
