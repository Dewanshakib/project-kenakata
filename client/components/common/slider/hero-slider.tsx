"use client";
import React, { useState } from "react";
import person1 from "@/assets/images/hero_img_1.jpeg";
import person2 from "@/assets/images/hero_img_2.jpeg";
import person3 from "@/assets/images/hero_img_3.jpeg";
import person4 from "@/assets/images/hero_img_4.jpeg";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroImageSlider() {
  const images = [
    { id: 1, src: person1 },
    { id: 2, src: person2 },
    { id: 3, src: person3 },
    { id: 4, src: person4 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

//   console.log(currentIndex)

  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
      {/* Buttons */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
       <ChevronLeft className="size-3 md:size-7"/>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
      >
        <ChevronRight className="size-3 md:size-7"/>
      </button>

      {/* Image */}
      <div className="w-full h-full relative">
        <Image
          src={images[currentIndex].src}
          alt="Slider image"
          fill
          className="object-cover transition-all duration-500 ease-in-out"
          priority
        />
      </div>
    </div>
  );
}
