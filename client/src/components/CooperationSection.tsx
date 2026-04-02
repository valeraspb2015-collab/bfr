import { Handshake } from "lucide-react";

export default function CooperationSection() {
  return (
    <section id="cooperation" className="py-10 px-4" style={{ background: "#faf7f2" }}>
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-2xl px-7 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between"
          style={{
            background: "#f3ede3",
            border: "1px solid rgba(28,25,23,0.08)",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "rgba(13,115,119,0.10)" }}
            >
              <Handshake className="w-5 h-5" style={{ color: "#0d7377" }} />
            </div>
            <div>
              <h3 className="text-base font-semibold mb-1" style={{ color: "#1c1917" }}>
                Сотрудничество
              </h3>
              <p className="text-sm" style={{ color: "#6b6560" }}>
                Приглашаем администраторов сообществ, предпринимателей и единомышленников
              </p>
            </div>
          </div>
          <a
            href="https://t.me/bfrreplit_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-xl text-white shrink-0 transition-all"
            style={{ background: "#0d7377" }}
            data-testid="button-cooperation-contact"
          >
            Написать нам
          </a>
        </div>
      </div>
    </section>
  );
}
