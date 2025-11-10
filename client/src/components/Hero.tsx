import { Button } from "@/components/ui/button";
import logoImage from "@assets/IMG_1708_1762164822589.jpg";
import guestsImage from "@assets/stock_images/happy_family_vacatio_b2bd300f.jpg";
import ownersImage from "@assets/stock_images/property_owner_landl_7f1ede93.jpg";

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

      <div className="flex-1 grid md:grid-cols-2 gap-0">
        <div className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${guestsImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="relative z-10 px-8 py-12 text-center max-w-lg">
            <h3 className="text-[32px] md:text-[40px] font-semibold text-white mb-6">
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

        <div className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${ownersImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="relative z-10 px-8 py-12 text-center max-w-lg">
            <h3 className="text-[32px] md:text-[40px] font-semibold text-white mb-6">
              Для хозяев
            </h3>
            <p className="text-[16px] md:text-[18px] text-white leading-relaxed mb-8">
              Начните принимать гостей через один корпоративный счет БФР. Получайте проверенных арендаторов без комиссий.
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
