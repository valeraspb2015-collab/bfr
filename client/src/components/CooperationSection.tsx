import { Handshake, Users, Briefcase, TrendingDown } from "lucide-react";

export default function CooperationSection() {
  return (
    <section id="cooperation" className="py-20 px-4" style={{ background: "#faf7f2" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-5"
            style={{ background: "rgba(200,98,42,0.1)", border: "1px solid rgba(200,98,42,0.25)" }}
          >
            <Handshake className="w-7 h-7" style={{ color: "#c8622a" }} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight" style={{ color: "#1c1917" }}>
            Сотрудничество
          </h2>
          <p className="text-lg" style={{ color: "#6b6560" }}>
            Приглашаем к взаимовыгодному сотрудничеству
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Users,
              iconColor: "#c8622a",
              bg: "rgba(200,98,42,0.08)",
              border: "rgba(200,98,42,0.2)",
              title: "Администраторы сообществ",
              desc: "Администраторов групп и сообществ владельцев квартир городов РФ",
            },
            {
              icon: Briefcase,
              iconColor: "#4a7c59",
              bg: "rgba(74,124,89,0.08)",
              border: "rgba(74,124,89,0.2)",
              title: "Предприниматели",
              desc: "Предпринимателей, оказывающих услуги гостям или хозяевам",
            },
            {
              icon: TrendingDown,
              iconColor: "#e07540",
              bg: "rgba(224,117,64,0.08)",
              border: "rgba(224,117,64,0.2)",
              title: "Единомышленники",
              desc: "Всех, кого интересует развитие альтернативы интернет-площадкам бронирования",
            },
          ].map(({ icon: Icon, iconColor, bg, border, title, desc }) => (
            <div
              key={title}
              className="rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(28,25,23,0.08)",
                boxShadow: "0 2px 12px rgba(28,25,23,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 28px rgba(200,98,42,0.10), 0 2px 8px rgba(28,25,23,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 12px rgba(28,25,23,0.06)";
              }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                <Icon className="w-5 h-5" style={{ color: iconColor }} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: "#1c1917" }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6b6560" }}>{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://t.me/bfrreplit_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium px-6 py-3 rounded-xl transition-all text-white"
            style={{
              background: "#c8622a",
              boxShadow: "0 4px 20px rgba(200,98,42,0.25)",
            }}
            data-testid="button-cooperation-contact"
          >
            <Handshake className="w-5 h-5" />
            Связаться с нами
          </a>
        </div>
      </div>
    </section>
  );
}
