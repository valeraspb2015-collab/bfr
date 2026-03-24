import { Link } from "wouter";
import logoImage from "@assets/IMG_1708_1762164822589.jpg";

export default function HelpHeader() {
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
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3" data-testid="link-logo">
            <div className="flex flex-col items-center">
              <img src={logoImage} alt="БФР" className="w-10 h-10 object-contain rounded-lg" />
              <span
                className="text-[10px] font-medium tracking-tight leading-tight"
                style={{ color: "#6b6560" }}
              >
                Best flat rent
              </span>
            </div>
          </Link>

          <div className="flex-1 flex justify-center px-4">
            <span
              className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-center"
              style={{ color: "#1c1917" }}
              data-testid="text-community-title"
            >
              Сообщество хозяев квартир БФР
            </span>
          </div>

          <div className="w-10 h-10" />
        </div>
      </div>
    </header>
  );
}
