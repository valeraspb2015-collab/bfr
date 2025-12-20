import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
}

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 50; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 5 + Math.random() * 10,
        animationDelay: Math.random() * 5,
        size: 3 + Math.random() * 8,
        opacity: 0.4 + Math.random() * 0.6,
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-snowfall"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full text-blue-200"
          >
            <path d="M12 0L13.5 4.5L18 6L13.5 7.5L12 12L10.5 7.5L6 6L10.5 4.5L12 0Z" />
            <path d="M12 12L13.5 16.5L18 18L13.5 19.5L12 24L10.5 19.5L6 18L10.5 16.5L12 12Z" />
            <path d="M0 12L4.5 13.5L6 18L7.5 13.5L12 12L7.5 10.5L6 6L4.5 10.5L0 12Z" />
            <path d="M12 12L16.5 13.5L18 18L19.5 13.5L24 12L19.5 10.5L18 6L16.5 10.5L12 12Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
