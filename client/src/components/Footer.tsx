import { MessageSquare, Phone } from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="text-center py-8 px-4 bg-background border-t">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[15px] text-foreground/70">
          <a 
            href="https://t.me/bfrreplit_bot"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover-elevate px-4 py-2 rounded-md transition-colors"
            data-testid="link-telegram"
          >
            <SiTelegram className="w-5 h-5 text-[#0078d7]" />
            <span>Напишите в Telegram</span>
          </a>
          <a 
            href="https://wa.me/79213798941"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover-elevate px-4 py-2 rounded-md transition-colors"
            data-testid="link-whatsapp"
          >
            <SiWhatsapp className="w-5 h-5 text-[#25D366]" />
            <span>Связаться с нами</span>
          </a>
        </div>
        <p className="text-[14px] text-foreground/60">
          © 2025 Сообщество хозяев квартир "БФР"
        </p>
      </div>
    </footer>
  );
}
