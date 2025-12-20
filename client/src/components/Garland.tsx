import { useEffect, useState } from "react";

interface Light {
  id: number;
  color: string;
  delay: number;
}

const COLORS = [
  "#ff6b6b",
  "#feca57",
  "#48dbfb",
  "#1dd1a1",
  "#ff9ff3",
  "#54a0ff",
];

export default function Garland() {
  const [lights, setLights] = useState<Light[]>([]);

  useEffect(() => {
    const bulbs: Light[] = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      bulbs.push({
        id: i,
        color: COLORS[i % COLORS.length],
        delay: i * 0.1,
      });
    }
    setLights(bulbs);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden pointer-events-none z-50">
      <svg
        className="absolute w-full h-12"
        viewBox="0 0 1000 50"
        preserveAspectRatio="none"
      >
        <path
          d="M0,10 Q50,25 100,10 Q150,25 200,10 Q250,25 300,10 Q350,25 400,10 Q450,25 500,10 Q550,25 600,10 Q650,25 700,10 Q750,25 800,10 Q850,25 900,10 Q950,25 1000,10"
          fill="none"
          stroke="#2d3436"
          strokeWidth="2"
        />
      </svg>
      <div className="flex justify-around items-start pt-1 px-2">
        {lights.map((light) => (
          <div
            key={light.id}
            className="relative animate-twinkle"
            style={{
              animationDelay: `${light.delay}s`,
            }}
          >
            <div
              className="w-3 h-4 rounded-b-full relative"
              style={{
                backgroundColor: light.color,
                boxShadow: `0 0 10px ${light.color}, 0 0 20px ${light.color}`,
              }}
            >
              <div
                className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-t-sm"
                style={{ backgroundColor: "#636e72" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
