"use client";
import { Search, SearchIcon } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    // search functionality after
    e.preventDefault();
    try {
      if (query.trim() !== "") {
        router.push(`/search?query=${query}`);
      }
    } catch (error) {} finally{
      setIsOpen(!isOpen)
    }
  };

  return (
    <div>
      {/* search icon */}
      <button onClick={handleClick} className="p-2 cursor-pointer">
        <Search size={26} />
      </button>

      {/* search menu field */}
      {isOpen && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed top-0 left-0 z-30 w-screen h-screen bg-black/60 grid place-items-center px-3"
              onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white max-w-xl w-full h-1/2 rounded-xl shadow-lg p-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="relative ">
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Enter your queries..."
                      className="w-full pr-12 pl-5 py-2 rounded-3xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300"
                    />
                    <button
                      type="submit"
                      className="absolute top-1/2 right-2 -translate-y-1/2 bg-black text-white p-2 px-3 cursor-pointer rounded-2xl hover:bg-zinc-800 transition"
                    >
                      <SearchIcon className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                <hr className="mt-6 ml-2 text-gray-300 w-[95%]" />

                <div className="w-[98%] max-h-64 overflow-auto mt-5 p-2 ">
                  <div className="bg-gray-400 w-full h-30 mb-4 rounded-xl"></div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
