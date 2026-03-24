import { Link } from "wouter";
import logoImage from "@assets/IMG_1708_1762164822589.jpg";

interface HelpFooterProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

export default function HelpFooter({ onGuestClick, onOwnerClick }: HelpFooterProps) {
  return (
    <footer className="bg-[#13131a] border-t border-white/[0.06] py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImage} alt="БФР" className="w-8 h-8 object-contain rounded" />
              <div>
                <span className="text-slate-100 font-bold">БФР</span>
                <p className="text-xs text-slate-500">Best flat rent · Лучшая аренда квартир</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Сообщество хозяев квартир — аренда напрямую без комиссий площадке.
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                <span className="text-slate-500">Прямой контакт</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                <span className="text-slate-500">Без комиссий</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-violet-400 rounded-full"></div>
                <span className="text-slate-500">Нейросети</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-slate-100 font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="https://t.me/bfrreplit_bot" target="_blank" rel="noopener noreferrer"
                  className="hover:text-indigo-300 transition-colors" data-testid="link-footer-telegram">
                  Написать в Telegram
                </a>
              </li>
              <li>
                <a href="https://wa.me/79899865887" target="_blank" rel="noopener noreferrer"
                  className="hover:text-indigo-300 transition-colors" data-testid="link-footer-whatsapp">
                  Написать в WhatsApp
                </a>
              </li>
              <li>
                <a href="https://max.ru/call/+79213798941" target="_blank" rel="noopener noreferrer"
                  className="hover:text-indigo-300 transition-colors" data-testid="link-footer-max">
                  Написать в Макс
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-100 font-semibold mb-4">Для хозяев</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <button onClick={onOwnerClick}
                  className="hover:text-indigo-300 transition-colors text-left" data-testid="link-footer-become-host">
                  Стать хозяином
                </button>
              </li>
              <li>
                <a href="https://t.me/bfrreplit_bot" target="_blank" rel="noopener noreferrer"
                  className="hover:text-indigo-300 transition-colors" data-testid="link-footer-host-materials">
                  Материалы для хозяев
                </a>
              </li>
              <li>
                <a href="https://t.me/bfr_community" target="_blank" rel="noopener noreferrer"
                  className="hover:text-indigo-300 transition-colors" data-testid="link-footer-community">
                  Сообщество БФР
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-100 font-semibold mb-4">О БФР</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/#faq" className="hover:text-indigo-300 transition-colors" data-testid="link-footer-about">
                  Что такое БФР?
                </Link>
              </li>
              <li>
                <Link href="/#cooperation" className="hover:text-indigo-300 transition-colors" data-testid="link-footer-cooperation">
                  Сотрудничество
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-300 transition-colors" data-testid="link-footer-privacy">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-300 transition-colors" data-testid="link-footer-terms">
                  Условия использования
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2025 Сообщество хозяев квартир «БФР». Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-sm text-slate-400 hover:text-indigo-300 transition-colors" data-testid="button-lang-ru">
              RU
            </button>
            <span className="text-slate-600">|</span>
            <button className="text-sm text-slate-500 hover:text-indigo-300 transition-colors" data-testid="button-lang-en">
              EN
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-sm text-slate-500">₽ RUB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
