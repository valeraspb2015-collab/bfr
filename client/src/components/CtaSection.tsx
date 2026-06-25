export default function CtaSection() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <section
      className="py-6 px-4"
      style={{ borderTop: "1px solid rgba(28,25,23,0.06)" }}
      data-testid="section-cta"
    >
      <p className="text-center text-sm" style={{ color: "#a39e98" }}>
        Ещё есть вопросы?{" "}
        <button
          onClick={scrollToTop}
          className="text-sm font-medium"
          style={{ color: "#6b6560", textDecoration: "underline", textUnderlineOffset: "3px" }}
          data-testid="button-cta-apply"
        >
          Напишите запрос в поле выше
        </button>
        {" "}или выберите мессенджер для прямой связи.
      </p>
    </section>
  );
}
