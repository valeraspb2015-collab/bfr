import { CheckCircle2, XCircle } from "lucide-react";

const bfrPoints = [
  "Одна заявка вместо долгого ручного поиска",
  "Хозяева сами откликаются на ваш запрос",
  "Прямой контакт и договорённость напрямую",
  "Без сервисных сборов платформе",
];

const typicalPoints = [
  "Нужно самому просматривать много объявлений",
  "Приходится тратить больше времени на сравнение вариантов",
  "Общение часто завязано на правила и логику площадки",
  "Хозяину сложнее строить прямые отношения с гостем",
];

export default function ComparisonSection() {
  return (
    <section
      className="py-12 px-4"
      style={{ background: "#faf7f2" }}
      data-testid="section-comparison"
    >
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-8">
          <h2
            className="text-xl font-bold tracking-tight mb-2"
            style={{ color: "#1c1917" }}
            data-testid="text-comparison-title"
          >
            Почему BFR удобнее прямой аренды через агрегаторный сценарий
          </h2>
          <p
            className="text-sm leading-relaxed mx-auto"
            style={{ color: "#6b6560", maxWidth: "520px" }}
            data-testid="text-comparison-subtitle"
          >
            BFR сокращает путь гостя к подходящему жилью и помогает хозяину работать напрямую, без лишних посредников.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* BFR */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(13,115,119,0.18)",
            }}
            data-testid="card-comparison-bfr"
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#0d7377" }}
            >
              BFR
            </p>
            <ul className="space-y-3">
              {bfrPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: "#0d7377" }}
                  />
                  <span className="text-sm leading-snug" style={{ color: "#1c1917" }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Обычный сценарий */}
          <div
            className="rounded-2xl p-5"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(28,25,23,0.08)",
            }}
            data-testid="card-comparison-typical"
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "#6b6560" }}
            >
              Обычный сценарий через агрегатор
            </p>
            <ul className="space-y-3">
              {typicalPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <XCircle
                    className="w-4 h-4 shrink-0 mt-0.5"
                    style={{ color: "#c4b8b0" }}
                  />
                  <span className="text-sm leading-snug" style={{ color: "#6b6560" }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
