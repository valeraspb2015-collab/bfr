import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/IMG_1708_1762164822589.jpg";

interface HelpHeaderProps {
  onRequestClick?: () => void;
}

export default function HelpHeader({ onRequestClick }: HelpHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, setLocation] = useLocation();

  const navLinks = [
    { label: "Как это работает", href: "#how-it-works" },
    { label: "Для хозяев", href: "#audiences" },
    { label: "FAQ", href: "#faq" },
    { label: "Поддержка", href: "https://t.me/bfrreplit_bot", external: true },
  ];

  const handleRequestClick = () => {
    if (onRequestClick) {
      onRequestClick();
    } else {
      setLocation("/request");
    }
    setMobileOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(250,247,242,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(28,25,23,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" data-testid="link-logo">
            <img src={logoImage} alt="БФР" className="w-9 h-9 object-contain rounded-lg" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold tracking-tight" style={{ color: "#1c1917" }}>БФР</span>
              <span className="text-[10px]" style={{ color: "#6b6560" }}>Best flat rent</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-sm rounded-lg transition-colors"
                  style={{ color: "#6b6560" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1c1917"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6b6560"; }}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1.5 text-sm rounded-lg transition-colors"
                  style={{ color: "#6b6560" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1c1917"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6b6560"; }}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              onClick={handleRequestClick}
              className="hidden md:flex rounded-lg text-white text-sm"
              style={{ background: "#0d7377" }}
              data-testid="button-header-request"
            >
              Оставить заявку
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-4 space-y-1"
          style={{ borderTop: "1px solid rgba(28,25,23,0.08)" }}
        >
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2.5 text-sm rounded-lg"
                style={{ color: "#6b6560" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="block px-3 py-2.5 text-sm rounded-lg"
                style={{ color: "#6b6560" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            )
          )}
          <div className="pt-2">
            <Button
              onClick={handleRequestClick}
              className="w-full rounded-lg text-white"
              style={{ background: "#0d7377" }}
              data-testid="button-mobile-request"
            >
              Оставить заявку
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
