"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  url: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="relative aspect-video overflow-hidden rounded-lg bg-slate-200 transition-transform hover:scale-105"
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-7xl h-[90vh] p-0 bg-black/95">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 text-white hover:text-slate-300 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-8 w-8" />
          </button>

          {selectedImageIndex !== null && (
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <Image
                src={images[selectedImageIndex].url}
                alt={images[selectedImageIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />

              {/* Navigation Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                {selectedImageIndex + 1} / {images.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
