"use client";

import { Button } from "@/components/ui/button";
import WhatsAppFloatingCTA from "@/components/WhatsAppFloatingCTA";
import SideNavigation from "@/components/SideNavigation";
import { getWhatsAppLink, getDefaultRaftingMessage } from "@/lib/getWhatsAppLink";
import { Clock, Users, MapPin, Star, Shield, Award, Heart, ChevronDown, Check, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);

      // Get section positions
      const experienciasTop = experienciasRef.current?.offsetTop || 0;
      const nosotrosTop = nosotrosRef.current?.offsetTop || 0;
      const scrollY = window.scrollY;
      const triggerPoint = window.innerHeight * 0.5; // Trigger when section is halfway in viewport

      // Determine which image to show based on scroll position
      if (scrollY + triggerPoint >= nosotrosTop) {
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
      <WhatsAppFloatingCTA phone="+56932344214" />
      <SideNavigation />

      {/* Fixed Background Images */}
      <div className="fixed top-0 left-0 right-0 h-screen -z-10">
        {/* Image 1 - Hero Principal */}
        <img
          src="/images/freepik__candid-photography-with-natural-textures-and-highl__34529.webp"
          alt="Vista aérea Rafting Outdoor Ñuble"
          className="absolute w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: currentImage === 1 ? 1 : 0,
            objectPosition: 'center center'
          }}
        />

        {/* Image 2 - Elige tu Aventura */}
        <img
          src="/images/2.webp"
          alt="Elige tu Aventura Rafting Outdoor Ñuble"
          className="absolute w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: currentImage === 2 ? 1 : 0,
            objectPosition: 'center center'
          }}
        />

        {/* Image 3 - 20 Años de Aventura */}
        <img
          src="/images/3.webp"
          alt="20 Años de Aventura en el Río Ñuble"
          className="absolute w-full h-full object-cover transition-opacity duration-700"
          style={{
            opacity: currentImage === 3 ? 1 : 0,
            objectPosition: 'center center'
          }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-grafito/30 via-transparent to-grafito/40" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ease-out ${scrolled ? 'bg-black/70 backdrop-blur-xl shadow-2xl' : 'bg-transparent py-6'}`}
      >
        <div className={`transition-all duration-1000 ease-out ${scrolled ? 'w-full px-12 py-4' : 'container mx-auto px-6'}`}>
          {/* Gradient accent line on top when scrolled */}
          <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-rio to-transparent transition-opacity duration-1000 ${scrolled ? 'opacity-60' : 'opacity-0'}`}></div>

          <div className="flex items-center justify-between transition-all duration-1000 ease-out">
            <a href="#" className="flex items-center gap-2 sm:gap-3 transition-all duration-1000 ease-out">
              <img
                src="/images/isotipo.svg"
                alt="Outdoor Ñuble"
                className={`w-auto transition-all duration-1000 ease-out ${scrolled ? 'h-9 sm:h-11' : 'h-14 sm:h-16 md:h-20 lg:h-24'}`}
              />
              <div className={`font-montserrat leading-none flex flex-col justify-center transition-all duration-1000 ease-out ${scrolled ? 'text-white h-9 sm:h-11' : 'text-white drop-shadow-2xl h-14 sm:h-16 md:h-20 lg:h-24'}`}>
                <div className={`font-normal tracking-[0.15em] transition-all duration-1000 ease-out ${scrolled ? 'text-base sm:text-lg mb-0' : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-0.5'}`}>OUTDOOR</div>
                <div className={`font-black transition-all duration-1000 ease-out ${scrolled ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl'}`} style={{ letterSpacing: '0.72em', width: 'fit-content' }}>ÑUBLE</div>
              </div>
            </a>

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
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/20 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col p-6 gap-4">
              <a
                href="#experiencias"
                className="text-white font-montserrat font-semibold py-3 hover:text-rio transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Experiencias
              </a>
              <a
                href="#nosotros"
                className="text-white font-montserrat font-semibold py-3 hover:text-rio transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nosotros
              </a>
              <Button
                asChild
                className="bg-gradient-to-r from-rio to-bosque text-white rounded-full w-full"
              >
                <a href={getWhatsAppLink("+56932344214", getDefaultRaftingMessage())} target="_blank" rel="noopener noreferrer">
                  Reservar Ahora
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero - Dynamic Scroll Images */}
        <section id="hero" className="relative min-h-screen">
          {/* Hero Content */}
          <div className="relative min-h-screen flex items-start justify-start md:justify-center pt-24 sm:pt-28 md:pt-36 lg:pt-44">
            <div className="relative z-10 container mx-auto px-4 sm:px-6">
              <div className="max-w-2xl">
                <div className="mb-6 sm:mb-8 md:mb-10 inline-block animate-in fade-in duration-700">
                  <span className="bg-rio/50 backdrop-blur-md text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold border-2 border-white/40 shadow-xl uppercase tracking-wider">
                    Reserva de la Biósfera UNESCO
                  </span>
                </div>

                <h1 className="font-montserrat font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 sm:mb-5 md:mb-6 leading-[1.1] animate-in fade-in duration-700 delay-150 drop-shadow-[0_6px_12px_rgba(0,0,0,0.95)]">
                  Vive la Aventura<br />
                  del Río Ñuble
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-white mb-6 sm:mb-7 md:mb-8 font-montserrat font-normal leading-relaxed animate-in fade-in duration-700 delay-300 drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)] max-w-xl">
                  Rafting profesional con guías certificados en San Fabián de Alico.
                  Tu próxima aventura te espera.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-in fade-in duration-700 delay-500">
                  <Button
                    asChild
                    size="lg"
                    className="group bg-gradient-to-r from-rio to-bosque hover:from-rio/90 hover:to-bosque/90 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 lg:py-7 text-sm sm:text-base md:text-lg rounded-full shadow-[0_12px_35px_rgba(10,132,174,0.5)] hover:shadow-[0_16px_45px_rgba(10,132,174,0.7)] hover:scale-[1.03] transition-all duration-300 font-bold border-2 border-white/30 backdrop-blur-sm"
                  >
                    <a href="#experiencias" className="flex items-center gap-2 sm:gap-3 justify-center">
                      Ver experiencias
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="group relative overflow-hidden border-3 border-white text-white bg-white/15 hover:bg-white hover:text-rio px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 lg:py-7 text-sm sm:text-base md:text-lg rounded-full backdrop-blur-md transition-all duration-300 font-black shadow-[0_12px_35px_rgba(255,255,255,0.3)] hover:shadow-[0_16px_45px_rgba(255,255,255,0.5)] hover:scale-[1.03]"
                  >
                    <a href={getWhatsAppLink("+56932344214", getDefaultRaftingMessage())} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center relative z-10">
                      Reservar ahora
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <a href="#experiencias" className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-all duration-300 group">
              <div className="flex flex-col items-center gap-2">
                <div className="flex flex-col items-center">
                  <span className="text-white text-sm font-montserrat font-semibold uppercase tracking-wide drop-shadow-2xl">Descubre</span>
                  <span className="text-white/90 text-xs font-montserrat font-normal lowercase tracking-wider drop-shadow-xl">tu aventura</span>
                </div>
                <ChevronDown className="w-6 h-6 text-white drop-shadow-2xl group-hover:translate-y-1 transition-transform" />
              </div>
            </a>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="relative py-8 sm:py-10 md:py-12">
          <div className="relative container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
              <div className="text-center text-white animate-in fade-in duration-700 delay-100 bg-white/20 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-white/40 shadow-2xl hover:md:scale-105 active:scale-95 hover:bg-white/25 transition-all duration-300">
                <AnimatedCounter end={20} suffix="+" duration={2000} />
                <div className="font-montserrat text-xs sm:text-sm uppercase tracking-wider font-bold mt-1 sm:mt-2 drop-shadow-lg">Años de Experiencia</div>
              </div>
              <div className="text-center text-white animate-in fade-in duration-700 delay-200 bg-white/20 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-white/40 shadow-2xl hover:md:scale-105 active:scale-95 hover:bg-white/25 transition-all duration-300">
                <AnimatedCounter end={100} suffix="%" duration={2000} />
                <div className="font-montserrat text-xs sm:text-sm uppercase tracking-wider font-bold mt-1 sm:mt-2 drop-shadow-lg">Guías Certificados</div>
              </div>
              <div className="text-center text-white animate-in fade-in duration-700 delay-300 bg-white/20 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-white/40 shadow-2xl hover:md:scale-105 active:scale-95 hover:bg-white/25 transition-all duration-300">
                <AnimatedCounter end={12} suffix="km" duration={2000} />
                <div className="font-montserrat text-xs sm:text-sm uppercase tracking-wider font-bold mt-1 sm:mt-2 drop-shadow-lg">De Río Navegable</div>
              </div>
              <div className="text-center text-white animate-in fade-in duration-700 delay-500 bg-white/20 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-2 border-white/40 shadow-2xl hover:md:scale-105 active:scale-95 hover:bg-white/25 transition-all duration-300">
                <AnimatedCounter end={4.9} suffix="★" duration={2000} decimals={1} />
                <div className="font-montserrat text-xs sm:text-sm uppercase tracking-wider font-bold mt-1 sm:mt-2 drop-shadow-lg">Valoración</div>
              </div>
            </div>
          </div>
        </section>

        {/* Experiencias - Visual Cards */}
        <section ref={experienciasRef} id="experiencias" className="relative py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto">
              <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-3 sm:mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Elige tu Aventura
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                Tres experiencias únicas en el corazón de la Reserva de la Biósfera del Río Ñuble
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Sección Ñuble Bajo */}
              <div
                className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-rio/30 transition-all duration-500 border-2 border-rio/40"
                onMouseEnter={() => setHoveredExperience('bajo')}
                onMouseLeave={() => setHoveredExperience(null)}
              >
                {/* Image Section - Top Half */}
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-3xl">
                  {/* Image on Hover - only shows when hovering */}
                  <img
                    src="/images/Rafting Familiar.webp"
                    alt="Ñuble Bajo"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${hoveredExperience === 'bajo' ? 'opacity-100' : 'opacity-0'}`}
                  />

                  {/* Color overlay when NOT hovering - gives presence to the box */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-rio/25 to-rio/15 backdrop-blur-sm transition-opacity duration-700 ${hoveredExperience === 'bajo' ? 'opacity-0' : 'opacity-100'}`} />

                  {/* Badge */}
                  <div className="absolute top-6 right-6 bg-rio text-white px-6 py-3 rounded-full font-bold text-base shadow-xl backdrop-blur-sm border-2 border-white/30 z-10">
                    Clase III
                  </div>

                  {/* Subtle dark gradient overlay on hover - lets image show clearly */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-grafito/60 via-grafito/20 to-transparent transition-opacity duration-700 ${hoveredExperience === 'bajo' ? 'opacity-100' : 'opacity-0'}`} />

                  {/* Title and description - moves up on hover */}
                  <div className={`absolute left-0 right-0 p-6 z-10 transition-all duration-700 ${hoveredExperience === 'bajo' ? 'top-6' : 'top-1/2'}`}>
                    <h3 className="font-montserrat font-black text-3xl text-white mb-2 drop-shadow-2xl">
                      Ñuble Bajo
                    </h3>
                    <p className="text-white text-base mb-4 drop-shadow-xl font-medium">
                      Ideal para familias y principiantes. Nuestra sección más trabajada comercialmente.
                    </p>
                  </div>
                </div>

                {/* Info Section - Bottom Half - White Background */}
                <div className="bg-white p-6 rounded-b-3xl">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-rio/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-rio" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-base">6 km</div>
                        <div className="text-xs text-grafito/60">Recorrido</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-rio/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-rio" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-base">12+ años</div>
                        <div className="text-xs text-grafito/60">Edad mínima</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-rio/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-rio" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-base">Todo el año</div>
                        <div className="text-xs text-grafito/60">Temporada</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-rio/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-rio" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-base">Media</div>
                        <div className="text-xs text-grafito/60">Dificultad</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-grafito/10 pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-grafito/60 mb-1 font-medium">Desde</div>
                      <div className="font-montserrat font-black text-3xl text-grafito">$25.000</div>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      className="bg-rio hover:bg-rio/90 text-white rounded-full px-6 py-5 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                      <a href={getWhatsAppLink("+56932344214", "Hola! Me interesa la Sección Ñuble Bajo")} target="_blank" rel="noopener noreferrer">
                        Reservar
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sección Ñuble Bajo Plus */}
              <div
                className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-bosque/30 transition-all duration-500 border-2 border-bosque/40"
                onMouseEnter={() => setHoveredExperience('bajoplus')}
                onMouseLeave={() => setHoveredExperience(null)}
              >
                {/* Image Section - Top Half */}
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-3xl">
                  {/* Image on Hover - only shows when hovering */}
                  <img
                    src="/images/Rafting Familiar.webp"
                    alt="Ñuble Bajo Plus"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${hoveredExperience === 'bajoplus' ? 'opacity-100' : 'opacity-0'}`}
                  />

                  {/* Color overlay when NOT hovering - gives presence to the box */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-bosque/25 to-bosque/15 backdrop-blur-sm transition-opacity duration-700 ${hoveredExperience === 'bajoplus' ? 'opacity-0' : 'opacity-100'}`} />

                  {/* Badge */}
                  <div className="absolute top-6 right-6 bg-bosque text-white px-6 py-3 rounded-full font-bold text-base shadow-xl backdrop-blur-sm border-2 border-white/30 z-10">
                    Clase III
                  </div>

                  {/* Subtle dark gradient overlay on hover - lets image show clearly */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-grafito/60 via-grafito/20 to-transparent transition-opacity duration-700 ${hoveredExperience === 'bajoplus' ? 'opacity-100' : 'opacity-0'}`} />

                  {/* Title and description - moves up on hover */}
                  <div className={`absolute left-0 right-0 p-6 z-10 transition-all duration-700 ${hoveredExperience === 'bajoplus' ? 'top-6' : 'top-1/2'}`}>
                    <h3 className="font-montserrat font-black text-3xl text-white mb-2 drop-shadow-2xl">
                      Ñuble Bajo Plus
                    </h3>
                    <p className="text-white text-base mb-4 drop-shadow-xl font-medium">
                      Similar a Ñuble Bajo pero más extensa. Mayor cantidad de rápidos con snack incluido.
                    </p>
                  </div>
                </div>

                {/* Info Section - Bottom Half - White Background */}
                <div className="bg-white p-6 rounded-b-3xl">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-bosque/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-bosque" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-base">9 km</div>
                        <div className="text-xs text-grafito/60">Recorrido</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-bosque/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-bosque" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-base">Todo público</div>
                        <div className="text-xs text-grafito/60">Edad</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-bosque/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-bosque" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-base">Sep - Dic</div>
                        <div className="text-xs text-grafito/60">Temporada</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-bosque/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-bosque" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-base">Media</div>
                        <div className="text-xs text-grafito/60">Dificultad</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-grafito/10 pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-grafito/60 mb-1 font-medium">Desde</div>
                      <div className="font-montserrat font-black text-3xl text-grafito">$30.000</div>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      className="bg-bosque hover:bg-bosque/90 text-white rounded-full px-6 py-5 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                      <a href={getWhatsAppLink("+56932344214", "Hola! Me interesa la Sección Ñuble Bajo Plus")} target="_blank" rel="noopener noreferrer">
                        Reservar
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sección Ñuble Alto */}
              <div
                className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-[#FF6B35]/30 transition-all duration-500 border-2 border-[#FF6B35]/40"
                onMouseEnter={() => setHoveredExperience('alto')}
                onMouseLeave={() => setHoveredExperience(null)}
              >
                {/* Image Section - Top Half */}
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-3xl">
                  {/* Image on Hover - only shows when hovering */}
                  <img
                    src="/images/Rafting Ñuble Alto.webp"
                    alt="Ñuble Alto"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${hoveredExperience === 'alto' ? 'opacity-100' : 'opacity-0'}`}
                  />

                  {/* Color overlay when NOT hovering - gives presence to the box */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-[#FF6B35]/25 to-[#FF6B35]/15 backdrop-blur-sm transition-opacity duration-700 ${hoveredExperience === 'alto' ? 'opacity-0' : 'opacity-100'}`} />

                  {/* Badge */}
                  <div className="absolute top-6 right-6 bg-[#FF6B35] text-white px-6 py-3 rounded-full font-bold text-base shadow-xl backdrop-blur-sm border-2 border-white/30 z-10">
                    Clase III-IV
                  </div>

                  {/* Subtle dark gradient overlay on hover - lets image show clearly */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-grafito/60 via-grafito/20 to-transparent transition-opacity duration-700 ${hoveredExperience === 'alto' ? 'opacity-100' : 'opacity-0'}`} />

                  {/* Title and description - moves up on hover */}
                  <div className={`absolute left-0 right-0 p-6 z-10 transition-all duration-700 ${hoveredExperience === 'alto' ? 'top-6' : 'top-1/2'}`}>
                    <h3 className="font-montserrat font-black text-3xl text-white mb-2 drop-shadow-2xl">
                      Ñuble Alto
                    </h3>
                    <p className="text-white text-base mb-4 drop-shadow-xl font-medium">
                      Para aventureros experimentados. Máxima adrenalina y emoción con snack incluido.
                    </p>
                  </div>
                </div>

                {/* Info Section - Bottom Half - White Background */}
                <div className="bg-white p-6 rounded-b-3xl">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-[#FF6B35]" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-base">8 km</div>
                        <div className="text-xs text-grafito/60">Recorrido</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-[#FF6B35]" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-base">16+ años</div>
                        <div className="text-xs text-grafito/60">Edad mínima</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-[#FF6B35]" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-base">Todo el año</div>
                        <div className="text-xs text-grafito/60">Temporada</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-[#FF6B35]" />
                      </div>
                      <div>
                        <div className="font-montserrat font-bold text-grafito text-base">Media-Alta</div>
                        <div className="text-xs text-grafito/60">Dificultad</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-grafito/10 pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-grafito/60 mb-1 font-medium">Desde</div>
                      <div className="font-montserrat font-black text-3xl text-grafito">$30.000</div>
                    </div>
                    <Button
                      asChild
                      size="lg"
                      className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white rounded-full px-6 py-5 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                    >
                      <a href={getWhatsAppLink("+56932344214", "Hola! Me interesa la Sección Ñuble Alto")} target="_blank" rel="noopener noreferrer">
                        Reservar
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Incluye */}
            <div className="mt-20 max-w-5xl mx-auto p-12">
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
                  <span className="text-white font-medium drop-shadow-lg">Equipamiento completo (traje de neopreno, remo, casco y chaleco salvavidas)</span>
                </div>
                <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <div className="w-12 h-12 bg-rio rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium drop-shadow-lg">Guías certificados</span>
                </div>
                <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <div className="w-12 h-12 bg-rio rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium drop-shadow-lg">Transporte durante la actividad</span>
                </div>
                <div className="flex items-center gap-4 bg-white/15 backdrop-blur-md p-4 rounded-xl border border-white/20">
                  <div className="w-12 h-12 bg-rio rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-medium drop-shadow-lg">¡¡Fotos de la aventura!!</span>
                </div>
              </div>

              {/* Horarios */}
              <div className="text-center bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-white/30">
                <div className="font-montserrat font-bold text-white text-lg mb-2 drop-shadow-lg">
                  <Clock className="w-6 h-6 inline mr-2" />
                  Horarios de Rafting
                </div>
                <p className="text-white font-medium drop-shadow-lg">
                  11:00 am y 14:30 pm (Martes a Domingo)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Actividades Extras */}
        <section className="relative py-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 max-w-4xl mx-auto">
              <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
                <span className="font-montserrat font-bold text-white text-sm uppercase tracking-wider drop-shadow-lg">Más Aventuras</span>
              </div>
              <h2 className="font-montserrat font-bold text-5xl md:text-6xl text-white mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Actividades Extras
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
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
        <section id="empresas" className="relative py-32 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div>
                  <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
                    <span className="font-montserrat font-bold text-white text-sm uppercase tracking-wider drop-shadow-lg">Grupos</span>
                  </div>
                  <h2 className="font-montserrat font-black text-5xl md:text-6xl text-white mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                    Empresas, Colegios e Instituciones
                  </h2>
                  <p className="text-xl text-white mb-8 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                    Organizamos experiencias grupales personalizadas para team building, salidas educativas y eventos corporativos.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4 bg-white/15 backdrop-blur-md p-4 rounded-xl border border-white/20">
                      <div className="w-12 h-12 bg-gradient-to-br from-rio to-bosque rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-montserrat font-bold text-white text-lg mb-1 drop-shadow-lg">Grupos de Empresas</h3>
                        <p className="text-white/80 drop-shadow-lg">Team building y actividades corporativas para fortalecer equipos</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white/15 backdrop-blur-md p-4 rounded-xl border border-white/20">
                      <div className="w-12 h-12 bg-gradient-to-br from-rio to-bosque rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-montserrat font-bold text-white text-lg mb-1 drop-shadow-lg">Colegios</h3>
                        <p className="text-white/80 drop-shadow-lg">Salidas educativas seguras y divertidas para estudiantes</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-white/15 backdrop-blur-md p-4 rounded-xl border border-white/20">
                      <div className="w-12 h-12 bg-gradient-to-br from-rio to-bosque rounded-xl flex items-center justify-center flex-shrink-0">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-montserrat font-bold text-white text-lg mb-1 drop-shadow-lg">Instituciones</h3>
                        <p className="text-white/80 drop-shadow-lg">Programas especiales para organizaciones públicas y privadas</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-rio to-bosque hover:from-rio/90 hover:to-bosque/90 text-white rounded-full px-10 py-7 text-lg font-bold shadow-2xl hover:scale-105 transition-all border-2 border-white/30"
                  >
                    <a href={getWhatsAppLink("+56932344214", "Hola! Quiero información para un grupo de empresa/colegio/institución")} target="_blank" rel="noopener noreferrer">
                      Solicitar Cotización
                    </a>
                  </Button>
                </div>

                {/* Image */}
                <div className="relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30">
                    <img
                      src="/images/2.webp"
                      alt="Grupos Empresas Colegios"
                      className="w-full h-[600px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-grafito/40 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nosotros - 20 Años */}
        <section ref={nosotrosRef} id="nosotros" className="relative py-32 pb-64 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <div className="inline-block bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-full mb-6 border-2 border-white/50 shadow-xl">
                  <span className="font-montserrat font-bold text-white text-sm uppercase tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Sobre Nosotros</span>
                </div>
                <h2 className="font-montserrat font-black text-5xl md:text-7xl text-white mb-6 drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)] leading-tight">
                  20+ Años de Aventura
                </h2>
                <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] font-semibold">
                  Pioneros del rafting en la Reserva de la Biósfera UNESCO del Río Ñuble
                </p>
              </div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                {/* Image */}
                <div className="relative">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40">
                    <img
                      src="/images/20a.webp"
                      alt="20 Años de Aventura en el Río Ñuble"
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-grafito/40 to-transparent"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6 bg-grafito/40 backdrop-blur-sm p-8 rounded-3xl border-2 border-white/20">
                  <p className="text-lg md:text-xl text-white leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] font-medium">
                    Somos una <strong className="font-montserrat font-bold text-rio">empresa familiar</strong> con más de dos décadas de experiencia guiando aventureros en San Fabián de Alico.
                  </p>
                  <p className="text-lg md:text-xl text-white leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] font-medium">
                    Nuestro compromiso es ofrecer <strong className="font-montserrat font-bold text-bosque">experiencias memorables</strong> con los más altos estándares de seguridad, conocimiento local y respeto por la naturaleza.
                  </p>
                  <p className="text-lg md:text-xl text-white leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] font-medium">
                    Operamos en la <strong className="font-montserrat font-bold text-rio">Reserva de la Biósfera UNESCO del Río Ñuble</strong>, un entorno único que combina paisajes espectaculares con una biodiversidad excepcional.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl border-2 border-white/30 shadow-xl">
                      <div className="font-montserrat font-black text-5xl text-white mb-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">20+</div>
                      <div className="text-white font-semibold drop-shadow-lg">Años de Experiencia</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl border-2 border-white/30 shadow-xl">
                      <div className="font-montserrat font-black text-5xl text-white mb-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">100%</div>
                      <div className="text-white font-semibold drop-shadow-lg">Seguridad Certificada</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-rio to-bosque rounded-2xl flex items-center justify-center mb-4 shadow-xl mx-auto">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-montserrat font-bold text-white text-lg mb-2 drop-shadow-lg">Seguridad Certificada</h4>
                  <p className="text-sm text-white/70 drop-shadow-lg">Equipos y protocolos internacionales de la más alta calidad</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-rio to-bosque rounded-2xl flex items-center justify-center mb-4 shadow-xl mx-auto">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-montserrat font-bold text-white text-lg mb-2 drop-shadow-lg">Empresa Familiar</h4>
                  <p className="text-sm text-white/70 drop-shadow-lg">Pasión y conocimiento local transmitido por generaciones</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-rio to-bosque rounded-2xl flex items-center justify-center mb-4 shadow-xl mx-auto">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-montserrat font-bold text-white text-lg mb-2 drop-shadow-lg">Turismo Sustentable</h4>
                  <p className="text-sm text-white/70 drop-shadow-lg">Compromiso con la conservación y protección ambiental</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-rio to-bosque rounded-2xl flex items-center justify-center mb-4 shadow-xl mx-auto">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-montserrat font-bold text-white text-lg mb-2 drop-shadow-lg">Experiencia Única</h4>
                  <p className="text-sm text-white/70 drop-shadow-lg">En la Reserva de la Biósfera UNESCO del Río Ñuble</p>
                </div>
              </div>

              <div className="text-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-rio to-bosque hover:from-rio/90 hover:to-bosque/90 text-white rounded-full px-10 py-7 text-lg font-bold shadow-2xl hover:scale-105 transition-all border-2 border-white/30"
                >
                  <a href={getWhatsAppLink("+56932344214", "Hola! Quiero saber más sobre Outdoor Ñuble")} target="_blank" rel="noopener noreferrer">
                    Conocer más
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Gradient transition to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-grafito pointer-events-none"></div>
        </section>

        {/* CTA Final + Footer - Banner Style */}
        <section id="contacto" className="relative min-h-screen flex flex-col overflow-hidden bg-grafito">
          {/* Background Image - Full Section */}
          <div className="absolute inset-0">
            <img
              src="/images/contacto.webp"
              alt="Contacto Outdoor Ñuble"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Gradient overlay - Transición suave desde negro */}
            <div className="absolute inset-0 bg-gradient-to-b from-grafito via-transparent to-grafito/80"></div>
          </div>

          {/* Contact Content */}
          <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 text-center flex-grow flex items-center">
            <div className="max-w-5xl mx-auto w-full">
              <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/30">
                <span className="font-montserrat font-bold text-white text-sm uppercase tracking-wider drop-shadow-lg">Contáctanos</span>
              </div>

              <h2 className="font-montserrat font-black text-5xl md:text-7xl text-white mb-8 leading-tight drop-shadow-[0_6px_16px_rgba(0,0,0,0.9)]">
                ¿Listo para tu<br/>Próxima Aventura?
              </h2>
              <p className="text-xl md:text-2xl text-white mb-16 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                Reserva ahora y vive una experiencia inolvidable en el río Ñuble
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-rio to-bosque hover:from-rio/90 hover:to-bosque/90 text-white px-14 py-9 text-xl rounded-full shadow-[0_20px_60px_rgba(10,132,174,0.4)] hover:shadow-[0_25px_70px_rgba(10,132,174,0.6)] hover:scale-110 transition-all font-bold border-2 border-white/40"
                >
                  <a href={getWhatsAppLink("+56932344214", getDefaultRaftingMessage())} target="_blank" rel="noopener noreferrer">
                    Reservar por WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-3 border-white text-white bg-white/20 hover:bg-white hover:text-bosque px-14 py-9 text-xl rounded-full backdrop-blur-md transition-all font-bold hover:scale-110 shadow-[0_20px_60px_rgba(255,255,255,0.2)]"
                >
                  <a href="mailto:contacto@outdoornuble.cl">
                    Enviar Email
                  </a>
                </Button>
              </div>

              <div className="grid sm:grid-cols-3 gap-8 text-white max-w-4xl mx-auto">
                <div className="bg-white/15 backdrop-blur-xl p-8 rounded-2xl border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all shadow-xl">
                  <MapPin className="w-8 h-8 mx-auto mb-3 text-rio drop-shadow-lg" />
                  <div className="text-xs opacity-90 uppercase tracking-wider mb-2 drop-shadow-lg font-bold">Ubicación</div>
                  <div className="font-montserrat font-bold text-lg drop-shadow-lg">San Fabián de Alico</div>
                  <div className="text-sm opacity-80 drop-shadow-lg">Región de Ñuble</div>
                </div>
                <div className="bg-white/15 backdrop-blur-xl p-8 rounded-2xl border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all shadow-xl">
                  <svg className="w-8 h-8 mx-auto mb-3 text-rio drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="text-xs opacity-90 uppercase tracking-wider mb-2 drop-shadow-lg font-bold">Teléfono</div>
                  <div className="font-montserrat font-bold text-lg drop-shadow-lg">+56 9 3234 4214</div>
                </div>
                <div className="bg-white/15 backdrop-blur-xl p-8 rounded-2xl border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all shadow-xl">
                  <svg className="w-8 h-8 mx-auto mb-3 text-rio drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="text-xs opacity-90 uppercase tracking-wider mb-2 drop-shadow-lg font-bold">Email</div>
                  <div className="font-montserrat font-bold text-base drop-shadow-lg">contacto@outdoornuble.cl</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Overlaid on background */}
          <footer className="relative z-10 bg-transparent backdrop-blur-md py-8 border-t border-white/20 mt-auto">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  <img src="/images/isotipo.svg" alt="Outdoor Ñuble" className="h-10 w-auto" />
                  <div>
                    <div className="font-montserrat font-bold text-white drop-shadow-lg">OUTDOOR ÑUBLE</div>
                    <div className="text-white/80 text-sm drop-shadow-lg">Tu próxima aventura</div>
                  </div>
                </div>

                <div className="text-white/80 text-sm drop-shadow-lg">
                  © 2024 Outdoor Ñuble. Todos los derechos reservados.
                </div>

                <div className="flex items-center gap-4">
                  <a href="#" className="text-white/70 hover:text-white transition-colors drop-shadow-lg hover:scale-110 duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="#" className="text-white/70 hover:text-white transition-colors drop-shadow-lg hover:scale-110 duration-300">
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
