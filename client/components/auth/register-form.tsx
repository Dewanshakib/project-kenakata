"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/images/kk_logo.png";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { RegisterInput, RegisterSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterForm() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/users/register",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res?.json();
      if (!res.ok) {
        console.log("error");
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
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
          <p className="font-medium text-gray-700">
            Please Register to view more
          </p>
        </div>
      </div>
      {/* header ends */}

      {/* content starts*/}
      <div className="mt-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="Name" className="font-medium">
              Name
            </label>
            <input
              {...register("name")}
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="text"
              placeholder="Dewan Shakib"
            />
            {errors.name && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Username" className="font-medium">
              Username
            </label>
            <input
              {...register("username")}
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="text"
              placeholder="dewan_op"
            />
            {errors.username && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="font-medium">
              Email address
            </label>
            <input
              {...register("email")}
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              // type="email"
              placeholder="dewan@gmail.com"
            />
            {errors.email && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="relative">
            <label htmlFor="Password" className="font-medium">
              Password
            </label>
            <input
              {...register("password")}
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type={isOpen ? "text" : "password"}
              placeholder="************"
            />
            {errors.password && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.password.message}
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="absolute top-8.5 right-2"
            >
              {isOpen ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>
          <div className="mt-3.5">
            <button
              className={`${
                isSubmitting && "opacity-50"
              } bg-orange-400 text-gray-100 font-medium hover:bg-orange-500 w-full p-1.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-orange-500`}
            >
              {isSubmitting ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      {/* content ends*/}
      {/* content footer starts*/}
      <div className="mt-2">
        <span className="text-sm font-medium">
          Already have an account?{" "}
          <Link
            className="font-semibold text-blue-500 underline"
            href={"/login"}
          >
            Login
          </Link>{" "}
        </span>
      </div>
      {/* content footer ends*/}
    </div>
  );
}
