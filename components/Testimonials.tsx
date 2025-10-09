"use client";

import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white/15 backdrop-blur-md p-6 sm:p-8 rounded-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 shadow-xl"
        >
          {/* Rating Stars */}
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < testimonial.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-300 text-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Testimonial Text */}
          <p className="text-white text-base sm:text-lg mb-6 leading-relaxed drop-shadow-lg">
            "{testimonial.text}"
          </p>

          {/* Author Info */}
          <div className="border-t border-white/20 pt-4">
            <p className="font-montserrat font-bold text-white text-lg drop-shadow-lg">
              {testimonial.name}
            </p>
            <p className="text-white/80 text-sm drop-shadow-lg">
              {testimonial.location}
            </p>
            <p className="text-white/60 text-xs mt-1 drop-shadow-lg">
              {testimonial.date}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
