"use client";
import { useUserStore } from "@/zustand/user.store";
import { FilePen, UserPen } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";

export default function EditAccountForm() {
  const user = useUserStore((state) => state.user);
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [imgUrl, setImgUrl] = useState<string | undefined>(user?.avater);
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [loading,setLoading] = useState(false)
  const [formData,setFormData] = useState({})

  const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const photoFile = e.target.files?.[0];
    if (photoFile) {
      const url = URL.createObjectURL(photoFile);
      if (imgUrl) {
        URL.revokeObjectURL(imgUrl);
      }
      setImgUrl(url);
      setImgFile(photoFile)
    }
  };

  // console.log(imgFile)

  const onSumbit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = new FormData()
      // payload.set("")

    } catch (error) {
      console.log(error)
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="p-2 mt-5 flex flex-col md:flex-row max-w-5xl mx-auto w-full justify-between">
      {/* profile image section starts */}
      <div className="">
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
                className="object-contain"
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
      <div className="mt-10 md:mt-0">
        <div className="flex items-center gap-4 mb-12">
          <FilePen size={32} />
          <h1 className="text-2xl font-bold"> Account information</h1>
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="Name" className="font-semibold">
              Name
            </label>
            <input
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="text"
              placeholder="dewan_op"
              required
              defaultValue={user?.name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Username" className="font-semibold">
              Username
            </label>
            <input
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="text"
              required
              placeholder="dewan_op"
              defaultValue={user?.username}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="font-semibold">
              Email
            </label>
            <input
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="text"
              required
              placeholder="dewan_op"
              defaultValue={user?.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Phone" className="font-semibold">
              Phone (optional)
            </label>
            <input
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="number"
              placeholder="8801*********"
              defaultValue={user?.email}
            />
          </div>
          <button
            type="submit"
            className="md:-ml-[100%] md:mt-10 bg-red-500 px-5 py-2 text-white rounded w-full md:w-fit cursor-pointer font-semibold"
          >
            Save Settings
          </button>
        </form>
      </div>
      {/* profile info section ends */}
    </div>
  );
}
