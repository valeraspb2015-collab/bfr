import { Button } from "@/components/ui/button";
import logoImage from "@assets/IMG_1708_1762164822589.jpg";
import guestsImage from "@assets/stock_images/beautiful_modern_apa_a5d18398.jpg";
import ownersImage from "@assets/stock_images/handshake_business_p_dbd52d17.jpg";

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="bg-white py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <img src={logoImage} alt="БФР" className="w-12 h-12 object-contain" />
            <h1 
              className="text-[28px] md:text-[36px] font-bold text-[#0078d7] leading-none"
              style={{ 
                fontStyle: 'italic',
                transform: 'skewX(-8deg)',
                letterSpacing: '1px'
              }}
            >
              Booking for rent
            </h1>
          </div>
        </div>
      </div>

      <div className="text-center py-4 bg-white">
        <h2 className="text-[20px] md:text-[24px] font-semibold text-[#333]">
          Сообщество хозяев квартир
        </h2>
      </div>

      <div className="flex-1 relative flex flex-col md:flex-row">
        <div className="relative min-h-[500px] md:min-h-[600px] flex-1 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${guestsImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50" />
          
          <div className="relative z-10 px-8 py-12 text-center max-w-lg">
            <h3 className="text-[32px] md:text-[42px] font-semibold text-white mb-6">
              Для гостей
            </h3>
            <p className="text-[16px] md:text-[18px] text-white leading-relaxed mb-8">
              Подбирайте квартиры напрямую от собственников и бронируйте жилье без переплат и комиссий агентствам.
            </p>
            <Button 
              onClick={onGetStarted}
              className="text-[16px] px-12 py-6 rounded-full bg-[#0070ba] hover:bg-[#005ea6] text-white transition-all min-w-[240px]"
              data-testid="button-get-apartment"
            >
              Подобрать квартиру
            </Button>
          </div>
        </div>

        <div 
          className="hidden md:block absolute top-0 bottom-0 left-1/2 w-24 bg-white -ml-12 z-20"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 100%)',
            transform: 'skewX(-3deg)',
          }}
        />

        <div className="relative min-h-[500px] md:min-h-[600px] flex-1 flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${ownersImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50" />
          
          <div className="relative z-10 px-8 py-12 text-center max-w-lg">
            <h3 className="text-[32px] md:text-[42px] font-semibold text-white mb-6">
              Для хозяев
            </h3>
            <p className="text-[16px] md:text-[18px] text-white leading-relaxed mb-8">
              Начните принимать гостей через наше Сообщество. Получайте проверенных арендаторов.
            </p>
            <Button 
              onClick={onGetStarted}
              className="text-[16px] px-12 py-6 rounded-full bg-[#0070ba] hover:bg-[#005ea6] text-white transition-all min-w-[240px]"
              data-testid="button-submit-application"
            >
              Подать заявку
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white py-6 text-center border-t">
        <p className="text-[15px] text-[#6c7378]">
          Остались вопросы?{" "}
          <a 
            href="https://t.me/+79213798941" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#0070ba] hover:underline"
            data-testid="link-help-center"
          >
            Напишите нам
          </a>
          , чтобы получить помощь
        </p>
      </div>
    </div>
  );
}
