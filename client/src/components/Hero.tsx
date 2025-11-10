import { Button } from "@/components/ui/button";
import logoImage from "@assets/IMG_1708_1762164822589.jpg";
import guestsImage from "@assets/stock_images/happy_family_vacatio_b2bd300f.jpg";
import ownersImage from "@assets/stock_images/property_owner_landl_7f1ede93.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white py-6 px-4 md:px-8 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <img src={logoImage} alt="БФР" className="w-14 h-14 object-contain" />
            <h1 
              className="text-[32px] md:text-[42px] font-bold text-[#0078d7] leading-none"
              style={{ 
                fontStyle: 'italic',
                transform: 'skewX(-8deg)',
                letterSpacing: '1px'
              }}
            >
              Booking for rent
            </h1>
          </div>
          <h2 className="text-[24px] md:text-[28px] font-semibold text-[#333] text-center">
            Сообщество хозяев квартир
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${guestsImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60" />
          
          <div className="relative z-10 px-6 py-12 text-center max-w-md">
            <h3 className="text-[36px] md:text-[44px] font-bold text-white mb-6 drop-shadow-lg">
              Для гостей
            </h3>
            <p className="text-[18px] md:text-[20px] text-white/95 mb-4 drop-shadow-md leading-relaxed">
              Ищете уютное жилье в Санкт-Петербурге? 
            </p>
            <p className="text-[16px] md:text-[18px] text-white/90 mb-8 drop-shadow-md leading-relaxed">
              Мы подберем для вас идеальную квартиру напрямую от собственника — без посредников и переплат. Комфортное проживание по честной цене!
            </p>
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="text-[18px] px-8 py-6 rounded-lg bg-[#0078d7] hover:bg-[#005fa3] text-white transition-all shadow-xl hover:shadow-2xl w-full md:w-auto"
              data-testid="button-get-apartment"
            >
              Подобрать квартиру
            </Button>
          </div>
        </div>

        <div className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${ownersImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60" />
          
          <div className="relative z-10 px-6 py-12 text-center max-w-md">
            <h3 className="text-[36px] md:text-[44px] font-bold text-white mb-6 drop-shadow-lg">
              Для хозяев
            </h3>
            <p className="text-[18px] md:text-[20px] text-white/95 mb-4 drop-shadow-md leading-relaxed">
              Сдаете квартиру в Санкт-Петербурге?
            </p>
            <p className="text-[16px] md:text-[18px] text-white/90 mb-8 drop-shadow-md leading-relaxed">
              Присоединяйтесь к нашему сообществу! Получайте проверенных гостей, управляйте бронированиями и зарабатывайте больше без комиссий агентствам.
            </p>
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="text-[18px] px-8 py-6 rounded-lg bg-[#25D366] hover:bg-[#1da851] text-white transition-all shadow-xl hover:shadow-2xl w-full md:w-auto"
              data-testid="button-submit-application"
            >
              Подать заявку
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
