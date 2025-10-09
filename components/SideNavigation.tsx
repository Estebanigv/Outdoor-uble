"use client";

import { useState, useEffect } from "react";

interface Section {
  id: string;
  label: string;
  number: string;
}

const sections: Section[] = [
  { id: "hero", label: "Comienza tu aventura", number: "01" },
  { id: "experiencias", label: "Experiencias", number: "02" },
  { id: "actividades-extras", label: "Actividades Extras", number: "03" },
  { id: "empresas", label: "Grupos", number: "04" },
  { id: "galeria", label: "Galería", number: "05" },
  { id: "testimonios", label: "Testimonios", number: "06" },
  { id: "nosotros", label: "Nosotros", number: "07" },
  { id: "contacto", label: "Contacto", number: "08" },
];

export default function SideNavigation() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      // Determine active section based on viewport center
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let currentSection = sections[0].id;

      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          // Check if scroll position is within this section
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = sections[i].id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 hidden xl:block">
      <div className="relative">
        {/* Vertical line - Straight and subtle */}
        <div className="absolute left-7 top-0 bottom-0 w-px bg-white/15"></div>

        {/* Active indicator - Subtle glowing dot */}
        <div
          className="absolute left-7 w-2 h-2 bg-gradient-to-br from-rio to-bosque rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(10,132,174,0.5)]"
          style={{
            top: `${sections.findIndex(s => s.id === activeSection) * 80 + 26}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rio to-bosque rounded-full animate-ping opacity-50"></div>
        </div>

        {/* Navigation items */}
        <nav className="relative flex flex-col gap-0">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group flex items-center gap-4 py-6 transition-all duration-300 hover:translate-x-2"
              >
                {/* Number Circle - More subtle */}
                <div className="relative z-10">
                  {/* Subtle glow effect on active */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-rio to-bosque rounded-full blur-sm opacity-30 animate-pulse"></div>
                  )}

                  <div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center font-montserrat font-bold text-xs transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-rio to-bosque text-white scale-105 shadow-[0_0_15px_rgba(10,132,174,0.4)]'
                        : 'bg-white/5 text-white/70 backdrop-blur-sm border border-white/10 group-hover:bg-gradient-to-br group-hover:from-rio group-hover:to-bosque group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(10,132,174,0.3)] group-hover:border-transparent group-hover:text-white'
                    }`}
                  >
                    {section.number}
                  </div>
                </div>

                {/* Label with background - More elegant */}
                <div
                  className={`font-montserrat font-semibold text-xs tracking-wide transition-all duration-300 whitespace-nowrap px-4 py-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 ${
                    isActive
                      ? 'text-white bg-white/10 border border-white/15'
                      : 'text-white/80 bg-white/5 border border-white/10'
                  }`}
                >
                  {section.label}
                </div>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
