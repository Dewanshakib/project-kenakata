"use client";
import { EditAccountInput, EditAccountSchema } from "@/lib/schema";
import { useUserStore } from "@/zustand/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePen, UserPen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function EditAccountForm() {
  const user = useUserStore((state) => state.user);
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [imgUrl, setImgUrl] = useState<string | undefined>(user?.avater);
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);

  const router = useRouter();

  const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const photoFile = e.target.files?.[0];
    if (photoFile) {
      const url = URL.createObjectURL(photoFile);
      if (imgUrl) {
        URL.revokeObjectURL(imgUrl);
      }
      setImgUrl(url);
      setImgFile(photoFile);
    }
  };

  

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditAccountInput>({
    resolver: zodResolver(EditAccountSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const onSumbit = async (data: EditAccountInput) => {
    try {
      const formData = new FormData();
      if (imgFile) formData.set("file", imgFile);

      formData.set("name", data.name);
      formData.set("username", data.username);
      formData.set("email", data.email);
      if (data.phone !== undefined) formData.set("phone", data.phone);

      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URL! + "/api/users/edit-account",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const result = await res?.json();
      if (!res.ok) {
        console.log(result.message);
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.push("/account/dashboard")
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <div className="p-2 mt-5 flex md:gap-x-30 flex-col md:flex-row max-w-5xl mx-auto w-full justify-between">
      {/* profile image section starts */}
      <div className="w-full">
        <div className="flex items-center gap-4 mb-12">
          <UserPen size={32} />
          <h1 className="text-2xl font-bold"> Profile photo</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          {imgUrl ? (
            <div className="w-40 h-40 relative border border-gray-300 rounded-full overflow-hidden">
              <Image
                src={imgUrl}
                alt="profile photo"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="bg-gray-200 w-40 h-40 rounded-full grid place-items-center">
              <p className="text-5xl font-bold">{user?.name.charAt(0)}</p>
            </div>
          )}

          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={imgRef}
            onChange={handleImageInput}
          />
          <button
            onClick={() => imgRef.current?.click()}
            className="font-semibold border border-gray-300 rounded-md  px-5 py-2 hover:bg-gray-200 duration-300 cursor-pointer"
          >
            Choose your photo
          </button>
        </div>
      </div>
      {/* profile image section ends */}

      {/* profile info section starts */}
      <div className="mt-10 md:mt-0 w-full">
        <div className="flex items-center gap-4 mb-12">
          <FilePen size={32} />
          <h1 className="text-2xl font-bold"> Account information</h1>
        </div>
        <form onSubmit={handleSubmit(onSumbit)}>
          <div className="mb-3">
            <label htmlFor="Name" className="font-semibold">
              Name
            </label>
            <input
              {...register("name")}
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="text"
              placeholder="dewan_op"
            />
            {errors.name && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Username" className="font-semibold">
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
            <label htmlFor="Email" className="font-semibold">
              Email
            </label>
            <input
              {...register("email")}
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="text"
              placeholder="dewan_op"
            />
            {errors.email && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="Phone" className="font-semibold">
              Phone (Required for cash on delivery)
            </label>
            <input
              {...register("phone")}
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="number"
              placeholder="017********"
            />
            {errors.phone && (
              <span className="text-red-500 mt-1 font-medium text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${
              isSubmitting && "opacity-50"
            } md:-ml-[40%] md:mt-14 bg-red-500 px-5 py-2 text-white rounded w-full md:w-fit cursor-pointer font-semibold`}
          >
            {isSubmitting ? "Submitting..." : "Save Settings"}
          </button>
        </form>
      </div>
      {/* profile info section ends */}
    </div>
  );
}
