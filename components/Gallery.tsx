"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'unset';
    setIsTransitioning(false);
  };

  const scrollToThumbnail = (index: number) => {
    if (thumbnailsRef.current) {
      const thumbnail = thumbnailsRef.current.children[index] as HTMLElement;
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && !isTransitioning) {
      setIsTransitioning(true);
      const newIndex = (selectedImageIndex - 1 + images.length) % images.length;
      setTimeout(() => {
        setSelectedImageIndex(newIndex);
        scrollToThumbnail(newIndex);
        setIsTransitioning(false);
      }, 200);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex !== null && !isTransitioning) {
      setIsTransitioning(true);
      const newIndex = (selectedImageIndex + 1) % images.length;
      setTimeout(() => {
        setSelectedImageIndex(newIndex);
        scrollToThumbnail(newIndex);
        setIsTransitioning(false);
      }, 200);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, isTransitioning]);

  // Center thumbnail when lightbox opens
  useEffect(() => {
    if (selectedImageIndex !== null) {
      setTimeout(() => scrollToThumbnail(selectedImageIndex), 100);
    }
  }, [selectedImageIndex]);

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

      {/* Custom Lightbox */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] animate-in fade-in duration-500"
          onClick={closeLightbox}
        >
          {/* Imagen de fondo difuminada */}
          <div className="absolute inset-0">
            <Image
              src={images[selectedImageIndex].url}
              alt="Background"
              fill
              className="object-cover blur-3xl scale-110 opacity-30"
              sizes="100vw"
              quality={30}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-grafito/70 via-grafito/80 to-grafito/90 backdrop-blur-sm" />
          </div>

          {/* Header con botón cerrar */}
          <div className="absolute top-0 left-0 right-0 z-[10000] flex items-center justify-between p-4 md:p-6">
            <div className="flex items-center gap-3">
              <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="text-white/90 text-sm font-medium">
                  {selectedImageIndex + 1} / {images.length}
                </span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="text-white/80 hover:text-white transition-all duration-300 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full p-2.5 border border-white/20 hover:scale-110"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>

          {/* Contenedor principal con imagen */}
          <div className="absolute inset-0 flex flex-col pt-20 pb-32 md:pb-36">
            <div className="flex-1 flex items-center justify-center px-4 md:px-8">
              {/* Imagen principal */}
              <div
                className={`relative w-full h-full max-w-5xl transition-all duration-500 ${isTransitioning ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[selectedImageIndex].url}
                  alt={images[selectedImageIndex].alt}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="100vw"
                  priority
                  quality={100}
                />
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                disabled={isTransitioning}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-xl text-white rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 hover:-translate-x-1 z-[10000] border border-white/20 disabled:opacity-30 disabled:cursor-not-allowed shadow-2xl"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                disabled={isTransitioning}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-xl text-white rounded-full p-3 md:p-4 transition-all duration-300 hover:scale-110 hover:translate-x-1 z-[10000] border border-white/20 disabled:opacity-30 disabled:cursor-not-allowed shadow-2xl"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
          </div>

          {/* Galería de miniaturas en el footer */}
          <div
            className="absolute bottom-0 left-0 right-0 z-[10000] bg-gradient-to-t from-black/60 via-black/40 to-transparent backdrop-blur-lg border-t border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full px-4 py-4 md:py-6">
              <div className="flex justify-center">
                <div
                  ref={thumbnailsRef}
                  className="flex gap-2 md:gap-3 overflow-x-auto pb-2 px-4 max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isTransitioning) {
                          setIsTransitioning(true);
                          setTimeout(() => {
                            setSelectedImageIndex(index);
                            scrollToThumbnail(index);
                            setIsTransitioning(false);
                          }, 200);
                        }
                      }}
                      className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                        index === selectedImageIndex
                          ? 'border-rio scale-110 shadow-lg shadow-rio/50 ring-2 ring-rio/30'
                          : 'border-white/20 hover:border-white/50 hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`Ver ${image.alt}`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                      {index === selectedImageIndex && (
                        <div className="absolute inset-0 bg-rio/20" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
