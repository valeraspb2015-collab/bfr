import { Button } from "@/components/ui/button";
import logoImage from "@assets/IMG_1708_1762164822589.jpg";

export default function Hero() {
  const whatsappNumber = "79899865887";
  const whatsappMessage = "Здравствуйте! Хочу подобрать квартиру через БФР.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <header className="bg-gradient-to-br from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] border-b-2 border-[#bcd0e6] py-10 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img src={logoImage} alt="БФР" className="w-10 h-10 object-contain" />
            <h1 className="text-[28px] md:text-[32px] font-semibold text-[#004d80] leading-tight">
              Сообщество хозяев квартир
            </h1>
          </div>
          <h2 className="text-[28px] md:text-[32px] font-semibold text-[#004d80] text-center">
            БФР
          </h2>
        </div>
        <p className="text-[18px] text-[#555] max-w-2xl mx-auto">
          Быстрый подбор квартир напрямую от собственников — без комиссий и переплат!
        </p>
        <Button 
          asChild
          size="lg"
          className="text-[18px] px-7 py-6 rounded-lg bg-[#0078d7] hover:bg-[#005fa3] text-white transition-colors"
          data-testid="button-get-apartment"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Подобрать квартиру
          </a>
        </Button>
      </div>
    </header>
  );
}
