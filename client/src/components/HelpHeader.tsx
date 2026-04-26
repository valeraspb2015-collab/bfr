import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Users } from "lucide-react";
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
    <header className="sticky top-0 z-50" style={{ boxShadow: "0 1px 0 rgba(28,25,23,0.08)" }}>

      {/* ── Top announcement bar ── */}
      <div
        className="flex items-center justify-center h-7 px-4"
        style={{ background: "#0d7377" }}
        data-testid="bar-topline"
      >
        <p
          className="text-[9px] font-semibold tracking-[0.18em] uppercase text-white/90 select-none"
          data-testid="text-tagline"
        >
          <span className="hidden sm:inline">Лучшая&nbsp;аренда&nbsp;квартир<span className="mx-3 opacity-40">·</span>Best&nbsp;Flat&nbsp;Rent<span className="mx-3 opacity-40">·</span></span>
          bfr.su
        </p>
      </div>

      {/* ── Main nav bar ── */}
      <div
        style={{
          background: "rgba(250,247,242,0.96)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(28,25,23,0.07)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0" data-testid="link-logo">
              <img src={logoImage} alt="БФР" className="w-9 h-9 object-contain rounded-lg" />
              <div className="flex flex-col leading-none gap-[3px]">
                <span className="text-[15px] font-bold tracking-tight" style={{ color: "#1c1917" }}>БФР</span>
                <span className="text-[10px] font-medium tracking-wide" style={{ color: "#6b6560" }}>Best Flat Rent</span>
              </div>
            </Link>

            {/* Desktop nav — right-aligned */}
            <nav className="hidden md:flex items-center gap-0.5 ml-auto">
              <Link
                href="/community"
                className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap font-medium"
                style={{ color: "#0d7377" }}
                data-testid="link-nav-community"
              >
                <Users className="w-3.5 h-3.5" />
                Чат хозяев
              </Link>
              <div className="w-px h-4 mx-1 rounded-full" style={{ background: "rgba(28,25,23,0.15)" }} />
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap"
                    style={{ color: "#6b6560" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1c1917"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6b6560"; }}
                    data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap"
                    style={{ color: "#6b6560" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#1c1917"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6b6560"; }}
                    data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </a>
                )
              )}

              <div className="w-px h-4 mx-2 rounded-full" style={{ background: "rgba(28,25,23,0.15)" }} />

              <Button
                size="sm"
                onClick={handleRequestClick}
                className="rounded-lg text-white text-sm"
                style={{ background: "#0d7377" }}
                data-testid="button-header-request"
              >
                Оставить заявку
              </Button>
            </nav>

            {/* Mobile burger */}
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

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden px-4 pb-4 space-y-1"
            style={{ borderTop: "1px solid rgba(28,25,23,0.08)" }}
          >
            <p
              className="text-[10px] font-semibold tracking-[0.18em] uppercase pt-3 pb-1"
              style={{ color: "#0d7377" }}
            >
              Лучшая аренда квартир · BFR.SU
            </p>

            {/* Чат хозяев — первым в мобильном меню */}
            <Link
              href="/community"
              className="flex items-center gap-2 px-3 py-2.5 text-sm rounded-lg font-medium"
              style={{ color: "#0d7377" }}
              onClick={() => setMobileOpen(false)}
              data-testid="link-mobile-community"
            >
              <Users className="w-4 h-4" />
              Чат хозяев
            </Link>

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
      </div>
    </header>
  );
}
