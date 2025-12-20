import { Sparkles } from "lucide-react";

export default function NewYearBanner() {
  return (
    <div className="bg-gradient-to-r from-[#1a5f7a] via-[#159895] to-[#1a5f7a] py-2 px-4 text-center">
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
    </div>
  );
}
