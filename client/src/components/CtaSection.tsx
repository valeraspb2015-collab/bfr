import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CtaSectionProps {
  onApplyClick: () => void;
}

export default function CtaSection({ onApplyClick }: CtaSectionProps) {
  return (
    <section className="py-16 px-4" style={{ background: "#faf7f2" }} data-testid="section-cta">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-2xl md:text-3xl font-bold tracking-tight mb-3"
          style={{ color: "#1c1917" }}
          data-testid="text-cta-title"
        >
          Готовы попробовать BFR?
        </h2>
        <p
          className="text-base leading-relaxed mb-8"
          style={{ color: "#6b6560" }}
          data-testid="text-cta-subtitle"
        >
          Оставьте заявку за 2 минуты — хозяева сами предложат варианты.
        </p>
        <Button
          onClick={onApplyClick}
          className="rounded-xl text-white gap-2"
          style={{ background: "#0d7377", boxShadow: "0 4px 16px rgba(13,115,119,0.2)" }}
          data-testid="button-cta-apply"
        >
          Оставить заявку
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
