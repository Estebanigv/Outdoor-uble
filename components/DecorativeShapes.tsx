interface DecorativeShapesProps {
  variant?: "default" | "hero" | "dark";
}

export default function DecorativeShapes({ variant = "default" }: DecorativeShapesProps) {
  if (variant === "hero") {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Formas angulares estilo collage */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          {/* Forma grande izquierda - Verde Bosque */}
          <path
            d="M 0,0 L 500,0 L 300,400 L 0,500 Z"
            fill="#2E7D32"
            opacity="0.35"
          />

          {/* Forma angular superior - Azul Río */}
          <path
            d="M 200,0 L 800,0 L 600,350 L 400,200 Z"
            fill="#0A84AE"
            opacity="0.4"
          />

          {/* Forma central - Crema */}
          <path
            d="M 300,200 L 700,250 L 650,500 L 250,450 Z"
            fill="#FAF4E6"
            opacity="0.25"
          />

          {/* Forma derecha superior - Bosque claro */}
          <path
            d="M 700,0 L 1200,0 L 1200,400 L 900,300 Z"
            fill="#2E7D32"
            opacity="0.3"
          />

          {/* Forma inferior izquierda - Río */}
          <path
            d="M 0,400 L 400,500 L 300,800 L 0,800 Z"
            fill="#0A84AE"
            opacity="0.35"
          />

          {/* Forma angular central baja - Tierra */}
          <path
            d="M 400,500 L 800,450 L 700,800 L 300,800 Z"
            fill="#8D6E63"
            opacity="0.25"
          />

          {/* Forma derecha inferior - Bosque */}
          <path
            d="M 800,400 L 1200,450 L 1200,800 L 700,800 Z"
            fill="#2E7D32"
            opacity="0.3"
          />

          {/* Capa adicional pequeña - Río claro */}
          <path
            d="M 500,100 L 750,150 L 700,300 L 450,250 Z"
            fill="#0A84AE"
            opacity="0.2"
          />
        </svg>
      </div>
    );
  }

  if (variant === "dark") {
    return (
      <>
        <div className="absolute top-0 left-0 w-96 h-96 bg-bosque/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rio/10 rounded-full blur-3xl pointer-events-none"></div>
      </>
    );
  }

  // default variant
  return (
    <>
      <div className="absolute top-0 right-0 w-96 h-96 bg-rio/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-bosque/5 rounded-full blur-3xl pointer-events-none"></div>
    </>
  );
}
