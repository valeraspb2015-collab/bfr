import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/IMG_1708_1762164822589.jpg";

interface HelpHeaderProps {
  onGuestClick: () => void;
  onOwnerClick: () => void;
}

export default function HelpHeader({ onGuestClick, onOwnerClick }: HelpHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3" data-testid="link-logo">
            <img src={logoImage} alt="БФР" className="w-10 h-10 object-contain rounded-lg" />
            <span 
              className="text-lg font-semibold text-[#0078d7]"
              style={{ 
                fontStyle: 'italic',
                transform: 'skewX(-4deg)',
              }}
            >
              БФР
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Button 
              variant="ghost" 
              onClick={onGuestClick}
              className="text-gray-700 hover:text-[#0078d7] hover:bg-gray-50"
              data-testid="nav-guests"
            >
              Гостям
            </Button>
            <Button 
              variant="ghost" 
              onClick={onOwnerClick}
              className="text-gray-700 hover:text-[#0078d7] hover:bg-gray-50"
              data-testid="nav-owners"
            >
              Хозяевам
            </Button>
            <Link href="/#faq">
              <Button 
                variant="ghost"
                className="text-gray-700 hover:text-[#0078d7] hover:bg-gray-50"
                data-testid="nav-faq"
              >
                Помощь
              </Button>
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onGuestClick}
              className="border-[#0078d7] text-[#0078d7] hover:bg-[#0078d7] hover:text-white"
              data-testid="button-find-apartment-header"
            >
              Найти квартиру
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-2">
              <Button 
                variant="ghost" 
                onClick={() => { onGuestClick(); setMobileMenuOpen(false); }}
                className="justify-start text-gray-700"
                data-testid="nav-guests-mobile"
              >
                Гостям
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => { onOwnerClick(); setMobileMenuOpen(false); }}
                className="justify-start text-gray-700"
                data-testid="nav-owners-mobile"
              >
                Хозяевам
              </Button>
              <Link href="/#faq">
                <Button 
                  variant="ghost"
                  className="justify-start text-gray-700 w-full"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="nav-faq-mobile"
                >
                  Помощь
                </Button>
              </Link>
              <Button 
                onClick={() => { onGuestClick(); setMobileMenuOpen(false); }}
                className="mt-2 bg-[#0078d7] hover:bg-[#005fa3] text-white"
                data-testid="button-find-apartment-mobile"
              >
                Найти квартиру
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
