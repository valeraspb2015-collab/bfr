import { MessageCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiTelegram, SiWhatsapp } from "react-icons/si";

export default function ContactSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#f7f9fc] to-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-[#0078d7]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="w-8 h-8 text-[#0078d7]" />
        </div>
        
        <h2 
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
          data-testid="text-contact-title"
        >
          Не нашли ответ?
        </h2>
        <p 
          className="text-lg text-gray-600 mb-8"
          data-testid="text-contact-subtitle"
        >
          Опишите ситуацию — мы поможем разобраться
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://t.me/bfrreplit_bot"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-contact-telegram"
          >
            <Button
              size="lg"
              className="bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-full px-8 py-6 gap-3 shadow-lg"
            >
              <SiTelegram className="w-5 h-5" />
              Написать в Telegram
            </Button>
          </a>
          
          <a 
            href="https://wa.me/79899865887"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-contact-whatsapp"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-full px-8 py-6 gap-3"
            >
              <SiWhatsapp className="w-5 h-5" />
              Написать в WhatsApp
            </Button>
          </a>
          
          <a 
            href="https://max.ru"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-contact-max"
            onClick={() => {
              alert('Найдите нас в мессенджере MAX по номеру: +7 921 379-89-41');
            }}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-[#7B68EE] text-[#7B68EE] hover:bg-[#7B68EE] hover:text-white rounded-full px-8 py-6 gap-3"
            >
              <MessageSquare className="w-5 h-5" />
              Написать в Макс
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
