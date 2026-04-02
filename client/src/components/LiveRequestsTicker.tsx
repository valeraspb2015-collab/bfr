import { MapPin, Calendar, Banknote } from "lucide-react";

interface MockRequest {
  id: number;
  name: string;
  location: string;
  rooms: string;
  dates: string;
  budget: string;
  status: "new" | "active";
}

const staticRequests: MockRequest[] = [
  { id: 1, name: "Анна", location: "Сочи", rooms: "2-комн.", dates: "12–19 июля", budget: "4 000–5 500 ₽/ночь", status: "new" },
  { id: 2, name: "Дмитрий", location: "Казань", rooms: "Студия", dates: "3–8 августа", budget: "до 3 500 ₽/ночь", status: "active" },
  { id: 3, name: "Мария", location: "Санкт-Петербург", rooms: "1-комн.", dates: "20–27 июня", budget: "3 000–4 500 ₽/ночь", status: "new" },
  { id: 4, name: "Сергей", location: "Калининград", rooms: "2-комн.", dates: "5–12 июля", budget: "3 500–5 000 ₽/ночь", status: "active" },
  { id: 5, name: "Наталья", location: "Краснодар", rooms: "1-комн.", dates: "15–20 мая", budget: "2 500–3 500 ₽/ночь", status: "new" },
  { id: 6, name: "Иван", location: "Екатеринбург", rooms: "3-комн.", dates: "1–10 сентября", budget: "5 000–7 000 ₽/ночь", status: "active" },
];

const statusConfig = {
  new: { label: "новая заявка", color: "#0d7377", bg: "rgba(13,115,119,0.08)" },
  active: { label: "получает отклики", color: "#4a7c59", bg: "rgba(74,124,89,0.09)" },
};

export default function LiveRequestsTicker() {
  return (
    <section className="py-14 px-4" style={{ background: "#f3ede3" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#4a7c59" }}
          />
          <h2 className="text-lg font-semibold" style={{ color: "#1c1917" }}>
            Сейчас ищут жильё
          </h2>
          <span className="text-sm" style={{ color: "#6b6560" }}>— актуальные заявки</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {staticRequests.map((r) => {
            const s = statusConfig[r.status];
            return (
              <div
                key={r.id}
                className="rounded-xl px-4 py-3.5 flex flex-col gap-2"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(28,25,23,0.07)",
                }}
                data-testid={`card-request-${r.id}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color: "#1c1917" }}>
                    {r.name}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: s.bg, color: s.color, fontSize: "11px" }}
                  >
                    {s.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <span className="flex items-center gap-1 text-xs" style={{ color: "#6b6560" }}>
                    <MapPin className="w-3 h-3 shrink-0" /> {r.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs" style={{ color: "#6b6560" }}>
                    <Calendar className="w-3 h-3 shrink-0" /> {r.dates}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium" style={{ color: "#0d7377" }}>
                  <Banknote className="w-3 h-3 shrink-0" /> {r.budget}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
