"use client"
import Image from 'next/image'
import React from 'react'
import logo from "@/assets/images/kk_logo.png";

export default function RegisterForm() {
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
          <p className="font-medium text-gray-700">Please Register to view more</p>
        </div>
      </div>
      {/* header ends */}

      {/* content starts*/}
      <div className="mt-10">
        <form action="">
          <div className="mb-3">
            <label htmlFor="Name" className="font-medium">
              Name
            </label>
            <input
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="text"
              placeholder="Dewan Shakib"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Username" className="font-medium">
              Username
            </label>
            <input
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="text"
              placeholder="dewan_op"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="font-medium">
              Email address
            </label>
            <input
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="email"
              placeholder="dewan@gmail.com"
            />
          </div>
          <div className="">
            <label htmlFor="Password" className="font-medium">
              Password
            </label>
            <input
              className="w-full block mt-1 border-2 text-sm border-gray-300 p-1.5 pl-2.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-gray-400"
              type="password"
              placeholder="************"
            />
          </div>
          <div className="mt-3">
            <button className="bg-orange-400 text-gray-100 font-medium hover:bg-orange-500 w-full p-1.5 rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-orange-500">Submit</button>
          </div>
        </form>
      </div>
      {/* content ends*/}
    </div>
  )
}
