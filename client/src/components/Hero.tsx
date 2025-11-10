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
      <div className="bg-white py-4 px-4 md:px-8 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="БФР" className="w-10 h-10 object-contain" />
            <span 
              className="text-[18px] md:text-[22px] font-semibold text-[#0078d7] leading-none"
              style={{ 
                fontStyle: 'italic',
                transform: 'skewX(-6deg)',
                letterSpacing: '0.5px'
              }}
            >
              Booking for rent
            </span>
          </div>
          <h2 className="text-[16px] md:text-[20px] font-semibold text-[#333]">
            Сообщество хозяев квартир БФР
          </h2>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row -mx-px">
        <div 
          className="relative min-h-[500px] md:min-h-[600px] flex-1 flex items-center justify-center overflow-hidden"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 94% 100%, 0 100%)',
          }}
        >
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
          className="relative min-h-[500px] md:min-h-[600px] flex-1 flex items-center justify-center overflow-hidden -ml-1"
          style={{
            clipPath: 'polygon(6% 0, 100% 0, 100% 100%, 0 100%)',
          }}
        >
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
