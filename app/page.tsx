"use client";

import { Button } from "@/components/ui/button";
import WhatsAppFloatingCTA from "@/components/WhatsAppFloatingCTA";
import SideNavigation from "@/components/SideNavigation";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import SocialShare from "@/components/SocialShare";
// import RaftingMap from "@/components/RaftingMap";
import { getWhatsAppLink, getDefaultRaftingMessage } from "@/lib/getWhatsAppLink";
import { Clock, Users, MapPin, Star, Shield, Award, Heart, ChevronDown, Check, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Estilos para animación de zoom loop
const styles = `
  @keyframes subtleZoom {
    0%, 100% {
      transform: scale(1.05);
    }
    50% {
      transform: scale(1.25);
    }
  }
  .animate-subtle-zoom {
    animation: subtleZoom 8s ease-in-out infinite;
  }
`;

function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "", decimals = 0 }: { end: number; duration?: number; suffix?: string; prefix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const currentCount = progress * end;
      setCount(decimals > 0 ? parseFloat(currentCount.toFixed(decimals)) : Math.floor(currentCount));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration, decimals]);

  return (
    <div ref={counterRef} className="font-montserrat font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-1 sm:mb-2 drop-shadow-lg">
      {prefix}{count}{suffix}
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);
  const [hoveredExperience, setHoveredExperience] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const experienciasRef = useRef<HTMLElement>(null);
  const nosotrosRef = useRef<HTMLElement>(null);
  const actividadesExtrasRef = useRef<HTMLElement>(null);
  const empresasRef = useRef<HTMLElement>(null);
  const testimoniosRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);

      // Get section positions
      const experienciasTop = experienciasRef.current?.offsetTop || 0;
      const nosotrosTop = nosotrosRef.current?.offsetTop || 0;
      const actividadesExtrasTop = actividadesExtrasRef.current?.offsetTop || 0;
      const empresasTop = empresasRef.current?.offsetTop || 0;
      const testimoniosTop = testimoniosRef.current?.offsetTop || 0;
      const scrollY = window.scrollY;
      const triggerPoint = window.innerHeight * 0.5; // Trigger when section is halfway in viewport

      // Determine which image to show based on scroll position
      if (scrollY + triggerPoint >= testimoniosTop) {
        setCurrentImage(6); // Testimonios
      } else if (scrollY + triggerPoint >= empresasTop) {
        setCurrentImage(5); // Empresas, Colegios e Instituciones
      } else if (scrollY + triggerPoint >= actividadesExtrasTop) {
        setCurrentImage(4); // Actividades Extras
      } else if (scrollY + triggerPoint >= nosotrosTop) {
        setCurrentImage(3); // 20 Años de Aventura
      } else if (scrollY + triggerPoint >= experienciasTop) {
        setCurrentImage(2); // Elige tu Aventura
      } else {
        setCurrentImage(1); // Hero Principal
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll personalizado
  useEffect(() => {
    const smoothScrollTo = (target: HTMLElement, duration: number = 2000) => {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function - easeInOutCubic
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);

          if (targetElement) {
            smoothScrollTo(targetElement, 1800);
          }
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <WhatsAppFloatingCTA phone="+56932344214" />
      <SideNavigation />

      {/* Fixed Background Images */}
      <div className="fixed top-0 left-0 right-0 h-screen -z-10 overflow-hidden">
        {/* Image 1 - Hero Principal */}
        <img
          src="/images/Fondos/freepik__aleja-mas-la-toma-que-vea-mas-lejos-la-situacion-t__94118.webp"
          alt="Vista aérea Rafting Outdoor Ñuble"
          className="absolute w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: currentImage === 1 ? 1 : 0,
            objectPosition: 'center 40%'
          }}
        />

        {/* Image 2 - Elige tu Aventura */}
        <img
          src="/images/Fondos/freepik__aleja-mas-la-toma-que-vea-mas-lejos-la-situacion-t__94119.webp"
          alt="Elige tu Aventura Rafting Outdoor Ñuble"
          className="absolute w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: currentImage === 2 ? 1 : 0,
            objectPosition: 'center 40%'
          }}
        />

        {/* Image 3 - 20 Años de Aventura */}
        <img
          src="/images/3.webp"
          alt="20 Años de Aventura en el Río Ñuble"
          className="absolute w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: currentImage === 3 ? 1 : 0,
            objectPosition: 'center 40%'
          }}
        />

        {/* Image 4 - Actividades Extras */}
        <img
          src="/images/Fondos/freepik__genera-una-toma-senital-de-esta-imagen-vista-desde__94120.webp"
          alt="Actividades Extras en Outdoor Ñuble"
          className="absolute w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: currentImage === 4 ? 1 : 0,
            objectPosition: 'center 40%'
          }}
        />

        {/* Image 5 - Empresas, Colegios e Instituciones */}
        <img
          src="/images/Fondos/freepik__llevala-a-foramto__70857_11zon.webp"
          alt="Empresas, Colegios e Instituciones - Outdoor Ñuble"
          className="absolute w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: currentImage === 5 ? 1 : 0,
            objectPosition: 'center 40%'
          }}
        />

        {/* Image 6 - Testimonios */}
        <img
          src="/images/Fondos/freepik__haz-que-se-vea-un-grupo-donde-un-anglulo-tras-los-__94122.webp"
          alt="Testimonios - Outdoor Ñuble"
          className="absolute w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: currentImage === 6 ? 1 : 0,
            objectPosition: 'center 40%'
          }}
        />

        {/* Overlay gradient - sutil y elegante para mejor integración */}
        <div className="absolute inset-0 bg-gradient-to-br from-grafito/50 via-grafito/10 to-transparent md:from-grafito/40 md:via-transparent md:to-grafito/20" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ease-out ${scrolled ? 'bg-black/70 backdrop-blur-xl shadow-2xl' : 'bg-transparent py-3 sm:py-4 md:py-6'}`}
      >
        <div className={`transition-all duration-1000 ease-out ${scrolled ? 'w-full px-4 sm:px-8 md:px-12 py-3 sm:py-4' : 'container mx-auto px-6 sm:px-8 xl:pl-32'}`}>
          {/* Gradient accent line on top when scrolled */}
          <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-rio to-transparent transition-opacity duration-1000 ${scrolled ? 'opacity-60' : 'opacity-0'}`}></div>

          <div className="flex items-center justify-between transition-all duration-1000 ease-out">
            <div className="flex flex-col gap-2 sm:gap-3">
              <a href="#" className="flex items-center gap-2 sm:gap-3 transition-all duration-1000 ease-out">
                <img
                  src="/images/isotipo.svg"
                  alt="Outdoor Ñuble"
                  className={`w-auto transition-all duration-1000 ease-out ${scrolled ? 'h-9 sm:h-11' : 'h-14 sm:h-16 md:h-20 lg:h-24'}`}
                />
                <div className={`font-montserrat leading-none flex flex-col justify-center transition-all duration-1000 ease-out ${scrolled ? 'text-white h-9 sm:h-11' : 'text-white drop-shadow-2xl h-14 sm:h-16 md:h-20 lg:h-24'}`}>
                  <div className={`font-normal tracking-[0.15em] transition-all duration-1000 ease-out ${scrolled ? 'text-base sm:text-lg mb-0' : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-0.5'}`}>OUTDOOR</div>
                  <div className={`font-black transition-all duration-1000 ease-out ${scrolled ? 'text-base sm:text-lg tracking-[0.3em]' : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-[0.3em] sm:tracking-[0.5em] md:tracking-[0.72em]'}`} style={{ width: 'fit-content' }}>ÑUBLE</div>
                </div>
              </a>

              {/* Badge UNESCO debajo del logo */}
              <div className={`transition-all duration-1000 ease-out ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'} flex`}>
                <span className="bg-white/10 backdrop-blur-xl text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs md:text-sm font-semibold border border-white/30 shadow-lg uppercase tracking-wide flex items-center justify-center gap-2 flex-1 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-rio animate-pulse"></span>
                  <span>Reserva Biósfera UNESCO</span>
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center transition-all duration-1000 ease-out ${scrolled ? 'gap-6' : 'gap-8'}`}>
              <a href="#experiencias" className={`font-montserrat font-semibold relative group transition-all duration-700 ease-out ${scrolled ? 'text-white/90 hover:text-white text-sm' : 'text-white hover:text-rio text-lg drop-shadow-lg'}`}>
                Experiencias
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-rio to-bosque transition-all duration-300 ease-out ${scrolled ? 'w-0 group-hover:w-full' : 'w-0'}`}></span>
              </a>
              <a href="#nosotros" className={`font-montserrat font-semibold relative group transition-all duration-700 ease-out ${scrolled ? 'text-white/90 hover:text-white text-sm' : 'text-white hover:text-rio text-lg drop-shadow-lg'}`}>
                Nosotros
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-rio to-bosque transition-all duration-300 ease-out ${scrolled ? 'w-0 group-hover:w-full' : 'w-0'}`}></span>
              </a>
              <Button
                asChild
                className={`bg-gradient-to-r from-rio to-bosque hover:from-rio/90 hover:to-bosque/90 text-white rounded-full font-semibold transition-all duration-700 ease-out ${scrolled ? 'px-6 py-2 text-sm shadow-[0_4px_20px_rgba(10,132,174,0.4)] hover:shadow-[0_6px_25px_rgba(10,132,174,0.6)]' : 'px-8 py-3 shadow-xl'}`}
              >
                <a href={getWhatsAppLink("+56932344214", getDefaultRaftingMessage())} target="_blank" rel="noopener noreferrer">
                  Reservar Ahora
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/20 animate-in slide-in-from-top duration-200 max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col p-6 gap-3">
              <a
                href="#hero"
                className="text-white font-montserrat font-semibold py-3 px-4 hover:text-rio hover:bg-white/5 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </a>
              <a
                href="#experiencias"
                className="text-white font-montserrat font-semibold py-3 px-4 hover:text-rio hover:bg-white/5 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Experiencias
              </a>
              <a
                href="#actividades-extras"
                className="text-white font-montserrat font-semibold py-3 px-4 hover:text-rio hover:bg-white/5 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Actividades Extras
              </a>
              <a
                href="#empresas"
                className="text-white font-montserrat font-semibold py-3 px-4 hover:text-rio hover:bg-white/5 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Grupos Corporativos
              </a>
              <a
                href="#galeria"
                className="text-white font-montserrat font-semibold py-3 px-4 hover:text-rio hover:bg-white/5 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Galería
              </a>
              <a
                href="#testimonios"
                className="text-white font-montserrat font-semibold py-3 px-4 hover:text-rio hover:bg-white/5 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonios
              </a>
              <a
                href="#nosotros"
                className="text-white font-montserrat font-semibold py-3 px-4 hover:text-rio hover:bg-white/5 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nosotros
              </a>
              <a
                href="#contacto"
                className="text-white font-montserrat font-semibold py-3 px-4 hover:text-rio hover:bg-white/5 rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contacto
              </a>

              <div className="border-t border-white/20 pt-4 mt-2">
                <Button
                  asChild
                  className="bg-gradient-to-r from-rio to-bosque text-white rounded-full w-full py-4 text-base font-bold shadow-lg"
                >
                  <a href={getWhatsAppLink("+56932344214", getDefaultRaftingMessage())} target="_blank" rel="noopener noreferrer">
                    Reservar Ahora
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero - Dynamic Scroll Images */}
        <section id="hero" className="relative min-h-screen">
          {/* Hero Content */}
          <div className="relative min-h-screen flex items-start sm:items-center justify-start pt-32 sm:pt-28 md:pt-32 lg:pt-40 pb-16 sm:pb-20">
            <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-12 xl:pl-24">
              <div className="max-w-2xl lg:max-w-3xl">
                {/* Título optimizado */}
                <h1 className="font-montserrat font-black text-[2rem] leading-[1.15] sm:text-[2.75rem] md:text-5xl lg:text-6xl text-white mb-4 sm:mb-6 animate-in fade-in duration-700 delay-150" style={{ textShadow: '0 4px 24px rgba(0,0,0,0.95), 0 2px 12px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.6)' }}>
                  Vive la Aventura<br />
                  <span className="text-white/95">del Río Ñuble</span>
                </h1>

                {/* Descripción más sutil */}
                <p className="text-sm sm:text-lg md:text-xl text-white mb-5 sm:mb-7 md:mb-8 font-montserrat font-medium leading-relaxed animate-in fade-in duration-700 delay-300 max-w-lg" style={{ textShadow: '0 3px 16px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7), 0 0 3px rgba(0,0,0,0.5)' }}>
                  Rafting profesional con guías certificados en San Fabián de Alico
                </p>

                {/* Botones más integrados y elegantes */}
                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 animate-in fade-in duration-700 delay-500">
                  <Button
                    asChild
                    className="group relative overflow-hidden bg-gradient-to-r from-rio to-bosque hover:from-rio/90 hover:to-bosque/90 text-white px-6 sm:px-9 py-3 sm:py-5 text-sm sm:text-lg rounded-full shadow-[0_8px_30px_rgba(10,132,174,0.4)] hover:shadow-[0_12px_40px_rgba(10,132,174,0.6)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 font-semibold border-2 border-white/20"
                  >
                    <a href="#experiencias" className="flex items-center gap-2 justify-center relative z-10">
                      <span>Descubre Aventuras</span>
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="group relative overflow-hidden border-2 border-white/70 text-white bg-white/10 hover:bg-white/20 hover:border-white/90 px-6 sm:px-9 py-3 sm:py-5 text-sm sm:text-lg rounded-full backdrop-blur-xl transition-all duration-300 font-semibold shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.3)] hover:scale-[1.03] active:scale-[0.97]"
                  >
                    <a href={getWhatsAppLink("+56932344214", getDefaultRaftingMessage())} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center relative z-10">
                      <span>Reservar Ahora</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Scroll Indicator más sutil */}
            <a href="#experiencias" className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-all duration-300 group">
              <div className="flex flex-col items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-montserrat font-medium uppercase tracking-widest drop-shadow-lg">Descubre</span>
                <ChevronDown className="w-5 h-5 text-white drop-shadow-lg group-hover:translate-y-0.5 transition-transform" />
              </div>
            </a>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="relative py-10 sm:py-12 md:py-12">
          <div className="relative container mx-auto px-6 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto">
              <div className="text-center text-white animate-in fade-in duration-700 delay-100 bg-white/20 backdrop-blur-xl p-5 sm:p-6 md:p-8 rounded-2xl border-2 border-white/40 shadow-2xl hover:md:scale-105 active:scale-95 hover:bg-white/25 transition-all duration-300">
                <AnimatedCounter end={20} suffix="+" duration={2000} />
                <div className="font-montserrat text-[11px] sm:text-sm uppercase tracking-wider font-bold mt-2 drop-shadow-lg leading-tight">Años de Experiencia</div>
              </div>
              <div className="text-center text-white animate-in fade-in duration-700 delay-200 bg-white/20 backdrop-blur-xl p-5 sm:p-6 md:p-8 rounded-2xl border-2 border-white/40 shadow-2xl hover:md:scale-105 active:scale-95 hover:bg-white/25 transition-all duration-300">
                <AnimatedCounter end={100} suffix="%" duration={2000} />
                <div className="font-montserrat text-[11px] sm:text-sm uppercase tracking-wider font-bold mt-2 drop-shadow-lg leading-tight">Guías Certificados</div>
              </div>
              <div className="text-center text-white animate-in fade-in duration-700 delay-300 bg-white/20 backdrop-blur-xl p-5 sm:p-6 md:p-8 rounded-2xl border-2 border-white/40 shadow-2xl hover:md:scale-105 active:scale-95 hover:bg-white/25 transition-all duration-300">
                <AnimatedCounter end={12} suffix="km" duration={2000} />
                <div className="font-montserrat text-[11px] sm:text-sm uppercase tracking-wider font-bold mt-2 drop-shadow-lg leading-tight">De Río Navegable</div>
              </div>
              <div className="text-center text-white animate-in fade-in duration-700 delay-500 bg-white/20 backdrop-blur-xl p-5 sm:p-6 md:p-8 rounded-2xl border-2 border-white/40 shadow-2xl hover:md:scale-105 active:scale-95 hover:bg-white/25 transition-all duration-300">
                <AnimatedCounter end={4.9} suffix="★" duration={2000} decimals={1} />
                <div className="font-montserrat text-[11px] sm:text-sm uppercase tracking-wider font-bold mt-2 drop-shadow-lg leading-tight">Valoración</div>
              </div>
            </div>
          </div>
        </section>

        {/* Experiencias - Visual Cards */}
        <section ref={experienciasRef} id="experiencias" className="relative py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-6 sm:px-6">
            <div className="text-center mb-14 sm:mb-16 md:mb-20 max-w-4xl mx-auto">
              <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-5 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Elige tu Aventura
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                Tres experiencias únicas en el corazón de la Reserva de la Biósfera declarada por la UNESCO
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto mt-8">
              {/* Sección Ñuble Bajo */}
              <div className="relative pt-4">
                <div
                  className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-rio/30 transition-all duration-500 border-2 border-rio/40"
                  onMouseEnter={() => setHoveredExperience('bajo')}
                  onMouseLeave={() => setHoveredExperience(null)}
                >
                  {/* Badge "Más Popular" dentro de la ficha, arriba */}
                  <div className="absolute top-3 left-3 bg-yellow-400 text-grafito px-3 py-1.5 rounded-md font-bold text-[10px] sm:text-xs shadow-lg z-20 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    MÁS POPULAR
                  </div>

                  {/* Image Section - Top Half */}
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-3xl">
                  {/* Image on Hover - only shows when hovering */}
                  <img
                    src="/images/Rafting Familiar.webp"
                    alt="Ñuble Bajo"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${hoveredExperience === 'bajo' ? 'opacity-100 animate-subtle-zoom' : 'opacity-0 scale-100'}`}
                  />

                  {/* Color overlay when NOT hovering - gives presence to the box */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-rio/20 to-rio/10 backdrop-blur-[2px] transition-opacity duration-700 ${hoveredExperience === 'bajo' ? 'opacity-0' : 'opacity-100'}`} />

                  {/* Badge Clase */}
                  <div className="absolute top-3 right-3 bg-rio/90 text-white px-3 py-1.5 rounded-md font-bold text-xs shadow-lg backdrop-blur-sm border border-white/40 z-10">
                    Clase III
                  </div>

                  {/* Lighter dark gradient overlay on hover - clear image visibility */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-grafito/35 via-transparent to-transparent transition-opacity duration-700 ${hoveredExperience === 'bajo' ? 'opacity-100' : 'opacity-0'}`} />

                  {/* Title only on hover - description hidden */}
                  <div className={`absolute left-0 right-0 px-6 py-4 pr-20 z-10 transition-all duration-700 ease-out ${hoveredExperience === 'bajo' ? 'bottom-6 opacity-100' : 'top-1/2 -translate-y-1/2 opacity-100'}`}>
                    <h3 className={`font-montserrat font-black text-2xl sm:text-3xl text-white mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] leading-tight transition-all duration-700 ease-out`}>
                      Ñuble Bajo
                    </h3>
                    <p className={`text-white text-xs sm:text-sm leading-relaxed drop-shadow-xl font-medium transition-all duration-700 ease-out ${hoveredExperience === 'bajo' ? 'opacity-0 max-h-0' : 'opacity-100 max-h-20'}`}>
                      Ideal para familias y principiantes. Nuestra sección más trabajada comercialmente.
                    </p>
                  </div>
                </div>

                {/* Info Section - Bottom Half - White Background */}
                <div className="bg-white p-6 rounded-b-3xl">
                  <div className="grid grid-cols-2 gap-x-3 gap-y-4 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-rio/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-rio" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-sm">6 km</div>
                        <div className="text-[11px] text-grafito/60">Recorrido</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-rio/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-rio" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-sm">8+ años</div>
                        <div className="text-[11px] text-grafito/60">Edad mínima</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-rio/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-rio" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-sm">Todo el año</div>
                        <div className="text-[11px] text-grafito/60">Temporada</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-rio/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-rio" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-sm">Media</div>
                        <div className="text-[11px] text-grafito/60">Dificultad</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-grafito/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <div className="text-sm text-grafito/60 mb-1 font-medium">Desde</div>
                      <div className="font-montserrat font-black text-3xl sm:text-3xl text-grafito">$25.000</div>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      className="bg-rio hover:bg-rio/90 text-white rounded-full px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-5 font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto text-base sm:text-lg"
                    >
                      <a href={getWhatsAppLink("+56932344214", "Hola! Me interesa la Sección Ñuble Bajo")} target="_blank" rel="noopener noreferrer">
                        Reservar
                      </a>
                    </Button>
                  </div>
                </div>
                </div>
              </div>

              {/* Sección Ñuble Bajo Plus */}
              <div className="relative pt-4">
                <div
                  className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-bosque/30 transition-all duration-500 border-2 border-bosque/40"
                  onMouseEnter={() => setHoveredExperience('bajoplus')}
                  onMouseLeave={() => setHoveredExperience(null)}
                >
                  {/* Badge "Incluye Snack" dentro de la ficha, arriba */}
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1.5 rounded-md font-bold text-[10px] sm:text-xs shadow-lg z-20 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    SNACK INCLUIDO
                  </div>

                  {/* Image Section - Top Half */}
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-3xl">
                  {/* Image on Hover - only shows when hovering */}
                  <img
                    src="/images/gallery/galeria/webp/freepik__candid-photography-with-natural-textures-and-highl__11748.webp"
                    alt="Ñuble Bajo Plus"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${hoveredExperience === 'bajoplus' ? 'opacity-100 animate-subtle-zoom' : 'opacity-0 scale-100'}`}
                  />

                  {/* Color overlay when NOT hovering - gives presence to the box */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-bosque/20 to-bosque/10 backdrop-blur-[2px] transition-opacity duration-700 ${hoveredExperience === 'bajoplus' ? 'opacity-0' : 'opacity-100'}`} />

                  {/* Badge Clase */}
                  <div className="absolute top-3 right-3 bg-bosque/90 text-white px-3 py-1.5 rounded-md font-bold text-xs shadow-lg backdrop-blur-sm border border-white/40 z-10">
                    Clase III
                  </div>

                  {/* Lighter dark gradient overlay on hover - clear image visibility */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-grafito/35 via-transparent to-transparent transition-opacity duration-700 ${hoveredExperience === 'bajoplus' ? 'opacity-100' : 'opacity-0'}`} />

                  {/* Title only on hover - description hidden */}
                  <div className={`absolute left-0 right-0 px-6 py-4 pr-20 z-10 transition-all duration-700 ease-out ${hoveredExperience === 'bajoplus' ? 'bottom-6 opacity-100' : 'top-1/2 -translate-y-1/2 opacity-100'}`}>
                    <h3 className={`font-montserrat font-black text-2xl sm:text-3xl text-white mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] leading-tight transition-all duration-700 ease-out`}>
                      Ñuble Bajo Plus
                    </h3>
                    <p className={`text-white text-xs sm:text-sm leading-relaxed drop-shadow-xl font-medium transition-all duration-700 ease-out ${hoveredExperience === 'bajoplus' ? 'opacity-0 max-h-0' : 'opacity-100 max-h-20'}`}>
                      Similar a Ñuble Bajo pero más extensa. Mayor cantidad de rápidos con snack incluido.
                    </p>
                  </div>
                </div>

                {/* Info Section - Bottom Half - White Background */}
                <div className="bg-white p-6 rounded-b-3xl">
                  <div className="grid grid-cols-2 gap-x-3 gap-y-4 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-bosque/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-bosque" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-sm">9 km</div>
                        <div className="text-[11px] text-grafito/60">Recorrido</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-bosque/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-bosque" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-sm">12+ años</div>
                        <div className="text-[11px] text-grafito/60">Edad mínima</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-bosque/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-bosque" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-sm">Sep - Dic</div>
                        <div className="text-[11px] text-grafito/60">Temporada</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-bosque/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-bosque" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-sm">Media</div>
                        <div className="text-[11px] text-grafito/60">Dificultad</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-grafito/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <div className="text-sm text-grafito/60 mb-1 font-medium">Desde</div>
                      <div className="font-montserrat font-black text-3xl sm:text-3xl text-grafito">$30.000</div>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      className="bg-bosque hover:bg-bosque/90 text-white rounded-full px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-5 font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto text-base sm:text-lg"
                    >
                      <a href={getWhatsAppLink("+56932344214", "Hola! Me interesa la Sección Ñuble Bajo Plus")} target="_blank" rel="noopener noreferrer">
                        Reservar
                      </a>
                    </Button>
                  </div>
                </div>
                </div>
              </div>

              {/* Sección Ñuble Alto */}
              <div className="relative pt-4">
                <div
                  className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-[#FF6B35]/30 transition-all duration-500 border-2 border-[#FF6B35]/40"
                  onMouseEnter={() => setHoveredExperience('alto')}
                  onMouseLeave={() => setHoveredExperience(null)}
                >
                  {/* Badge "Máxima Adrenalina" dentro de la ficha, arriba */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 py-1.5 rounded-md font-bold text-[10px] sm:text-xs shadow-lg z-20 flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    ADRENALINA
                  </div>

                  {/* Image Section - Top Half */}
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-3xl">
                  {/* Image on Hover - only shows when hovering */}
                  <img
                    src="/images/Rafting Ñuble Alto.webp"
                    alt="Ñuble Alto"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${hoveredExperience === 'alto' ? 'opacity-100 animate-subtle-zoom' : 'opacity-0 scale-100'}`}
                  />

                  {/* Color overlay when NOT hovering - gives presence to the box */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#FF6B35]/20 to-[#FF6B35]/10 backdrop-blur-[2px] transition-opacity duration-700 ${hoveredExperience === 'alto' ? 'opacity-0' : 'opacity-100'}`} />

                  {/* Badge Clase */}
                  <div className="absolute top-3 right-3 bg-[#FF6B35]/90 text-white px-3 py-1.5 rounded-md font-bold text-xs shadow-lg backdrop-blur-sm border border-white/40 z-10">
                    Clase III-IV
                  </div>

                  {/* Lighter dark gradient overlay on hover - clear image visibility */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-grafito/35 via-transparent to-transparent transition-opacity duration-700 ${hoveredExperience === 'alto' ? 'opacity-100' : 'opacity-0'}`} />

                  {/* Title only on hover - description hidden */}
                  <div className={`absolute left-0 right-0 px-6 py-4 pr-20 z-10 transition-all duration-700 ease-out ${hoveredExperience === 'alto' ? 'bottom-6 opacity-100' : 'top-1/2 -translate-y-1/2 opacity-100'}`}>
                    <h3 className={`font-montserrat font-black text-2xl sm:text-3xl text-white mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] leading-tight transition-all duration-700 ease-out`}>
                      Ñuble Alto
                    </h3>
                    <p className={`text-white text-xs sm:text-sm leading-relaxed drop-shadow-xl font-medium transition-all duration-700 ease-out ${hoveredExperience === 'alto' ? 'opacity-0 max-h-0' : 'opacity-100 max-h-20'}`}>
                      Para aventureros experimentados. Máxima adrenalina y emoción con snack incluido.
                    </p>
                  </div>
                </div>

                {/* Info Section - Bottom Half - White Background */}
                <div className="bg-white p-6 rounded-b-3xl">
                  <div className="grid grid-cols-2 gap-x-3 gap-y-4 mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-[#FF6B35]" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-sm">8 km</div>
                        <div className="text-[11px] text-grafito/60">Recorrido</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-[#FF6B35]" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-sm">16+ años</div>
                        <div className="text-[11px] text-grafito/60">Edad mínima</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-[#FF6B35]" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-sm">Todo el año</div>
                        <div className="text-[11px] text-grafito/60">Temporada</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 bg-[#FF6B35]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-[#FF6B35]" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-sm">Media-Alta</div>
                        <div className="text-[11px] text-grafito/60">Dificultad</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-grafito/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                      <div className="text-sm text-grafito/60 mb-1 font-medium">Desde</div>
                      <div className="font-montserrat font-black text-3xl sm:text-3xl text-grafito">$30.000</div>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white rounded-full px-8 py-4 sm:px-10 sm:py-5 md:px-12 md:py-5 font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all w-full sm:w-auto text-base sm:text-lg"
                    >
                      <a href={getWhatsAppLink("+56932344214", "Hola! Me interesa la Sección Ñuble Alto")} target="_blank" rel="noopener noreferrer">
                        Reservar
                      </a>
                    </Button>
                  </div>
                </div>
                </div>
              </div>
            </div>

            {/* Incluye */}
            <div className="mt-12 sm:mt-16 md:mt-20 max-w-5xl mx-auto p-6 sm:p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/30">
                  <span className="font-montserrat font-bold text-white text-sm uppercase tracking-wider drop-shadow-lg">Incluido</span>
                </div>
                <h3 className="font-montserrat font-black text-3xl md:text-4xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  Todas las experiencias incluyen
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <div className="w-12 h-12 bg-rio rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium drop-shadow-lg flex-1 min-w-0">Equipamiento completo (traje de neopreno, remo, casco y chaleco salvavidas)</span>
                </div>
                <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <div className="w-12 h-12 bg-rio rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium drop-shadow-lg flex-1 min-w-0">Guías certificados</span>
                </div>
                <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <div className="w-12 h-12 bg-rio rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium drop-shadow-lg flex-1 min-w-0">Transporte durante la actividad</span>
                </div>
                <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <div className="w-12 h-12 bg-rio rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium drop-shadow-lg flex-1 min-w-0">¡¡Fotos de la aventura!!</span>
                </div>
              </div>

              {/* Horarios */}
              <div className="text-center bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/30">
                <div className="font-montserrat font-bold text-white text-lg mb-2 drop-shadow-lg">
                  <Clock className="w-6 h-6 inline mr-2" />
                  Reserva todos los días
                </div>
                <p className="text-white font-medium drop-shadow-lg">
                  Horarios: 11:00 am y 2:30 pm
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mapa de Rutas de Rafting */}
        {/* <RaftingMap /> */}

        {/* Actividades Extras */}
        <section ref={actividadesExtrasRef} id="actividades-extras" className="relative py-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
                <span className="font-montserrat font-bold text-white text-sm uppercase tracking-wider drop-shadow-lg">Más Aventuras</span>
              </div>
              <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Actividades Extras
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                Descubre más formas de conectar con la naturaleza en San Fabián de Alico
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Cabalgatas */}
              <div className="group bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border-2 border-white/20 hover:border-rio/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-rio to-bosque rounded-2xl flex items-center justify-center mb-6 shadow-xl mx-auto group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="font-montserrat font-black text-2xl text-white mb-3 drop-shadow-lg">Cabalgatas</h3>
                  <p className="text-white/80 mb-6 drop-shadow-lg">Explora los senderos de la cordillera a caballo</p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-rio to-bosque hover:from-rio/90 hover:to-bosque/90 text-white rounded-full px-6 py-3 font-bold shadow-lg"
                  >
                    <a href={getWhatsAppLink("+56932344214", "Hola! Me interesa información sobre Cabalgatas")} target="_blank" rel="noopener noreferrer">
                      Consultar
                    </a>
                  </Button>
                </div>
              </div>

              {/* Trekking */}
              <div className="group bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border-2 border-white/20 hover:border-rio/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-rio to-bosque rounded-2xl flex items-center justify-center mb-6 shadow-xl mx-auto group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                  </div>
                  <h3 className="font-montserrat font-black text-2xl text-white mb-3 drop-shadow-lg">Trekking</h3>
                  <p className="text-white/80 mb-6 drop-shadow-lg">Caminatas guiadas por paisajes únicos</p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-rio to-bosque hover:from-rio/90 hover:to-bosque/90 text-white rounded-full px-6 py-3 font-bold shadow-lg"
                  >
                    <a href={getWhatsAppLink("+56932344214", "Hola! Me interesa información sobre Trekking")} target="_blank" rel="noopener noreferrer">
                      Consultar
                    </a>
                  </Button>
                </div>
              </div>

              {/* Pesca */}
              <div className="group bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border-2 border-white/20 hover:border-rio/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-rio to-bosque rounded-2xl flex items-center justify-center mb-6 shadow-xl mx-auto group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                    </svg>
                  </div>
                  <h3 className="font-montserrat font-black text-2xl text-white mb-3 drop-shadow-lg">Pesca</h3>
                  <p className="text-white/80 mb-6 drop-shadow-lg">Pesca deportiva en aguas cristalinas</p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-rio to-bosque hover:from-rio/90 hover:to-bosque/90 text-white rounded-full px-6 py-3 font-bold shadow-lg"
                  >
                    <a href={getWhatsAppLink("+56932344214", "Hola! Me interesa información sobre Pesca")} target="_blank" rel="noopener noreferrer">
                      Consultar
                    </a>
                  </Button>
                </div>
              </div>

              {/* Kayak Inflable */}
              <div className="group bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border-2 border-white/20 hover:border-rio/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-rio to-bosque rounded-2xl flex items-center justify-center mb-6 shadow-xl mx-auto group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="font-montserrat font-black text-2xl text-white mb-3 drop-shadow-lg">Kayak Inflable</h3>
                  <p className="text-white/80 mb-6 drop-shadow-lg">Navega el río a tu propio ritmo</p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-rio to-bosque hover:from-rio/90 hover:to-bosque/90 text-white rounded-full px-6 py-3 font-bold shadow-lg"
                  >
                    <a href={getWhatsAppLink("+56932344214", "Hola! Me interesa información sobre Kayak Inflable")} target="_blank" rel="noopener noreferrer">
                      Consultar
                    </a>
                  </Button>
                </div>
              </div>

              {/* Cursos de Kayak */}
              <div className="group bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border-2 border-white/20 hover:border-rio/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl md:col-span-2 lg:col-span-1">
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-rio to-bosque rounded-2xl flex items-center justify-center mb-6 shadow-xl mx-auto group-hover:scale-110 transition-transform">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-montserrat font-black text-2xl text-white mb-3 drop-shadow-lg">Cursos de Kayak</h3>
                  <p className="text-white/80 mb-6 drop-shadow-lg">Aprende de expertos certificados</p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-rio to-bosque hover:from-rio/90 hover:to-bosque/90 text-white rounded-full px-6 py-3 font-bold shadow-lg"
                  >
                    <a href={getWhatsAppLink("+56932344214", "Hola! Me interesa información sobre Cursos de Kayak")} target="_blank" rel="noopener noreferrer">
                      Consultar
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Empresas, Colegios e Instituciones */}
        <section ref={empresasRef} id="empresas" className="relative py-32 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
                  <span className="font-montserrat font-bold text-white text-sm uppercase tracking-wider drop-shadow-lg">Grupos Corporativos</span>
                </div>
                <h2 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  Empresas, Colegios e Instituciones
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Programas diseñados para grupos corporativos, instituciones educativas y organizaciones
                </p>
              </div>

              {/* Two Main Options */}
              <div className="grid lg:grid-cols-2 gap-8 mb-16">
                {/* Salidas Recreativas */}
                <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-white/40 hover:border-rio hover:shadow-[0_0_40px_rgba(10,132,174,0.3)] transition-all duration-300 flex flex-col shadow-2xl">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-rio to-bosque rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-black text-3xl text-white mb-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                        Salidas Recreativas
                      </h3>
                      <p className="text-white text-lg font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>Paseos y celebraciones grupales</p>
                    </div>
                  </div>

                  <p className="text-white text-base mb-6 leading-relaxed font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>
                    Experiencias outdoor ideales para celebraciones, aniversarios de empresa y eventos recreativos con tu equipo.
                  </p>

                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start gap-3 text-white">
                      <div className="w-6 h-6 bg-rio rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-base font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>Rafting para grupos corporativos</span>
                    </li>
                    <li className="flex items-start gap-3 text-white">
                      <div className="w-6 h-6 bg-rio rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-base font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>Actividades de integración al aire libre</span>
                    </li>
                    <li className="flex items-start gap-3 text-white">
                      <div className="w-6 h-6 bg-rio rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-base font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>Celebraciones y eventos especiales</span>
                    </li>
                  </ul>

                  <Button
                    asChild
                    className="w-full bg-rio hover:bg-rio/90 text-white rounded-full px-8 py-5 sm:px-10 sm:py-6 md:px-12 md:py-7 text-base sm:text-lg md:text-xl font-bold shadow-xl hover:scale-105 transition-all mt-auto"
                  >
                    <a href={getWhatsAppLink("+56932344214", "Hola! Me interesa información sobre Salidas Recreativas para empresa")} target="_blank" rel="noopener noreferrer">
                      Consultar
                    </a>
                  </Button>
                </div>

                {/* Talleres Corporativos */}
                <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl p-8 border-2 border-bosque/60 hover:border-bosque hover:shadow-[0_0_40px_rgba(45,134,89,0.3)] transition-all duration-300 relative flex flex-col shadow-2xl">
                  {/* Badge destacado */}
                  <div className="absolute -top-3 right-4 sm:-top-4 sm:right-8 bg-gradient-to-r from-bosque to-[#2d8659] text-white px-4 py-1.5 sm:px-6 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-xl border-2 border-white/30">
                    ✓ Con presupuesto aprobado
                  </div>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-bosque to-rio rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-black text-3xl text-white mb-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                        Talleres Corporativos
                      </h3>
                      <p className="text-white text-lg font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>Capacitación y desarrollo outdoor</p>
                    </div>
                  </div>

                  <p className="text-white text-base mb-6 leading-relaxed font-medium" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>
                    Programas formativos que combinan naturaleza y aprendizaje. <span className="font-bold text-white bg-bosque/70 px-2 py-0.5 rounded shadow-lg">Categorizados como talleres y capacitaciones</span> para facilitar su aprobación presupuestaria.
                  </p>

                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-start gap-3 text-white">
                      <div className="w-6 h-6 bg-bosque rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-base font-semibold" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>Talleres de liderazgo outdoor</span>
                    </li>
                    <li className="flex items-start gap-3 text-white">
                      <div className="w-6 h-6 bg-bosque rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-base font-semibold" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>Team building con metodología</span>
                    </li>
                    <li className="flex items-start gap-3 text-white">
                      <div className="w-6 h-6 bg-bosque rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-base font-semibold" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>Talleres recreativos formativos</span>
                    </li>
                    <li className="flex items-start gap-3 text-white">
                      <div className="w-6 h-6 bg-bosque rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-base font-semibold" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>Reuniones de trabajo en naturaleza</span>
                    </li>
                    <li className="flex items-start gap-3 text-white">
                      <div className="w-6 h-6 bg-bosque rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-base font-semibold" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>Capacitaciones experienciales</span>
                    </li>
                  </ul>

                  <Button
                    asChild
                    className="w-full bg-bosque hover:bg-bosque/90 text-white rounded-full px-8 py-5 sm:px-10 sm:py-6 md:px-12 md:py-7 text-base sm:text-lg md:text-xl font-bold shadow-xl hover:scale-105 transition-all mt-auto"
                  >
                    <a href={getWhatsAppLink("+56932344214", "Hola! Me interesa información sobre Talleres Corporativos (capacitaciones y desarrollo)")} target="_blank" rel="noopener noreferrer">
                      Consultar
                    </a>
                  </Button>
                </div>
              </div>

              {/* Institutional Programs */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Colegios */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:border-rio/50 hover:shadow-[0_0_30px_rgba(10,132,174,0.2)] transition-all shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-rio to-bosque rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-white text-xl mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>Colegios e Instituciones Educativas</h3>
                      <p className="text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>Salidas educativas seguras, programas de educación ambiental y actividades deportivas para estudiantes</p>
                    </div>
                  </div>
                </div>

                {/* Instituciones */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:border-bosque/50 hover:shadow-[0_0_30px_rgba(45,134,89,0.2)] transition-all shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-rio to-bosque rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-white text-xl mb-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>Instituciones Públicas y Privadas</h3>
                      <p className="text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.5)' }}>Programas especiales para organizaciones, ONGs y entidades gubernamentales con enfoque en sustentabilidad</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Galería */}
        <section id="galeria" className="relative py-24 sm:py-32 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
                <span className="font-montserrat font-bold text-white text-sm uppercase tracking-wider drop-shadow-lg">Momentos</span>
              </div>
              <h2 className="font-montserrat font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Galería de Aventuras
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                Revive los mejores momentos de nuestras expediciones en el Río Ñuble
              </p>
            </div>

            <div className="max-w-7xl mx-auto">
              <Gallery
                images={[
                  { url: "/images/gallery/galeria/webp/freepik__mejor-esta-imagen-de-cabalgatas-de-estas-personas-__11744.webp", alt: "Cabalgatas en la naturaleza - Outdoor Ñuble" },
                  { url: "/images/gallery/galeria/webp/freepik__candid-photography-with-natural-textures-and-highl__11745.webp", alt: "Aventura en Río Ñuble" },
                  { url: "/images/gallery/galeria/webp/freepik__candid-photography-with-natural-textures-and-highl__11747.webp", alt: "Rafting en Río Ñuble" },
                  { url: "/images/gallery/galeria/webp/freepik__candid-photography-with-natural-textures-and-highl__11748.webp", alt: "Experiencias al aire libre" },
                  { url: "/images/gallery/galeria/webp/freepik__candid-photography-with-natural-textures-and-highl__11749.webp", alt: "Aventura y naturaleza" },
                  { url: "/images/gallery/galeria/webp/freepik__candid-photography-with-natural-textures-and-highl__11750.webp", alt: "Turismo aventura en Ñuble" },
                  { url: "/images/gallery/galeria/webp/freepik__candid-photography-with-natural-textures-and-highl__11751.webp", alt: "Outdoor Ñuble - Aventuras" },
                  { url: "/images/gallery/galeria/webp/freepik__candid-photography-with-natural-textures-and-highl__11752.webp", alt: "Experiencias naturales" },
                  { url: "/images/gallery/galeria/webp/freepik__candid-photography-with-natural-textures-and-highl__11753.webp", alt: "Rafting profesional en Río Ñuble" },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section ref={testimoniosRef} id="testimonios" className="relative py-24 sm:py-32 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
                <span className="font-montserrat font-bold text-white text-sm uppercase tracking-wider drop-shadow-lg">Testimonios</span>
              </div>
              <h2 className="font-montserrat font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Lo que dicen nuestros aventureros
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                Experiencias reales de quienes han vivido la aventura del Río Ñuble
              </p>
            </div>

            <div className="max-w-7xl mx-auto">
              <Testimonials
                testimonials={[
                  {
                    name: "María González",
                    location: "Santiago, Chile",
                    rating: 5,
                    text: "Una experiencia increíble! Los guías fueron muy profesionales y nos hicieron sentir seguros en todo momento. El río Ñuble es espectacular y la aventura superó todas nuestras expectativas.",
                    date: "Diciembre 2024"
                  },
                  {
                    name: "Carlos Muñoz",
                    location: "Concepción, Chile",
                    rating: 5,
                    text: "Fuimos con toda la familia y lo pasamos increíble. La sección Ñuble Bajo es perfecta para principiantes. Los paisajes son hermosos y el equipo muy amable.",
                    date: "Noviembre 2024"
                  },
                  {
                    name: "Javiera Riquelme",
                    location: "Chillán, Chile",
                    rating: 5,
                    text: "La mejor aventura de adrenalina que he tenido! Hicimos la sección Ñuble Alto y fue espectacular. Guías certificados, equipamiento de primera y un entorno natural único.",
                    date: "Octubre 2024"
                  },
                  {
                    name: "Diego Pérez",
                    location: "Temuco, Chile",
                    rating: 5,
                    text: "Excelente servicio desde el primer contacto. La organización fue impecable y la experiencia inolvidable. Definitivamente volveremos!",
                    date: "Septiembre 2024"
                  },
                  {
                    name: "Valentina Rojas",
                    location: "Los Ángeles, Chile",
                    rating: 5,
                    text: "Una empresa familiar que se nota que ama lo que hace. 20 años de experiencia se reflejan en cada detalle. Súper recomendado para todos los niveles.",
                    date: "Agosto 2024"
                  },
                  {
                    name: "Sebastián Torres",
                    location: "Talca, Chile",
                    rating: 5,
                    text: "Hicimos rafting como actividad de team building con mi empresa y fue un éxito total. Todos quedaron encantados con la experiencia y la profesionalidad del equipo.",
                    date: "Julio 2024"
                  }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Nosotros - Rediseñado */}
        <section ref={nosotrosRef} id="nosotros" className="relative py-32 pb-64 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-20">
                <div className="inline-block bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-full mb-6 border-2 border-white/50 shadow-xl">
                  <span className="font-montserrat font-bold text-white text-sm uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Sobre Nosotros</span>
                </div>
                <h2 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  Empresa Familiar <span className="text-white/95">con Historia</span>
                </h2>
              </div>

              {/* Hero Image - 20 Años */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-20 min-h-[600px] md:min-h-[700px]">
                <img
                  src="/images/20a.webp"
                  alt="Outdoor Ñuble - 20 Años de Aventura"
                  className="w-full h-full object-cover absolute inset-0"
                />
                {/* Overlay muy sutil solo abajo */}
                <div className="absolute inset-0 bg-gradient-to-t from-grafito/60 via-transparent via-50% to-transparent"></div>
              </div>

              {/* Content Cards Below Image */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {/* Card 1 */}
                <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-white/30 shadow-2xl hover:scale-105 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-rio to-bosque rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-white mb-3 sm:mb-4">Seguridad Certificada</h3>
                  <p className="text-white text-sm sm:text-base leading-relaxed">
                    Equipos y protocolos internacionales de la más alta calidad para tu tranquilidad.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-white/30 shadow-2xl hover:scale-105 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-bosque to-rio rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-white mb-3 sm:mb-4">Turismo Sustentable</h3>
                  <p className="text-white text-sm sm:text-base leading-relaxed">
                    Compromiso real con la conservación y protección del medio ambiente.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-white/30 shadow-2xl hover:scale-105 transition-all">
                  <div className="w-16 h-16 bg-gradient-to-br from-rio to-bosque rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-white mb-3 sm:mb-4">Empresa Familiar</h3>
                  <p className="text-white text-sm sm:text-base leading-relaxed">
                    Más de 20 años de pasión y conocimiento local transmitido por generaciones.
                  </p>
                </div>
              </div>

              {/* Text Content */}
              <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-12 border-2 border-white/30 shadow-2xl mb-16">
                <p className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed font-light text-center mb-6 sm:mb-8">
                  Somos una <span className="font-bold text-rio">empresa familiar</span> con más de dos décadas de experiencia guiando aventureros en San Fabián de Alico, en el corazón de la <span className="font-bold text-bosque">Reserva de la Biósfera declarada por la UNESCO</span>.
                </p>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
                  <div>
                    <h3 className="font-montserrat font-black text-2xl sm:text-3xl text-white mb-3 sm:mb-4">
                      Nuestro Compromiso
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed font-light">
                      Ofrecer experiencias memorables y seguras con conocimiento local, respetando y protegiendo nuestro entorno natural.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-black text-2xl sm:text-3xl text-white mb-3 sm:mb-4">
                      Nuestra Garantía
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed font-light">
                      Con guías certificados y equipamiento de primera, garantizamos aventuras que combinan adrenalina y seguridad.
                    </p>
                  </div>
                </div>
              </div>

              {/* Nuestro Equipo */}
              <div className="mb-16">
                <h3 className="font-montserrat font-black text-4xl md:text-5xl text-white text-center mb-16 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  Nuestro Equipo
                </h3>

                <div className="grid md:grid-cols-3 gap-12 md:gap-8">
                  {/* Team Member 1 */}
                  <div className="flex flex-col items-center group bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-rio/40 transition-all duration-300 hover:scale-105 shadow-xl">
                    <div className="relative mb-6">
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-rio to-bosque rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

                      {/* Image circle */}
                      <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/50 group-hover:border-rio transition-all duration-300 shadow-2xl">
                        <img
                          src="/images/equipo/freepik__crea-la-imagen-de-una-persona-de-un-guia-de-rio-de__94123.webp"
                          alt="Guía Outdoor Ñuble"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=400&h=400&fit=crop";
                          }}
                        />
                      </div>
                    </div>

                    <h4 className="font-montserrat font-bold text-2xl text-white mb-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                      Juan Pablo
                    </h4>
                    <p className="text-white text-center text-lg font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                      Guía Certificado
                    </p>
                  </div>

                  {/* Team Member 2 */}
                  <div className="flex flex-col items-center group bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-bosque/40 transition-all duration-300 hover:scale-105 shadow-xl">
                    <div className="relative mb-6">
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-rio to-bosque rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

                      {/* Image circle */}
                      <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/50 group-hover:border-bosque transition-all duration-300 shadow-2xl">
                        <img
                          src="/images/equipo/freepik__crea-un-persdonaje-de-kayak-mujer-haz-un-acercamie__94127.webp"
                          alt="Guía Outdoor Ñuble"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop";
                          }}
                        />
                      </div>
                    </div>

                    <h4 className="font-montserrat font-bold text-2xl text-white mb-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                      Fabiola
                    </h4>
                    <p className="text-white text-center text-lg font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                      Guía Certificada
                    </p>
                  </div>

                  {/* Team Member 3 */}
                  <div className="flex flex-col items-center group bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-rio/40 transition-all duration-300 hover:scale-105 shadow-xl">
                    <div className="relative mb-6">
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-rio to-bosque rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

                      {/* Image circle */}
                      <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/50 group-hover:border-rio transition-all duration-300 shadow-2xl">
                        <img
                          src="/images/equipo/freepik__crea-la-imagen-de-una-persona-de-un-guia-de-rio-de__94130.webp"
                          alt="Guía Outdoor Ñuble"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop";
                          }}
                        />
                      </div>
                    </div>

                    <h4 className="font-montserrat font-bold text-2xl text-white mb-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                      Francisco
                    </h4>
                    <p className="text-white text-center text-lg font-medium drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                      Guía Certificado
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Share */}
              <div className="flex justify-center mb-8">
                <SocialShare
                  title="Outdoor Ñuble - Rafting y Turismo Aventura"
                  description="Vive la aventura del Río Ñuble con más de 20 años de experiencia. Rafting profesional en la Reserva de la Biósfera declarada por la UNESCO."
                />
              </div>

              <div className="text-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-rio to-bosque hover:from-rio/90 hover:to-bosque/90 text-white rounded-full px-10 py-5 sm:px-12 sm:py-6 md:px-16 md:py-8 text-lg sm:text-xl md:text-2xl font-bold shadow-2xl hover:scale-105 transition-all border-2 border-white/30"
                >
                  <a href={getWhatsAppLink("+56932344214", "Hola! Quiero saber más sobre Outdoor Ñuble")} target="_blank" rel="noopener noreferrer">
                    Contáctanos
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Difuminado suave para transición */}
          <div className="absolute bottom-0 left-0 right-0 h-96 pointer-events-none z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-grafito/50 to-grafito"></div>
          </div>
        </section>

        {/* CTA Final + Footer - Banner Style */}
        <section id="contacto" className="relative min-h-screen flex flex-col overflow-hidden bg-grafito">
          {/* Background Image - Full Section with smooth blend */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="/images/Fondos/freepik__aleja-esta-imagen-dale-mas-espacio-al-cielo-mas-ai__95468_11zon.webp"
                alt="Contacto Outdoor Ñuble"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
            {/* Gradiente de mezcla superior ultra suave */}
            <div className="absolute inset-0 bg-gradient-to-b from-grafito via-transparent to-grafito/80"></div>
            <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-grafito/100 via-grafito/60 via-grafito/30 to-transparent"></div>
          </div>

          {/* Contact Content - Compacto */}
          <div className="relative z-10 container mx-auto px-6 pt-48 sm:pt-56 md:pt-64 pb-16 text-center flex-grow flex items-start">
            <div className="max-w-5xl mx-auto w-full">

              {/* Header compacto */}
              <div className="mb-8">
                <h2 className="font-montserrat font-black text-4xl sm:text-5xl md:text-6xl text-white mb-3 leading-tight drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]">
                  ¿Listo para tu Próxima Aventura?
                </h2>
                <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto font-light" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.8)' }}>
                  Reserva ahora y vive una experiencia inolvidable
                </p>
              </div>

              {/* CTA Principal - Compacto */}
              <div>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-rio to-bosque hover:from-rio/90 hover:to-bosque/90 text-white px-10 py-5 text-lg rounded-full shadow-[0_25px_70px_rgba(10,132,174,0.5)] hover:shadow-[0_30px_80px_rgba(10,132,174,0.7)] hover:scale-105 transition-all duration-300 font-bold border-2 border-white/50"
                >
                  <a href={getWhatsAppLink("+56932344214", getDefaultRaftingMessage())} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Reservar por WhatsApp
                  </a>
                </Button>
              </div>

              {/* Espaciador para ver la imagen */}
              <div className="h-72 sm:h-80 md:h-96"></div>

              {/* Información de contacto - Más separadas */}
              <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-white max-w-4xl mx-auto">
                <a href="https://www.google.com/maps/dir/?api=1&destination=San+Fabián+de+Alico,+Ñuble,+Chile" target="_blank" rel="noopener noreferrer" className="group bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all shadow-lg">
                  <MapPin className="w-6 h-6 mx-auto mb-2 text-rio group-hover:scale-110 transition-transform" />
                  <div className="text-[9px] text-white/70 uppercase tracking-widest mb-1 font-semibold">Ubicación</div>
                  <div className="font-montserrat font-bold text-sm">San Fabián de Alico</div>
                  <div className="text-[10px] text-white/70">Región de Ñuble</div>
                </a>

                <a href={getWhatsAppLink("+56932344214", getDefaultRaftingMessage())} target="_blank" rel="noopener noreferrer" className="group bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all shadow-lg">
                  <svg className="w-6 h-6 mx-auto mb-2 text-rio group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="text-[9px] text-white/70 uppercase tracking-widest mb-1 font-semibold">WhatsApp</div>
                  <div className="font-montserrat font-bold text-sm">+56 9 3234 4214</div>
                </a>

                <a href="mailto:contacto@outdoornuble.cl" className="group bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all shadow-lg">
                  <svg className="w-6 h-6 mx-auto mb-2 text-rio group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="text-[9px] text-white/70 uppercase tracking-widest mb-1 font-semibold">Email</div>
                  <div className="font-montserrat font-bold text-xs">contacto@outdoornuble.cl</div>
                </a>
              </div>
            </div>
          </div>

          {/* Footer - Minimalista */}
          <footer className="relative z-10 bg-grafito/15 backdrop-blur-sm py-12 border-t border-white/10 mt-auto">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <img src="/images/isotipo.svg" alt="Outdoor Ñuble" className="h-12 w-auto opacity-90" />
                  <div>
                    <div className="font-montserrat font-black text-white text-lg tracking-wide" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>OUTDOOR ÑUBLE</div>
                    <div className="text-white/70 text-sm font-light">Tu próxima aventura</div>
                  </div>
                </div>

                <div className="text-white/60 text-sm font-light">
                  © 2025 Outdoor Ñuble. Todos los derechos reservados.
                  <span className="text-white/40 mx-2">·</span>
                  <span className="text-white/40">
                    Designed by{" "}
                    <a
                      href="https://www.agenciados.cl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white/50 transition-colors duration-300"
                    >
                      agenciados
                    </a>
                  </span>
                </div>

                <div className="flex items-center gap-5">
                  <a href="https://www.facebook.com/share/1BUNJX6c1e/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-all hover:scale-125 duration-300" aria-label="Facebook">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://www.instagram.com/extremosurexpediciones.cl?igsh=amdjenA1YnFydzY0&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-all hover:scale-125 duration-300" aria-label="Instagram">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}
