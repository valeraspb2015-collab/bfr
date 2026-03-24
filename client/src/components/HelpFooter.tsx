import { Link } from "wouter";
import logoImage from "@assets/IMG_1708_1762164822589.jpg";

interface HelpFooterProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

export default function HelpFooter({ onGuestClick, onOwnerClick }: HelpFooterProps) {
  return (
    <footer
      className="py-14 px-4"
      style={{ background: "#1c1917", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImage} alt="БФР" className="w-8 h-8 object-contain rounded" />
              <div>
                <span className="font-bold" style={{ color: "#faf7f2" }}>БФР</span>
                <p className="text-xs" style={{ color: "#a39e98" }}>Best flat rent · Лучшая аренда квартир</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#a39e98" }}>
              Опишите — получите предложения. Без посредников.
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#c8622a" }}></div>
                <span style={{ color: "#a39e98" }}>Прямой контакт</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#4a7c59" }}></div>
                <span style={{ color: "#a39e98" }}>Без комиссий</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#e07540" }}></div>
                <span style={{ color: "#a39e98" }}>Нейросети</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: "#faf7f2" }}>Поддержка</h4>
            <ul className="space-y-3 text-sm" style={{ color: "#a39e98" }}>
              <li>
                <a href="https://t.me/bfrreplit_bot" target="_blank" rel="noopener noreferrer"
                  className="transition-colors hover:text-[#e07540]" data-testid="link-footer-telegram">
                  Написать в Telegram
                </a>
              </li>
              <li>
                <a href="https://wa.me/79899865887" target="_blank" rel="noopener noreferrer"
                  className="transition-colors hover:text-[#e07540]" data-testid="link-footer-whatsapp">
                  Написать в WhatsApp
                </a>
              </li>
              <li>
                <a href="https://max.ru/call/+79213798941" target="_blank" rel="noopener noreferrer"
                  className="transition-colors hover:text-[#e07540]" data-testid="link-footer-max">
                  Написать в Макс
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: "#faf7f2" }}>Для хозяев</h4>
            <ul className="space-y-3 text-sm" style={{ color: "#a39e98" }}>
              <li>
                <button onClick={onOwnerClick}
                  className="transition-colors text-left hover:text-[#e07540]" data-testid="link-footer-become-host">
                  Стать хозяином
                </button>
              </li>
              <li>
                <a href="https://t.me/bfrreplit_bot" target="_blank" rel="noopener noreferrer"
                  className="transition-colors hover:text-[#e07540]" data-testid="link-footer-host-materials">
                  Материалы для хозяев
                </a>
              </li>
              <li>
                <a href="https://t.me/bfr_community" target="_blank" rel="noopener noreferrer"
                  className="transition-colors hover:text-[#e07540]" data-testid="link-footer-community">
                  Сообщество БФР
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: "#faf7f2" }}>О БФР</h4>
            <ul className="space-y-3 text-sm" style={{ color: "#a39e98" }}>
              <li>
                <Link href="/#faq" className="transition-colors hover:text-[#e07540]" data-testid="link-footer-about">
                  Что такое БФР?
                </Link>
              </li>
              <li>
                <Link href="/#cooperation" className="transition-colors hover:text-[#e07540]" data-testid="link-footer-cooperation">
                  Сотрудничество
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-[#e07540]" data-testid="link-footer-privacy">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-[#e07540]" data-testid="link-footer-terms">
                  Условия использования
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-sm" style={{ color: "#a39e98" }}>
            © 2026 Сообщество хозяев квартир «БФР». Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            <button className="text-sm transition-colors hover:text-[#e07540]" style={{ color: "#a39e98" }} data-testid="button-lang-ru">
              RU
            </button>
            <span style={{ color: "#6b6560" }}>|</span>
            <button className="text-sm transition-colors hover:text-[#e07540]" style={{ color: "#a39e98" }} data-testid="button-lang-en">
              EN
            </button>
            <span style={{ color: "#6b6560" }}>|</span>
            <span className="text-sm" style={{ color: "#a39e98" }}>₽ RUB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
