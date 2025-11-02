import { MessageSquare, Phone } from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="text-center py-8 px-4 bg-background border-t">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[15px] text-foreground/70">
          <a 
            href="https://t.me/bfr_admin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover-elevate px-4 py-2 rounded-md transition-colors"
            data-testid="link-telegram"
          >
            <SiTelegram className="w-5 h-5 text-[#0078d7]" />
            <span>Telegram: @bfr_admin</span>
          </a>
          <a 
            href="https://wa.me/79990000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover-elevate px-4 py-2 rounded-md transition-colors"
            data-testid="link-whatsapp"
          >
            <SiWhatsapp className="w-5 h-5 text-[#25D366]" />
            <span>WhatsApp: +7 (999) 000-00-00</span>
          </a>
        </div>
        <p className="text-[14px] text-foreground/60">
          © 2025 Сообщество хозяев квартир "БФР"
        </p>
      </div>
    </footer>
  );
}
