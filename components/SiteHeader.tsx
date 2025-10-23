"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, getDefaultRaftingMessage } from "@/lib/getWhatsAppLink";
import { Menu, X } from "lucide-react";

interface SiteHeaderProps {
  phone: string;
}

export default function SiteHeader({ phone }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { href: "#experiencia", label: "Experiencia", isRoute: false },
    { href: "#galeria", label: "Galería", isRoute: false },
    { href: "#faq", label: "FAQ", isRoute: false },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isRoute: boolean) => {
    if (!isRoute && href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/98 backdrop-blur-xl shadow-lg border-b border-grafito/10"
          : "bg-white/95 backdrop-blur-lg shadow-md"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-20 md:h-24 lg:h-24 items-center justify-between">
          <a href="/" className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-5 group">
            {/* Isotipo Solo */}
            <div className="relative flex-shrink-0">
              <img
                src="/images/logo.webp"
                alt="Outdoor Ñuble Logo"
                className="h-12 sm:h-14 md:h-16 lg:h-20 xl:h-24 w-auto transition-transform group-hover:scale-105 drop-shadow-lg"
              />
            </div>
            {/* Texto Vertical */}
            <div className="flex flex-col justify-center -space-y-1">
              <span className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-grafito tracking-tight leading-none group-hover:text-rio transition-colors">
                Outdoor
              </span>
              <span className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-grafito tracking-tight leading-none group-hover:text-rio transition-colors">
                Ñuble
              </span>
            </div>
          </a>

          {/* Desktop Navigation - Diseño Moderno */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.isRoute)}
                className="relative px-4 py-2 text-sm font-semibold text-grafito/80 hover:text-rio transition-all group"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 bg-rio/5 rounded-lg scale-0 group-hover:scale-100 transition-transform origin-center"></span>
              </a>
            ))}
            <Button asChild className="ml-4 bg-gradient-to-r from-rio to-bosque hover:from-rio/90 hover:to-bosque/90 text-white font-bold shadow-lg hover:shadow-xl transition-all rounded-full">
              <a href={getWhatsAppLink(phone, getDefaultRaftingMessage())} target="_blank" rel="noopener noreferrer">
                Reservar Ahora
              </a>
            </Button>
          </nav>

          {/* Mobile Menu Button - Moderno */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-grafito/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-grafito" />
            ) : (
              <Menu className="h-6 w-6 text-grafito" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Diseño Moderno */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-6 space-y-2 border-t border-grafito/10 animate-in slide-in-from-top duration-200">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.isRoute)}
                className="block px-4 py-3 text-base font-semibold text-grafito/80 hover:text-rio hover:bg-rio/5 rounded-lg transition-all"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 px-4">
              <Button asChild className="w-full bg-gradient-to-r from-rio to-bosque hover:from-rio/90 hover:to-bosque/90 text-white font-bold shadow-lg rounded-full">
                <a href={getWhatsAppLink(phone, getDefaultRaftingMessage())} target="_blank" rel="noopener noreferrer">
                  Reservar Ahora
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
