import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const newYear = new Date("2026-01-01T00:00:00");
  const now = new Date();
  const difference = newYear.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function NewYearBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="bg-gradient-to-r from-[#1a5f7a] via-[#159895] to-[#1a5f7a] py-3 px-4 text-center">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
          <span className="text-white text-sm font-medium">
            С наступающим 2026 годом!
          </span>
          <span className="text-white/80 text-sm hidden sm:inline">
            Желаем уюта и тепла в новом году
          </span>
          <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
        </div>
        <div className="flex items-center gap-3 text-white" data-testid="countdown-timer">
          <div className="flex flex-col items-center">
            <span className="text-lg sm:text-xl font-bold tabular-nums">{formatNumber(timeLeft.days)}</span>
            <span className="text-[10px] text-white/70">дней</span>
          </div>
          <span className="text-lg font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-lg sm:text-xl font-bold tabular-nums">{formatNumber(timeLeft.hours)}</span>
            <span className="text-[10px] text-white/70">часов</span>
          </div>
          <span className="text-lg font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-lg sm:text-xl font-bold tabular-nums">{formatNumber(timeLeft.minutes)}</span>
            <span className="text-[10px] text-white/70">минут</span>
          </div>
          <span className="text-lg font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-lg sm:text-xl font-bold tabular-nums">{formatNumber(timeLeft.seconds)}</span>
            <span className="text-[10px] text-white/70">секунд</span>
          </div>
        </div>
      </div>
    </div>
  );
}
