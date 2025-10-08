interface WaveDividerProps {
  color?: string;
  flip?: boolean;
}

export default function WaveDivider({ color = "#ffffff", flip = false }: WaveDividerProps) {
  return (
    <div className={`relative ${flip ? "rotate-180" : ""}`}>
      <svg className="w-full h-24 md:h-32" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
        <path d="M0,64 C480,120 960,0 1440,64 L1440,120 L0,120 Z" fill={color} />
      </svg>
    </div>
  );
}
