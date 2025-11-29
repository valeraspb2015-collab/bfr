import { Link } from "wouter";
import logoImage from "@assets/IMG_1708_1762164822589.jpg";

interface HelpFooterProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

export default function HelpFooter({ onGuestClick, onOwnerClick }: HelpFooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 pb-10 border-b border-gray-800">
          <div className="max-w-2xl">
            <h3 className="text-xl font-semibold text-white mb-4">Наша миссия</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              БФР создан как ответ на дорогие комиссионные модели крупных площадок. 
              Мы объединяем удобство современных технологий с прямым контактом между людьми, 
              чтобы аренда жилья была честной и доступной для всех.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00a67d] rounded-full"></div>
                <span>Прямые отношения</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#0078d7] rounded-full"></div>
                <span>Технологии вместо посредников</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#9b59b6] rounded-full"></div>
                <span>Справедливые цены</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImage} alt="БФР" className="w-8 h-8 object-contain rounded" />
              <div>
                <span className="text-white font-semibold">БФР</span>
                <p className="text-xs text-gray-500">Booking For Rent</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Сообщество хозяев квартир — аренда напрямую без комиссий.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors" data-testid="link-footer-faq">
                  Центр помощи
                </Link>
              </li>
              <li>
                <a 
                  href="https://t.me/bfrreplit_bot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-telegram"
                >
                  Написать в Telegram
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/79899865887" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  data-testid="link-footer-whatsapp"
                >
                  Написать в WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Для хозяев</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button 
                  onClick={onOwnerClick}
                  className="hover:text-white transition-colors text-left"
                  data-testid="link-footer-become-host"
                >
                  Стать хозяином
                </button>
              </li>
              <li>
                <span className="text-gray-500 cursor-default">Материалы для хозяев</span>
              </li>
              <li>
                <span className="text-gray-500 cursor-default">Сообщество БФР</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">О БФР</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="text-gray-500 cursor-default">О проекте</span>
              </li>
              <li>
                <span className="text-gray-500 cursor-default">Политика конфиденциальности</span>
              </li>
              <li>
                <span className="text-gray-500 cursor-default">Условия использования</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2025 Сообщество хозяев квартир «БФР». Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-400 hover:text-white transition-colors" data-testid="button-lang-ru">
              RU
            </button>
            <span className="text-gray-600">|</span>
            <button className="text-sm text-gray-500 hover:text-white transition-colors" data-testid="button-lang-en">
              EN
            </button>
            <span className="text-gray-600">|</span>
            <span className="text-sm text-gray-400">₽ RUB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
