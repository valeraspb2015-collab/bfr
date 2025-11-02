import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <header className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] border-b-2 border-[#bcd0e6] py-10 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Building2 className="w-10 h-10 text-[#004d80]" />
          <h1 className="text-[28px] md:text-[32px] font-semibold text-[#004d80] leading-tight">
            Сообщество хозяев квартир БФР
          </h1>
        </div>
        <p className="text-[18px] text-[#555] max-w-2xl mx-auto">
          Быстрый подбор квартир напрямую от собственников — без комиссий и переплат!
        </p>
        <Button 
          onClick={onGetStarted}
          size="lg"
          className="text-[18px] px-7 py-6 rounded-lg bg-[#0078d7] hover:bg-[#005fa3] text-white transition-colors"
          data-testid="button-get-apartment"
        >
          Подобрать квартиру
        </Button>
      </div>
    </header>
  );
}
