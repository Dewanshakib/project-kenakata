"use client";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import logo from "@/assets/images/kk_logo.png";
import { IUserInput, IErrors } from "@/types/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function LoginForm() {
  const [formData, setFormData] = useState<IUserInput>({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<IErrors | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/users/login",
        {
          method: "POST",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res?.json();
      if (res.status === 400) {
        setErrors(data.message);
        return;
      }

      toast.success(data.message);
      setErrors(null);
      router.push("/");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full border border-gray-300 p-4 rounded-md">
      {/* header starts */}
      <div className="">
        <div className="relative w-full h-40">
          <Image
            src={logo}
            fill
            loading="lazy"
            alt="logo"
            className="object-contain"
          />
        </div>
        <div className="text-center mt-6">
          <h1 className="text-2xl font-bold">Welcome to Kena Kata</h1>
          <p className="font-medium text-gray-700">Please login to view more</p>
        </div>
      </div>
      {/* header ends */}

      {/* content starts*/}
      <div className="mt-10">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="Username" className="font-medium">
              Username
            </label>
            <input
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="text"
              placeholder="dewan_op"
            />
            {errors?.username &&
              errors.username.map((error) => (
                <p key={error} className="font-semibold text-sm text-red-500 my-2">
                  • {error}
                </p>
              ))}
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="font-medium">
              Email address
            </label>
            <input
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="email"
              placeholder="dewan@gmail.com"
            />
            {errors?.email &&
              errors.email.map((error) => (
                <p key={error} className="font-semibold text-sm text-red-500 my-2">
                  • {error}
                </p>
              ))}
          </div>
          <div className="relative">
            <label htmlFor="Password" className="font-medium">
              Password
            </label>
            <input
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type={isOpen ? "text" : "password"}
              placeholder="************"
            />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="absolute top-8.5 right-2"
            >
              {isOpen ? <EyeIcon /> : <EyeOffIcon />}
            </button>
            {errors?.password &&
              errors.password.map((error) => (
                <p key={error} className="font-semibold text-sm text-red-500 my-2">
                  • {error}
                </p>
              ))}
          </div>
          <div className="mt-3.5">
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
      {/* content ends*/}

      {/* content footer starts*/}
      <div className="mt-2">
        <span className="text-sm font-medium">
          {`Don't`} have an account?{" "}
          <Link
            className="font-semibold text-blue-500 underline"
            href={"/register"}
          >
            Register
          </Link>{" "}
        </span>
      </div>
      {/* content footer ends*/}
    </div>
  );
}
