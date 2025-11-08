import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import logoImage from "@assets/IMG_1708_1762164822589.jpg";
import spb1 from "@assets/stock_images/saint_petersburg_rus_506bf4e5.jpg";
import spb2 from "@assets/stock_images/saint_petersburg_rus_074bc0de.jpg";
import spb3 from "@assets/stock_images/saint_petersburg_rus_5d1761f1.jpg";
import spb4 from "@assets/stock_images/saint_petersburg_rus_7ef098cc.jpg";
import spb5 from "@assets/stock_images/saint_petersburg_rus_91d877a2.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

const slides = [spb1, spb2, spb3, spb4, spb5];

export default function Hero({ onGetStarted }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: currentSlide === index ? 1 : 0,
            backgroundImage: `url(${slide})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="mb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src={logoImage} alt="БФР" className="w-16 h-16 object-contain drop-shadow-lg" />
            <h1 className="text-[40px] md:text-[56px] font-bold text-white leading-tight drop-shadow-lg">
              Сообщество хозяев квартир
            </h1>
          </div>
          <h2 className="text-[40px] md:text-[56px] font-bold text-white text-center drop-shadow-lg">
            БФР
          </h2>
        </div>
        
        <p className="text-[20px] md:text-[24px] text-white/90 max-w-3xl mx-auto mb-10 drop-shadow-md">
          Быстрый подбор квартир напрямую от собственников — без комиссий и переплат!
        </p>
        
        <Button 
          onClick={onGetStarted}
          size="lg"
          className="text-[20px] px-10 py-7 rounded-lg bg-[#0078d7] hover:bg-[#005fa3] text-white transition-all shadow-xl hover:shadow-2xl"
          data-testid="button-get-apartment"
        >
          Подобрать квартиру
        </Button>
        
        <div className="flex gap-2 justify-center mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index 
                  ? "bg-white w-8" 
                  : "bg-white/50 hover:bg-white/75"
              }`}
              data-testid={`slide-indicator-${index}`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
